import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { UsersService } from '../src/users/services/users.service';

describe('AuthController (e2e)', () => {
  jest.setTimeout(100000);
  let app: INestApplication;
  let usersService: UsersService;
  const activeUserPayload = {
    username: 'carlos.londono+test',
    email: 'carlos.londono+test@soluntech.com',
    password: '12345678',
    roles: ['Customer'],
    isActive: true,
  };
  const inactiveUserPayload = {
    username: 'carlos.londono+test2',
    email: 'carlos.londono+test2@soluntech.com',
    password: '12345678',
    roles: ['Customer'],
    isActive: false,
  };
  const createdUsers: string[] = [];
  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    usersService = moduleFixture.get<UsersService>(UsersService);
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/auth/register (POST)', () => {
    it('should register a new active user', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send(activeUserPayload)
        .set('Accept', 'application/json')
        .expect(201)
        .expect(({ body }) => {
          createdUsers.push(body?.user?.id);
          expect(body?.user).toMatchObject({
            username: activeUserPayload?.username,
            email: activeUserPayload?.email,
            roles: activeUserPayload?.roles,
            isActive: activeUserPayload?.isActive,
          });
          expect(body?.token).toBeDefined();
        });
    });

    it('should return 400 because the user already exists', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send(activeUserPayload)
        .set('Accept', 'application/json')
        .expect(400)
        .expect(({ body }) => {
          expect(body?.message).toBe('User already exists');
        });
    });

    it('should register a new inactive user', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send(inactiveUserPayload)
        .set('Accept', 'application/json')
        .expect(201)
        .expect(({ body }) => {
          createdUsers.push(body?.user?.id);
          expect(body?.user).toMatchObject({
            username: inactiveUserPayload?.username,
            email: inactiveUserPayload?.email,
            roles: inactiveUserPayload?.roles,
            isActive: inactiveUserPayload?.isActive,
          });
          expect(body?.token).toBeDefined();
        });
    });
  });

  describe('/auth/login (POST)', () => {
    it('should login a user', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          username: activeUserPayload?.username,
          password: activeUserPayload?.password,
        })
        .set('Accept', 'application/json')
        .expect(200)
        .expect(({ body }) => {
          token = body?.token;
          expect(body?.user).toMatchObject({
            username: activeUserPayload?.username,
            email: activeUserPayload?.email,
            roles: activeUserPayload?.roles,
            isActive: activeUserPayload?.isActive,
          });
          expect(body?.token).toBeDefined();
        });
    });

    it('should return 403 because the user is inactive', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          username: inactiveUserPayload?.username,
          password: inactiveUserPayload?.password,
        })
        .set('Accept', 'application/json')
        .expect(403)
        .expect(({ body }) => {
          expect(body?.message).toBe('The user is inactive');
        });
    });

    it('should return 401 because the user data does not match', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          username: activeUserPayload?.username,
          password: 'wrong password',
        })
        .set('Accept', 'application/json')
        .expect(401)
        .expect(({ body }) => {
          expect(body?.message).toBe('Login data does not match');
        });
    });
  });

  describe('/auth/refresh (GET)', () => {
    it('should refresh the token', () => {
      return request(app.getHttpServer())
        .get('/auth/refresh')
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .expect(200)
        .expect(({ body }) => {
          expect(body?.user).toMatchObject({
            username: activeUserPayload?.username,
            email: activeUserPayload?.email,
            roles: activeUserPayload?.roles,
            isActive: activeUserPayload?.isActive,
          });
          expect(body?.token).toBeDefined();
        });
    });

    it('should return 401 because the token is invalid', () => {
      return request(app.getHttpServer())
        .get('/auth/refresh')
        .set('Authorization', `Bearer invalid token`)
        .set('Accept', 'application/json')
        .expect(401)
        .expect(({ body }) => {
          expect(body?.message).toBe('Unauthorized');
        });
    });
  });

  afterAll(async () => {
    for (const userId of createdUsers) {
      await usersService.delete(userId);
    }
    await app.close();
  });
});
