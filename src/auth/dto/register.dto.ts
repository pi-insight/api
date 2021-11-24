import { IsEmail, Length } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @Length(8, 32)
  username: string;

  @Length(8, 128)
  password: string;
}
