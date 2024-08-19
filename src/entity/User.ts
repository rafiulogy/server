import { Entity, Column, BeforeInsert } from "typeorm";
import { UserRole } from "../utils/types";
import Model from "./Model";
import bcrypt from "bcrypt";

@Entity("users")
export class User extends Model {
  @Column({ nullable: true })
  name: string;

  @Column({ unique: true, nullable: true })
  mobile: string;

  @Column({ type: "enum", enum: UserRole, default: "CLIENT" })
  role: string;

  @Column()
  password: string;

  @BeforeInsert()
  async passwordHashed() {
    this.password = await bcrypt.hash(this.password, 10);
  }
  toJSON() {
    return { ...this, id: undefined, password: undefined };
  }
}
