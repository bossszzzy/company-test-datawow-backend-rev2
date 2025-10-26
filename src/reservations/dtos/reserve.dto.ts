import { IsString } from 'class-validator';
export class ReserveDto {
  @IsString() concertId: string;
}
