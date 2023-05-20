import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { UsersService } from '../src/users/services/users.service';

describe('UsersController (e2e)', () => {
  jest.setTimeout(100000);
  let app: INestApplication;
  let usersService: UsersService;
  const userPayload = {
    username: 'carlos.londono+test3',
    email: 'carlos.londono+test3@soluntech.com',
    password: '12345678',
    roles: ['Customer'],
    isActive: true,
  };
  let createdUserId: string;
  let adminUser: any;
  let adminToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    usersService = moduleFixture.get<UsersService>(UsersService);
    app = moduleFixture.createNestApplication();
    await app.init();

    // Create admin user
    adminUser = await usersService.create({
      username: 'carlos.londono+admin',
      email: 'carlos.londono+admin@soluntech.com',
      password: '12345678',
      roles: ['Admin'],
      isActive: true,
    });
    // delete adminUser?.password;
    // Login admin user
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        username: adminUser?.username,
        password: '12345678',
      })
      .set('Accept', 'application/json');
    adminToken = JSON.parse(response?.text).token;
  });

  describe('/users (POST)', () => {
    it('should create a new user', () => {
      return request(app.getHttpServer())
        .post('/users')
        .send(userPayload)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(201)
        .expect(({ body }) => {
          createdUserId = body?.id;
          expect(body).toMatchObject({
            username: userPayload?.username,
            email: userPayload?.email,
            roles: userPayload?.roles,
            isActive: userPayload?.isActive,
          });
        });
    });

    it('should return 400 because the user already exists', () => {
      return request(app.getHttpServer())
        .post('/users')
        .send(adminUser)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(400)
        .expect(({ body }) => {
          expect(body?.message).toBe('User already exists');
        });
    });
  });

  describe('/users (GET)', () => {
    it('should return all users', () => {
      return request(app.getHttpServer())
        .get('/users')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200)
        .expect(({ body }) => {
          expect(body?.length).toBeGreaterThanOrEqual(2);
          expect(
            body?.filter((user) =>
              [userPayload?.username, adminUser?.username].includes(
                user?.username,
              ),
            ).length,
          ).toBe(2);
        });
    });
  });

  describe('/users/myself (GET)', () => {
    it('should return the logged user', () => {
      return request(app.getHttpServer())
        .get('/users/myself')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200)
        .expect(({ body }) => {
          expect(body).toMatchObject(adminUser);
        });
    });

    it('should return 401 because the token is invalid', () => {
      return request(app.getHttpServer())
        .get('/users/myself')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer invalid-token`)
        .expect(401)
        .expect(({ body }) => {
          expect(body?.message).toBe('Unauthorized');
        });
    });
  });

  describe('/users/:id (GET)', () => {
    it('should return the user', () => {
      return request(app.getHttpServer())
        .get(`/users/${createdUserId}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200)
        .expect(({ body }) => {
          expect(body?.id).toBe(createdUserId);
          expect(body?.username).toBe(userPayload?.username);
          expect(body?.email).toBe(userPayload?.email);
          expect(body?.roles).toEqual(userPayload?.roles);
          expect(body?.isActive).toBe(userPayload?.isActive);
        });
    });

    it('should return 404 because the user does not exist', () => {
      return request(app.getHttpServer())
        .get(`/users/0d4169b9-673b-4819-8097-376548c51a13`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(404)
        .expect(({ body }) => {
          expect(body?.message).toBe('User not found');
        });
    });
  });

  describe('/users/:id (PUT)', () => {
    it('should update the user', () => {
      return request(app.getHttpServer())
        .put(`/users/${createdUserId}`)
        .send({
          isActive: false,
        })
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200)
        .expect(({ body }) => {
          expect(body).toMatchObject({
            id: createdUserId,
            username: userPayload?.username,
            email: userPayload?.email,
            roles: userPayload?.roles,
            isActive: false,
          });
        });
    });

    it('should return 404 because the user does not exist', () => {
      return request(app.getHttpServer())
        .put(`/users/0d4169b9-673b-4819-8097-376548c51a13`)
        .send({
          isActive: false,
        })
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(404)
        .expect(({ body }) => {
          expect(body?.message).toBe('User not found');
        });
    });
  });

  describe('/users/:id (DELETE)', () => {
    it('should delete the user', () => {
      return request(app.getHttpServer())
        .delete(`/users/${createdUserId}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200)
        .expect('true');
    });

    it('should return 404 because the user does not exist', () => {
      return request(app.getHttpServer())
        .delete(`/users/0d4169b9-673b-4819-8097-376548c51a13`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(404)
        .expect(({ body }) => {
          expect(body?.message).toBe('User not found');
        });
    });
  });

  afterAll(async () => {
    await usersService.delete(adminUser?.id);
    await app.close();
  });
});
