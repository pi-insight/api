import { Column } from "typeorm";
import DefaultModel from "./base/DefaultModel";
import bcrypt from 'bcrypt';

export default class Password extends DefaultModel {
  
  constructor(password: string) {
    super();
    this.hash = password;
  }

  @Column()
  hash!: string;

  compare(password: string) {
    return bcrypt.compareSync(password, this.hash); 
  }

}
