import { NestFactory } from '@nestjs/core';
import { AppDataSource } from './app.data-source';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await AppDataSource.initialize()
    .then(() => console.log('App Data-Source Initialized...'))
    .catch((err) => console.log('Error to initialize App Data-Source', err));

  await app.listen(3000);
}
bootstrap();
