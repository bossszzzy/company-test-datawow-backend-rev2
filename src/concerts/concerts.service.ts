import { Injectable } from '@nestjs/common';
import { ResvStatus } from 'generated/prisma/enums';
import { PrismaService } from 'src/database/prisma.service';
import { CreateConcertDto } from './dtos/create-concert.dto';
import { ConcertNotFoundException } from 'src/common/exceptions/concert-not-found.exception';

@Injectable()
export class ConcertsService {
  constructor(private prisma: PrismaService) { }

  listAll() {
    return this.prisma.concert.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { reservations: { where: { status: ResvStatus.ACTIVE } } }
        }
      }
    })
  }
  create(dto: CreateConcertDto) {
    return this.prisma.concert.create({
      data: {
        name: dto.name, description: dto.description, totalSeats: dto.totalSeats
      }
    })
  }
  async remove(id: string) {
    try {
      await this.prisma.concert.delete({ where: { id } })
      return { message: "Delete Success" }
    } catch (error) {
      throw new ConcertNotFoundException
    }
  }
}
