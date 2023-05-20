import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { AppModule } from '../../app.module';

describe('UsersService', () => {
  jest.setTimeout(100000);
  let service: UsersService;
  const user = {
    username: 'carlos.londono+test3',
    email: 'carlos.londono+test3@soluntech.com',
    password: '12345678',
    roles: ['Customer'],
    isActive: true,
  };
  let createdUserId: string;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create method', () => {
    it('should create a new user', async () => {
      const createdUser = await service.create(user);
      createdUserId = createdUser?.id;
      expect(createdUser).toMatchObject({
        username: user?.username,
        email: user?.email,
        roles: user?.roles,
        isActive: user?.isActive,
      });
    });

    it('should throw an error because the user already exists', async () => {
      await expect(service.create(user)).rejects.toThrow('User already exists');
    });
  });

  describe('findAll method', () => {
    it('should return an array of users', async () => {
      const users = await service.findAll();
      expect(users?.length).toBeGreaterThanOrEqual(1);
      expect(users?.find((user) => user?.id === createdUserId)).toBeDefined();
    });
  });

  describe('findOne method', () => {
    it('should return a user', async () => {
      const foundUser = await service.findOne(createdUserId);
      expect(foundUser).toMatchObject({
        username: user?.username,
        email: user?.email,
        roles: user?.roles,
        isActive: user?.isActive,
      });
    });

    it('should throw an error because the user does not exist', async () => {
      await expect(
        service.findOne('0d4169b9-673b-4819-8097-376548c51a13'),
      ).rejects.toThrow('User not found');
    });
  });

  describe('findByUsernameOrEmail method', () => {
    it('should return a user', async () => {
      const foundUser = await service.findByUsernameOrEmail(user?.username);
      expect(foundUser).toMatchObject({
        username: user?.username,
        email: user?.email,
        roles: user?.roles,
        isActive: user?.isActive,
      });
    });

    it('should throw an error because the user does not exist', async () => {
      await expect(
        service.findByUsernameOrEmail('non-existing-username'),
      ).rejects.toThrow('User not found');
    });
  });

  describe('update method', () => {
    it('should update a user', async () => {
      const updatedUser = await service.update(createdUserId, {
        username: 'carlos.londono+test3-updated',
        isActive: false,
      });
      expect(updatedUser).toMatchObject({
        username: 'carlos.londono+test3-updated',
        email: user?.email,
        roles: user?.roles,
        isActive: false,
      });
    });

    it('should throw an error because the user does not exist', async () => {
      await expect(
        service.update('0d4169b9-673b-4819-8097-376548c51a13', {}),
      ).rejects.toThrow('User not found');
    });
  });

  describe('delete method', () => {
    it('should delete a user', async () => {
      const deletedUser = await service.delete(createdUserId);
      expect(deletedUser).toBe(true);
    });

    it('should throw an error because the user does not exist', async () => {
      await expect(
        service.delete('0d4169b9-673b-4819-8097-376548c51a13'),
      ).rejects.toThrow('User not found');
    });
  });
});
