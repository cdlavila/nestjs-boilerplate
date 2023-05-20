import { UpdateUserDto } from './update-user.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

describe('UpdateUserDto', () => {
  it('should be defined', () => {
    expect(new UpdateUserDto()).toBeDefined();
  });

  it('should return 0 errors because all fields are optional', async () => {
    const dto = plainToInstance(UpdateUserDto, {});
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should return 5 errors because all fields are wrong', async () => {
    const dto = plainToInstance(UpdateUserDto, {
      username: 123,
      email: 123,
      password: 123,
      roles: ['123'],
      isActive: 123,
    });
    const errors = await validate(dto);
    expect(errors.length).toBe(5);
    expect(errors[0].constraints).toEqual({
      isString: 'username must be a string',
    });
    expect(errors[1].constraints).toEqual({
      isEmail: 'email must be an email',
    });
    expect(errors[2].constraints).toEqual({
      isLength:
        'password must be longer than or equal to 8 and shorter than or equal to 32 characters',
    });
    expect(errors[3].constraints).toEqual({
      isIn: 'each value in roles must be one of the following values: Admin, Customer',
    });
    expect(errors[4].constraints).toEqual({
      isBoolean: 'isActive must be a boolean value',
    });
  });

  it('should return 0 errors because all fields are correct', async () => {
    const dto = plainToInstance(UpdateUserDto, {
      username: 'example',
      email: 'example@gmail.com',
      password: '12345678',
      roles: ['Admin'],
      isActive: true,
    });
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });
});
