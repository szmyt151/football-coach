import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    bodyParser: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: false,
    }),
  );

  // const config = new DocumentBuilder()
  //   .setTitle('Football Coach')
  //   .setDescription('Football coach API description')
  //   .setVersion('1.0')
  //   .addTag('footballCoach')
  //   .build();
  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('api', app, document);

  await app.listen(30000);
}

bootstrap()
  .then(() => {
    console.log('Satrted');
  })
  .catch((err) => {
    console.log(err);
  });
