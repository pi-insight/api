import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDto } from './dto/pagination.dto';
import { PatchDto } from './dto/patch.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findByIds(ids: (number | string)[]) {
    return await this.usersRepository.findByIds(ids);
  }

  async create(username: string, email: string, password: string) {
    const exists = await this.usersRepository
      .createQueryBuilder()
      .where('username = :username or email = :email', { username, email })
      .getOne();

    if (exists) {
      throw new ConflictException('email or username already in use');
    }

    const user = this.usersRepository.create({ username, email, password });

    return await this.usersRepository.save(user);
  }

  async findOne(params: Partial<User> | number): Promise<User | undefined> {
    if (typeof params === 'number') {
      return await this.usersRepository.findOne(params);
    }

    return await this.usersRepository.findOne(params);
  }

  async modify(dto: PatchDto, user: User) {
    if (dto.password) {
      if (!(await user.authenticate(dto.oldPassword))) {
        throw new NotFoundException('wrong password');
      }
      user.password = dto.password;
    }

    if (dto.image) {
      user.image = dto.image.path;
    }

    const { oldPassword, image, ...rest } = dto;

    const modified = { ...user, ...rest };

    return await this.usersRepository.save(modified);
  }

  async paginate(dto: PaginationDto) {
    return await this.usersRepository.find({
      skip: dto.offset,
      take: dto.limit,
    });
  }
}
