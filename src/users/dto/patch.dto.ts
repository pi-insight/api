import { IsEmail, IsOptional, Length, ValidateIf } from 'class-validator';

export class PatchDto {
  @IsOptional()
  @Length(5, 16)
  displayname?: string;
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
