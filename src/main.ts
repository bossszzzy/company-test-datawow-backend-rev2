import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { BaseHttpFilter } from './common/filters/base-http.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new BaseHttpFilter())

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((error) => {
  const logger = new Logger('Bootstrap')
  logger.error('Nest application failed druing bootstrap', error instanceof Error ? error.stack: 'Unexcepted error occrued')
});
