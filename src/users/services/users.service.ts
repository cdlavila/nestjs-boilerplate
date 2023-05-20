import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  /**
   * Create a new user
   * @param {CreateUserDto} data - The user data
   * @returns {Promise<User>} - The created user
   */
  async create(data: CreateUserDto) {
    const user = await this.usersRepository.findOne({
      where: [{ username: data?.username }, { email: data?.email }],
    });
    if (user) {
      throw new BadRequestException(`User already exists`);
    }
    const newUser = this.usersRepository.create(data);
    newUser.password = bcrypt.hashSync(newUser?.password, 12);
    const createdUser = await this.usersRepository.save(newUser);
    delete createdUser.password;
    return createdUser;
  }

  /**
   * Find all users
   * @returns {Promise<User[]>} - The list of users
   */
  async findAll() {
    return this.usersRepository.find({
      select: ['id', 'username', 'email', 'roles', 'isActive'],
    });
  }

  /**
   * Find a user by id
   * @param {string} id - The user id
   * @returns {Promise<User>} - The user of the given id
   */
  async findOne(id: string) {
    const user = await this.usersRepository.findOne({
      where: { id },
      select: ['id', 'username', 'email', 'roles', 'isActive'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  /**
   * Find a user by username or email
   * @param {string} username - The username or email
   * @returns {Promise<User>} - The user of the given username or email
   */
  async findByUsernameOrEmail(username: string) {
    const user = await this.usersRepository.findOne({
      where: [{ username }, { email: username }],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  /**
   * Update a user
   * @param {string} id - The user id
   * @param {UpdateUserDto} data - The user data to update
   * @returns {Promise<User>} - The updated user
   */
  async update(id: string, data: UpdateUserDto) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    this.usersRepository.merge(user, data);
    if (data?.password) {
      user.password = bcrypt.hashSync(data?.password, 12);
    }
    const updatedUser = await this.usersRepository.save(user);
    delete updatedUser?.password;
    return updatedUser;
  }

  /**
   * Delete a user
   * @param {string} id - The user id
   * @returns {Promise<true | false>} - The result of the operation
   */
  async delete(id: string) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const elimination = await this.usersRepository.delete(id);
    return elimination?.affected === 1;
  }
}
