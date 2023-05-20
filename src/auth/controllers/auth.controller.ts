import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { LoginDto } from '../dto/login.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    schema: {
      properties: {
        user: {
          $ref: '#/components/schemas/User',
        },
        token: {
          type: 'string',
        },
      },
    },
  })
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() payload: CreateUserDto) {
    return await this.authService.register(payload);
  }

  @ApiOperation({ summary: 'Log in the user' })
  @ApiResponse({
    status: 200,
    schema: {
      properties: {
        user: {
          $ref: '#/components/schemas/User',
        },
        token: {
          type: 'string',
        },
      },
    },
  })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() payload: LoginDto) {
    return await this.authService.login(payload);
  }

  @ApiOperation({ summary: 'Refresh the user token' })
  @ApiResponse({
    status: 200,
    schema: {
      properties: {
        user: {
          $ref: '#/components/schemas/User',
        },
        token: {
          type: 'string',
        },
      },
    },
  })
  @ApiBearerAuth()
  @Get('refresh')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async refresh(@Req() req: any) {
    return await this.authService.refresh(req?.user?.id);
  }
}
