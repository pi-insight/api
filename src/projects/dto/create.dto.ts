import { Type } from 'class-transformer';
import { Length } from 'class-validator';

export class CreateProjectDto {
  @Length(8, 255)
  name: string;

  @Length(0, 1024)
  description: string;

  @Type(() => Array)
  members: number[];
}
