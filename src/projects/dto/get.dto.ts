import { Type } from 'class-transformer';
import { Max, Min } from 'class-validator';

export class PaginationDto {
  @Type(() => Number)
  @Min(0)
  readonly offset: number;

  @Type(() => Number)
  @Min(1)
  @Max(10)
  readonly limit: number;
}
