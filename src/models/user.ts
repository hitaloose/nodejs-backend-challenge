import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 1000 })
  email!: string;

  @Column({ type: "varchar", length: 1000 })
  passwordHashed!: string;
}
