import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class seedUsers1674080992084 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert('users', {
      id: '8d4169b9-673b-4819-8097-376548c51a15',
      username: 'example',
      email: 'example@gmail.com',
      password: bcrypt.hashSync('12345678', 12),
      role: 'Admin',
      is_active: true,
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete('users', {
      id: '8d4169b9-673b-4819-8097-376548c51a15',
    });
  }
}
