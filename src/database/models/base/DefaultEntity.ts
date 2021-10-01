import { classToPlain, Exclude } from "class-transformer";
import { validate } from "class-validator";
import { Entity, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, UpdateDateColumn, BeforeUpdate, BeforeInsert } from "typeorm";
import { Validation } from "../../../core/errors";

@Entity()
export default class DefaultEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @Exclude()
  @CreateDateColumn()
  createdAt!: Date;

  @Exclude()
  @UpdateDateColumn()
  updatedAt!: Date;

  @BeforeUpdate()
  @BeforeInsert()
  async validate() {
    const errors = await validate(this);
    if(errors.length > 0)
      throw new Validation(errors);
  }

  toJSON() {
    return classToPlain(this);
  }

}

