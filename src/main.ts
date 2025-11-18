import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalQueryOptimizationPipe } from './common/pipes/GlobalQueryOptimization.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new GlobalQueryOptimizationPipe())
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
