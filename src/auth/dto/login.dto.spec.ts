import { LoginDto } from './login.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

describe('LoginDto', () => {
  it('should be defined', () => {
    expect(new LoginDto()).toBeDefined();
  });

  it('should return 2 errors because the fields are empty', async () => {
    const dto = plainToInstance(LoginDto, {});
    const errors = await validate(dto);
    expect(errors.length).toBe(2);
    expect(errors[0].constraints).toEqual({
      isNotEmpty: 'username should not be empty',
    });
    expect(errors[1].constraints).toEqual({
      isNotEmpty: 'password should not be empty',
    });
  });

  it('should validate the data correctly because all fields are correct', async () => {
    const dto = plainToInstance(LoginDto, {
      username: 'example@gmail.com',
      password: '12345678',
    });
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });
});
