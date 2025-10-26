import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BaseHttpFilter } from './common/filters/base-http.filter';
import { GlobalValidationPipe } from './common/pipes/global-validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new GlobalValidationPipe())
  app.useGlobalFilters(new BaseHttpFilter())
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((error) => {
  const logger = new Logger('Bootstrap')
  logger.error('Nest application failed druing bootstrap', error instanceof Error ? error.stack : 'Unexcepted error occrued')
});
