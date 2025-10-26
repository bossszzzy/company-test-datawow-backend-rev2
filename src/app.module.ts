import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { ConcertsService } from './concerts/concerts.service';
import { ConcertsController } from './concerts/concerts.controller';
import { ConcertsModule } from './concerts/concerts.module';

@Module({
  imports: [ConfigModule, DatabaseModule, ConcertsModule],
  controllers: [AppController, ConcertsController],
  providers: [AppService, ConcertsService],
})
export class AppModule {}
