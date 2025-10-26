import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ConcertsService } from './concerts.service';
import { RoleGuard } from 'src/common/role.guard';
import { CreateConcertDto } from './dtos/create-concert.dto';

@Controller('concerts')
export class ConcertsController {
  constructor(private readonly concertService: ConcertsService) {
  }
  @Get() list() { return this.concertService.listAll() }

  @UseGuards(RoleGuard)
  @Post('/admin')
  create(@Body() createConcertDto: CreateConcertDto) { return this.concertService.create(createConcertDto) }

  @UseGuards(RoleGuard)
  @Delete('/admin/:id')
  remove(@Param('id') id: string) { return this.concertService.remove(id) }
}
