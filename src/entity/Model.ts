import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";

export default abstract class Model extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "uuid", unique: true })
  uuid: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  createUuid() {
    this.uuid = uuid();
  }

  toJSON() {
    return { ...this, id: undefined };
  }
}
