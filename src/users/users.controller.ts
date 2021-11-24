import { PatchDto } from './dto/patch.dto';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Req,
  UnauthorizedException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProjectsService } from 'src/projects/projects.service';
import { UsersService } from './users.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Blob } from 'buffer';
import { diskStorage } from 'multer';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly projectsService: ProjectsService,
  ) {}

  @Get(':id')
  async fineOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.usersService.findOne(id);
  }

  @Get(':id/projects')
  async findProjects(@Param('id', new ParseIntPipe()) id: number) {
    return this.projectsService.findByUserId(id);
  }

  @UseInterceptors(
    FileInterceptor('profile-image', {
      storage: diskStorage({
        destination: './public/images',
        filename: (req, file, cb) => {
          const user = req.user as User;
          cb(null, `${user.id}_${new Date().getTime()}-${file.originalname}`);
        },
      }),
    }),
  )
  @Patch()
  async modify(
    @Req() req,
    @Body() data: PatchDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    data.image = file;
    return this.usersService.modify(data, req.user);
  }
}
