import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';

describe('AppService', () => {
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    appService = app.get<AppService>(AppService);
  });

  describe('root', () => {
    it('Should return "Welcome to the Boilerplate API!"', () => {
      expect(appService.getWelcome()).toBe('Welcome to the Boilerplate API!');
    });

    it('Should return { status: "OK" }', () => {
      expect(appService.getStatus()).toEqual({ status: 'OK' });
    });
  });
});
