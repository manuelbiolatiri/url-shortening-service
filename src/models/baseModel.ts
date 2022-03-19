import { IsNotEmpty } from 'class-validator';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseModel {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @IsNotEmpty()
  @CreateDateColumn()
  public createdAt: Date;

  @IsNotEmpty()
  @UpdateDateColumn()
  public updatedAt: Date;
}
