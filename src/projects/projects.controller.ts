import {
  Body,
  Controller,
  forwardRef,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  UploadedFile,
} from '@nestjs/common';
import { SingleFile } from 'src/decorators/SingleFile';
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

  @SingleFile('projects')
  @Post(':id/image')
  async setImage(
    @Req() req,
    @UploadedFile() file: Express.Multer.File,
    @Param('id', new ParseIntPipe()) id: number,
  ) {
    return await this.projectsService.setImage(id, req.user, file);
  }

  @Get(':id')
  async get(@Param('id', new ParseIntPipe()) id: number) {
    return this.projectsService.findOne(id);
  }

  @Get()
  async paginate(@Query() query: PaginationDto) {
    return await this.projectsService.paginate(query.offset, query.limit);
  }
}
