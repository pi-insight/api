import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne({ username });
    if (!user || !(await user.authenticate(password))) return null;
    return user;
  }

  async register(dto: RegisterDto) {
    return await this.usersService.create(
      dto.username,
      dto.email,
      dto.password,
    );
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.id };

    return {
      user,
      token: this.jwtService.sign(payload),
    };
  }
}
