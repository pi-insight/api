import { Type } from 'class-transformer';
import {
  IsBase64,
  IsEmail,
  IsOptional,
  Length,
  Min,
  ValidateIf,
} from 'class-validator';

export class PatchDto {
  @IsOptional()
  @Length(8, 22)
  name?: string;
  @IsEmail()
  @IsOptional()
  email?: string;
  @Length(8)
  @IsOptional()
  password?: string;
  @Length(8)
  @ValidateIf((data) => data.password)
  oldPassword?: string;
  image?: Express.Multer.File;
}
