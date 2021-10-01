import { AfterLoad, BeforeInsert, BeforeUpdate, Column, Entity, FindOneOptions, JoinTable, ManyToMany, OneToMany } from "typeorm";
import DefaultEntity from "./base/DefaultEntity";
import {
  Length,
  IsEmail,
} from 'class-validator';
import Password from "./Password";
import AuthToken from "./AuthToken";
import { Exclude } from "class-transformer";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Team from "./Teams";


@Entity()
export default class User extends DefaultEntity {

  constructor() {
    super();
    this.$birth = {...this, password: new Password('')};
  }

  @Length(5, 22)
  @Column({ unique: true })
  username!: string;

  @IsEmail()
  @Column({ unique: true })
  email!: string;

  @Exclude({ toPlainOnly: true })
  @Column(type => Password)
  password!: Password;

  @Exclude({ toPlainOnly: true })
  @OneToMany(type => AuthToken, authToken => authToken.user)
  tokens!: AuthToken[];

  @Exclude()
  private $birth!: User;

  @ManyToMany(() => Team, team => team.members, { cascade: true })
  @JoinTable()
  public teams!: Team[];

  @AfterLoad()
  private async saveBirthState() {
    this.$birth = {...this};
  }

  @BeforeInsert()
  @BeforeUpdate()
  private async hashPassword() {
    if(this.password.hash !== this.$birth.password.hash)
      this.password.hash = await bcrypt.hash(this.password.hash, 8);
  }

  static async findByUsernameOrEmail(username: string, email: string) {
    return await User
      .createQueryBuilder()
      .where('username = :username OR email = :email', { username, email })
      .getOne()
  }

  static async findByToken(token: string, options?: FindOneOptions): Promise<User | null | undefined> {

    const found = await AuthToken.findOne({token});

    if(!found || found.expiration < new Date())
      return;

    const id = found.user.id;

    return await User.findOne(id, options || {});
  }

  static async add({ username, email, password }: { username: string, email: string, password: string }) {
    const user = new User();
    user.username = username;
    user.email = email;
    user.password = new Password(password);
    return await user.save();
  }

  async generateToken() {
    const token = new AuthToken();
    token.token = jwt.sign({id: this.id, now: new Date()}, process.env.APP_SECRET!);
    token.user = this;
    await token.save()

    return token;
  }

}

