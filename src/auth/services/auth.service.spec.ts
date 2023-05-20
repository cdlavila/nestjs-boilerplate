import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AppModule } from '../../app.module';
import { UsersService } from '../../users/services/users.service';

describe('AuthService', () => {
  jest.setTimeout(100000);
  let service: AuthService;
  let userService: UsersService;
  const activeUser = {
    username: 'carlos.londono+test',
    email: 'carlos.londono+test@soluntech.com',
    password: '12345678',
    roles: ['Customer'],
    isActive: true,
  };
  const inactiveUser = {
    username: 'carlos.londono+test2',
    email: 'carlos.londono+test2@soluntech.com',
    password: '12345678',
    roles: ['Customer'],
    isActive: false,
  };
  const createdUsers: string[] = [];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register method', () => {
    it('should register a new user', async () => {
      const { user } = await service.register(activeUser);
      createdUsers.push(user.id);
      expect(user).toMatchObject({
        username: activeUser?.username,
        email: activeUser?.email,
        roles: activeUser?.roles,
        isActive: activeUser?.isActive,
      });
    });

    it('should throw an error because the user already exists', async () => {
      await expect(service.register(activeUser)).rejects.toThrow(
        'User already exists',
      );
    });

    it('should create a new inactive user', async () => {
      const { user } = await service.register(inactiveUser);
      createdUsers.push(user.id);
      expect(user).toMatchObject({
        username: inactiveUser?.username,
        email: inactiveUser?.email,
        roles: inactiveUser?.roles,
        isActive: inactiveUser?.isActive,
      });
    });
  });

  describe('login method', () => {
    it('should login the user', async () => {
      const { user, token } = await service.login({
        username: activeUser?.username,
        password: activeUser?.password,
      });
      expect(user).toMatchObject({
        username: activeUser?.username,
        email: activeUser?.email,
        roles: activeUser?.roles,
        isActive: activeUser?.isActive,
      });
      expect(token).toBeDefined();
    });

    it('should throw an error because the user is inactive', async () => {
      await expect(
        service.login({
          username: inactiveUser?.username,
          password: inactiveUser?.password,
        }),
      ).rejects.toThrow('The user is inactive');
    });

    it('should throw an error because the user data does not match', async () => {
      await expect(
        service.login({
          username: activeUser?.username,
          password: 'wrong password',
        }),
      ).rejects.toThrow('Login data does not match');
    });
  });

  describe('refresh method', () => {
    it('should refresh the token', async () => {
      const { user, token } = await service.refresh(createdUsers[0]);
      expect(user).toMatchObject({
        username: activeUser?.username,
        email: activeUser?.email,
        roles: activeUser?.roles,
        isActive: activeUser?.isActive,
      });
      expect(token).toBeDefined();
    });

    it('should throw an error because the user does not exist', async () => {
      await expect(
        service.refresh('0d4169b9-673b-4819-8097-376548c51a13'),
      ).rejects.toThrow('User not found');
    });
  });

  afterAll(async () => {
    for (const userId of createdUsers) {
      await userService.delete(userId);
    }
  });
});
