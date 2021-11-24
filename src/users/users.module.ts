import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { ProjectsModule } from 'src/projects/projects.module';
import { MulterModule } from '@nestjs/platform-express';
import { GroupsModule } from 'src/groups/groups.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => ProjectsModule),
    forwardRef(() => GroupsModule),
    MulterModule.register(),
  ],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
