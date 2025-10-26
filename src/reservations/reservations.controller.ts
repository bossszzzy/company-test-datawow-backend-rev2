import { Body, Controller, Delete, Get, Headers, Param, Post, UseGuards } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { getUserId, RoleGuard } from 'src/common/role.guard';
import { ReserveDto } from './dtos/reserve.dto';

@Controller('reservations')
export class ReservationsController {
  constructor(private reservationService: ReservationsService) { }

  @UseGuards(RoleGuard)
  @Get('/history') history() { return this.reservationService.history() }

  @Get('/me')
  my(@Headers() headers: any) {
    const userId = getUserId({ headers });
    return this.reservationService.myReservations(userId);
  }

  @Post('')
  reserve(@Body() dto: ReserveDto, @Headers() headers: any) {
    const userId = getUserId({ headers });
    return this.reservationService.reserve(userId, dto.concertId);
  }

  @Delete('/:id')
  cancel(@Param('id') id: string, @Headers() headers: any) {
    const userId = getUserId({ headers });
    return this.reservationService.cancelAsUser(userId, id);
  }
}
