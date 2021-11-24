import { Group } from './group.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef, Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Group]), forwardRef(() => UsersModule)],
  controllers: [GroupsController],
  providers: [GroupsService],
})
export class GroupsModule {}
