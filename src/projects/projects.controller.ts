import {
  Body,
  Controller,
  forwardRef,
  Get,
  Inject,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create.dto';
import { PaginationDto } from './dto/get.dto';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(
    @Inject(forwardRef(() => ProjectsService))
    private readonly projectsService: ProjectsService,
  ) {}

  @Post()
  async create(@Req() req, @Body() body: CreateProjectDto) {
    return this.projectsService.create(body, req.user);
  }

  @Get()
  async findAll(@Query() query: PaginationDto) {
    return await this.projectsService.paginate(query.offset, query.limit);
  }
}
