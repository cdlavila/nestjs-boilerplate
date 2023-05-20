import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'The username of the user',
    example: 'carlos.londono',
  })
  @IsString()
  @IsOptional()
  readonly username: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'carlos.londono@soluntech.com',
  })
  @IsEmail({})
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: '12345678',
  })
  @Length(8, 32)
  readonly password: string;

  @ApiProperty({
    enum: ['Admin', 'Customer'],
    isArray: true,
    description: 'The roles of the user',
    example: ['Admin'],
  })
  @IsOptional()
  @IsIn(['Admin', 'Customer'], { each: true })
  @IsArray()
  readonly roles: string[];

  @ApiProperty({
    description: 'The User activity status',
    example: true,
  })
  @IsBoolean()
  readonly isActive: boolean;
}
