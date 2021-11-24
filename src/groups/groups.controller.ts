import { CreateGroupDto } from './dto/create.dto';
import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { GroupsService } from './groups.service';

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
}
