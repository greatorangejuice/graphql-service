import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  // app.useGlobalInterceptors(new HeaderInterceptor());
  await app.listen(port);
}

bootstrap();
