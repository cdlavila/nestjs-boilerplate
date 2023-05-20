import {
  ForbiddenException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class AuthService {
  private configService: ConfigService;

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @Inject(ConfigService) configService: ConfigService,
  ) {
    this.configService = configService;
  }

  /**
   * Register a new user
   * @param {CreateUserDto} data - The user data
   * @returns {Promise<{ user: User, token: string }>} - The user and the token
   */
  async register(data: CreateUserDto) {
    const user = await this.usersService.create(data);
    const token = this.jwtService.sign({
      id: user?.id,
      roles: user?.roles,
      username: user?.username,
      email: user?.email,
      isActive: user?.isActive,
    });
    return { user, token };
  }

  /**
   * Login a user
   * @param {string} credentials - The username or email and the password
   * @returns {Promise<{ user: User, token: string }>} - The user and the token
   */
  async login(credentials: LoginDto) {
    const user = await this.usersService.findByUsernameOrEmail(
      credentials?.username,
    );
    const isMatch: boolean = bcrypt.compareSync(
      credentials?.password,
      user?.password,
    );
    if (!isMatch) {
      throw new UnauthorizedException(`Login data does not match`);
    }
    if (!user?.isActive) {
      throw new ForbiddenException(`The user is inactive`);
    }
    const token = this.jwtService.sign({
      id: user?.id,
      roles: user?.roles,
      username: user?.username,
      email: user?.email,
      isActive: user?.isActive,
    });
    return { user, token };
  }

  /**
   * Refresh the user token using the id got from the token
   * @param {string} id - The user id
   * @returns {Promise<{ user: User, token: string }>} - The user and the token
   */
  async refresh(id: string) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new UnauthorizedException(`User not found`);
    }
    if (!user?.isActive) {
      throw new ForbiddenException(`The user is inactive`);
    }
    const token = this.jwtService.sign({
      id: user?.id,
      roles: user?.roles,
      username: user?.username,
      email: user?.email,
      isActive: user?.isActive,
    });
    return { user, token };
  }
}
