import { AfterLoad, BeforeInsert, BeforeUpdate, Column, Entity, FindOneOptions, JoinTable, ManyToMany, OneToMany } from "typeorm";
import DefaultEntity from "./base/DefaultEntity";
import {
  Length,
  IsEmail,
} from 'class-validator';
import Password from "./Password";
import AuthToken from "./AuthToken";
import { Exclude } from "class-transformer";
import User from "./User";

@Entity()
export default class Team extends DefaultEntity {

  @Exclude()
  private $birth: Team;

  constructor() {
    super();
    this.$birth = {...this};
  }

  @Column()
  public name!: string;

  @ManyToMany(() => User, user => user.teams, { cascade: true })
  @JoinTable()
  public members!: User[];

}

