import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Post {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 1000 })
  title!: string;

  @Column("text")
  body!: string;

  @Column("json")
  tags!: string[];
}
