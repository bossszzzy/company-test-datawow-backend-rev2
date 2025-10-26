import { Injectable } from '@nestjs/common';
import { ResvStatus } from 'generated/prisma/enums';
import { PrismaClientKnownRequestError } from 'generated/prisma/internal/prismaNamespace';
import { PRISMA_ERROR_CODE } from 'src/common/constants/prisma-error-code';
import { AlreadyReservedException } from 'src/common/exceptions/already-reserved.exception';
import { ConcertNotFoundException } from 'src/common/exceptions/concert-not-found.exception';
import { ReservationNotFoundException } from 'src/common/exceptions/reservation-not-found.exception';
import { SoldOutException } from 'src/common/exceptions/sold-out.exception';
import { UserNotFoundException } from 'src/common/exceptions/user-not-found.exception';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ReservationsService {
  constructor(private prisma: PrismaService) { }

  history() {
    return this.prisma.reservation.findMany({
      orderBy: { createdAt: 'desc' },
      include: { user: true, concert: true },
      take: 200,
    })
  }

  myReservations(userId: string) {
    return this.prisma.reservation.findMany({
      where: { userId, status: ResvStatus.ACTIVE },
      include: { concert: true },
      orderBy: { createdAt: 'desc' }
    })
  }
  async reserve(userId: string, concertId: string) {
    return this.prisma.$transaction(async (t) => {
      
      const user = await t.user.findUnique({ where: { id: userId } });
      if (!user) throw new UserNotFoundException;

      const concert = await t.concert.findUnique({ where: { id: concertId } });
      if (!concert) throw new ConcertNotFoundException;

      const activeCount = await t.reservation.count({
        where: { concertId, status: ResvStatus.ACTIVE },
      });
      if (activeCount >= concert.totalSeats) {
        throw new SoldOutException;
      }

      try {
        const r = await t.reservation.create({
          data: { userId, concertId, status: ResvStatus.ACTIVE },
        });
        return r;
      } catch (error) {
        if (
          error instanceof PrismaClientKnownRequestError &&
          error.code === PRISMA_ERROR_CODE.UNIQUE_CONSTRAINT_FAILED
        ) {
          throw new AlreadyReservedException;
        }
        throw error;
      }
    });
  }
  async cancelAsUser(userId: string, reservationId: string) {
    const resv = await this.prisma.reservation.findUnique({ where: { id: reservationId } });
    if (!resv) throw new ReservationNotFoundException;

    if (resv.status === ResvStatus.CANCELLED) return resv;

    return this.prisma.reservation.update({
      where: { id: reservationId },
      data: { status: ResvStatus.CANCELLED, cancelledAt: new Date() },
    });
  }
}
