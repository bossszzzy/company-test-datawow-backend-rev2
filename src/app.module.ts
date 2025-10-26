import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { ConcertsService } from './concerts/concerts.service';
import { ConcertsController } from './concerts/concerts.controller';
import { ConcertsModule } from './concerts/concerts.module';
import { ReservationsService } from './reservations/reservations.service';
import { ReservationsController } from './reservations/reservations.controller';
import { ReservationsModule } from './reservations/reservations.module';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [ConfigModule, DatabaseModule, ConcertsModule, ReservationsModule],
  controllers: [AppController, ConcertsController, ReservationsController, AuthController],
  providers: [AppService, ConcertsService, ReservationsService],
})
export class AppModule {}
