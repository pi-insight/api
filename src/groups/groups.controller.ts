import { CreateGroupDto } from './dto/create.dto';
import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { PaginationDto } from 'src/users/dto/pagination.dto';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  async create(@Body() body: CreateGroupDto, @Req() req: any) {
    return this.groupsService.create(body, req.user);
  }

  @Get('/:id')
  async get(@Param('id') id: string) {
    return await this.groupsService.findOne(id);
  }

  @Get()
  async paginate(@Query() query: PaginationDto) {
    return await this.groupsService.paginate(query.offset, query.limit);
  }
}
