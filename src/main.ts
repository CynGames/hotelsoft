import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // if (process.env.DATABASE_URL) {
  //   process.env.DATABASE_URL = `${process.env.DATABASE_URL}?sslmode=disable`;
  // }

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(process.env.PORT || 3000);
  console.log('App is running on port: ', process.env.PORT || 3000);
}
bootstrap();
