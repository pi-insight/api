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
    private groupsRepository: Repository<Group>,
    private usersService: UsersService,
  ) {}

  async create(body: CreateGroupDto, owner: User) {
    const { members, ...rest } = body;

    const uniqueMembers = [...new Set([...members, owner.id])];
    const loadedMembers = await this.usersService.findByIds(uniqueMembers);

    const group = await this.groupsRepository.create(rest);
    group.owner = owner;
    group.members = loadedMembers;
    return await this.groupsRepository.save(group);
  }

  async findOne(id: string) {
    return await this.groupsRepository
      .findOneOrFail(id, { relations: ['members', 'owner'] })
      .catch(() => {
        throw new NotFoundException();
      });
  }
}
