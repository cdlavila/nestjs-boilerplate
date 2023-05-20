import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'The username or email of the user',
    example: 'example@gmail.com',
  })
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({
    description: 'The password of the user',
    example: '12345678',
  })
  @IsNotEmpty()
  readonly password: string;
}
