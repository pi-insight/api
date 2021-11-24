import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as argon2 from 'argon2';
import { Exclude } from 'class-transformer';
import { Group } from './../groups/group.entity';
import { Project } from 'src/projects/project.entity';

@Entity()
export class User {
  @Exclude()
  private _birth: User;
  constructor() {
    this._birth = { ...this };
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  image: string;

  @Column({ unique: true, length: 32 })
  username: string;

  @Column()
  email: string;

  @Column({ length: 128 })
  @Exclude()
  password: string;

  @ManyToMany(() => Project, (project) => project.members)
  projects: Project[];

  @ManyToMany(() => Group, (group) => group.members)
  groups: Group[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  async authenticate(password: string) {
    return await argon2.verify(this.password, password);
  }

  @BeforeInsert()
  async hash() {
    if (this._birth.password !== this.password) {
      this.password = await argon2.hash(this.password);
    }
  }
}
