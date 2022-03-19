import { BaseModel } from './baseModel';
import { RequestType } from '../enums/RequestType';
import { IsNotEmpty } from 'class-validator';
import { Column, Entity } from 'typeorm';

@Entity()
export class Domain extends BaseModel {
  @IsNotEmpty()
  @Column({ nullable: false })
  public url: string;

  @Column({ unique: true, nullable: false })
  public shortUrl: string;

  @Column({ type: 'enum', enum: RequestType, default: RequestType.SHORT })
  public type: RequestType;

  @Column({ type: 'jsonb' })
  public device: object;
}
