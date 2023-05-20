import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getWelcome(): string {
    return 'Welcome to the Boilerplate API!';
  }

  getStatus(): { status: string } {
    return { status: 'OK' };
  }
}
