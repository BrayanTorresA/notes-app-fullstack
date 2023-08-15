import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
export class CreateNoteDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  @IsPositive()
  category: number;
}
