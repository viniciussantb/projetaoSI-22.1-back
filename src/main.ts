import { NestFactory } from '@nestjs/core';
import { AppDataSource } from './app.data-source';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await AppDataSource.initialize()
    .then(() => console.log('App Data-Source Initialized...'))
    .catch((err) => console.log('Error to initialize App Data-Source', err));

  const config = new DocumentBuilder()
    .setTitle('Projetão')
    .setDescription('Projetão 2022.1 Sistemas de Informação API.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  app.enableCors();

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
