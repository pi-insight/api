import { Repository } from 'typeorm';
import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Project } from './project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProjectDto } from './dto/create.dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,
    private readonly usersService: UsersService,
  ) {}
  async create(dto: CreateProjectDto, owner: User) {
    const { members, ...rest } = dto;
    const { name } = rest;
    const uniqueMembers = [...new Set([...members, owner.id])];

    if (await this.projectsRepository.findOne({ name })) {
      throw new ConflictException('Project name already taken');
    }

    const project = this.projectsRepository.create(rest);

    // const foundMembers = await Promise.all(
    //   members.map(async (member) => {
    //     const foundUser = await this.usersService.findOne(member);
    //     if (!foundUser) {
    //       throw new NotFoundException(`User with id ${member} not found`);
    //     }
    //     return foundUser;
    //   }),
    // );
    const foundMembers = await this.usersService.findByIds(uniqueMembers);

    project.members = foundMembers;
    project.owner = owner;
    // project.image = image.path;

    return await this.projectsRepository.save(project);
  }

  async setImage(id: number, user: User, file: Express.Multer.File) {
    const project = await this.projectsRepository.findOne(id, {
      relations: ['owner'],
    });

    if (!project || project.owner.id !== user.id) {
      throw new UnauthorizedException();
    }

    project.image = file.path;

    return await this.projectsRepository.save(project);
  }

  async findOne(id: number): Promise<Project> {
    return await this.projectsRepository.findOne(id);
  }

  async paginate(offset: number, limit: number): Promise<Project[]> {
    return await this.projectsRepository.find({
      skip: offset,
      take: limit,
    });
  }

  async findByUserId(id: number) {
    return await this.projectsRepository.find({
      where: { owner: { id } },
    });
  }
}
