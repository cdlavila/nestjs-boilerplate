import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableCors({ origin: '*', methods: 'POST,GET,HEAD,PUT,PATCH,DELETE' });
  app.useGlobalPipes(
    // See documentation: https://docs.nestjs.com/techniques/validation
    new ValidationPipe({
      stopAtFirstError: true,
      whitelist: true,
      transform: true,
    }),
  );

  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('NestJS Boilerplate API')
    .setDescription('NestJS Boilerplate API Description.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT);
}
bootstrap().then(() => {
  console.log(
    `Server started on: http://localhost:${process.env.PORT}/api`,
    `\nSwagger documentation on: http://localhost:${process.env.PORT}/docs`,
  );
});
