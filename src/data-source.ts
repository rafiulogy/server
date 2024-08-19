import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "aws-0-ap-south-1.pooler.supabase.com",
  port: 6543,
  username: "postgres.xrzqzbjbqrhqytaheeje",
  password: "IVM2asrz8FyC4pRj",
  database: "postgres",
  synchronize: true,
  logging: false,
  entities: [User],
});
