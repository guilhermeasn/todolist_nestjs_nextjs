import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Todolist {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  item: string;

  @Column()
  done: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date | null;

  @BeforeInsert()
  defaultInsert() {
    this.done = false;
    this.createdAt = new Date();
    this.updatedAt = null;
  }

  @BeforeUpdate()
  defaultUpdate() {
    this.updatedAt = new Date();
  }

}
