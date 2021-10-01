import { CreateDateColumn, UpdateDateColumn } from "typeorm";

export default class DefaultEntity {

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

}

