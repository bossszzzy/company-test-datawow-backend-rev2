import { IsInt, IsNotEmpty, IsString, Min, Max } from 'class-validator';

export class CreateConcertDto {
  @IsString() @IsNotEmpty() name: string;
  @IsString() @IsNotEmpty() description: string;
  @IsInt() @Min(1) @Max(100000) totalSeats: number;
}
