import { UsersService } from 'src/users/users.service';
import { Group } from './group.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateGroupDto } from './dto/create.dto';
import { User } from 'src/users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private readonly groupsRepository: Repository<Group>,
    private readonly usersService: UsersService,
  ) {}

  async findByUserId(id: number) {
    return await this.groupsRepository
      .createQueryBuilder('group')
      .leftJoinAndSelect('group.members', 'members')
      .where('members.id = :id', { id })
      .getMany();
  }

  async create(body: CreateGroupDto, owner: User) {
    const { members, ...rest } = body;

    const uniqueMembers = [...new Set([...members, owner.id])];
    const loadedMembers = await this.usersService.findByIds(uniqueMembers);

    uniqueMembers.map((id) => {
      if (!loadedMembers.find((user) => user.id === id)) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
    });

    const group = await this.groupsRepository.create(rest);
    group.owner = owner;
    group.members = loadedMembers;
    return await this.groupsRepository.save(group);
  }

  async paginate(offset: number, limit: number): Promise<Group[]> {
    return await this.groupsRepository.find({
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: string) {
    return await this.groupsRepository
      .findOneOrFail(id, { relations: ['members', 'owner'] })
      .catch(() => {
        throw new NotFoundException();
      });
  }
}
