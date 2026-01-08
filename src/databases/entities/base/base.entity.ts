import { Column, CreateDateColumn, ObjectIdColumn, UpdateDateColumn } from 'typeorm';
import { ObjectId } from 'mongodb';

export abstract class BaseEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({ nullable: true })
  id?: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @Column({ nullable: true })
  createdBy?: string;
  @Column({ nullable: true })
  updatedBy?: string;
}
