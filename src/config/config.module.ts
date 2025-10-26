import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { validate } from './schemas/env.schema';

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      validate
    })
  ]
})
export class ConfigModule {}
