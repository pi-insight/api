import { Exclude } from "class-transformer";
import { addDays } from "date-fns";
import { BeforeInsert, Column, Entity, ManyToOne } from "typeorm";
import DefaultEntity from "./base/DefaultEntity";
import User from "./User";

@Entity()
export default class AuthToken extends DefaultEntity {

  @Column({ unique: true })
  token!: string;

  @Column({ type: 'timestamp', nullable: false})
  expiration!: Date;

  @Exclude()
  @ManyToOne(type => User, user => user.tokens, { eager: true, nullable: false })
  user!: User;

  @BeforeInsert()
  private async defineExpiration() {
    this.expiration = addDays(new Date(), 1);
  }

}

