import { Type } from 'class-transformer';
import { IsBase64, IsOptional, Length, Min } from 'class-validator';

export class CreateProjectDto {
  @Length(8, 255)
  name: string;

  @Length(0, 1024)
  description: string;

  @IsBase64()
  @IsOptional()
  image?: string;

  @Type(() => Array)
  members: number[];
}
