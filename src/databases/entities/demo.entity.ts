import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base/base.entity';
import { DatabaseConst } from '../constant/database.const';
import { ObjectId, Decimal128, Binary, Timestamp, MinKey, MaxKey, BSONRegExp, Double, Int32, Long } from 'mongodb';

@Entity(DatabaseConst.DEMO_TBL)
export class DemoEntity extends BaseEntity {
  @Column()
  stringField: string;

  @Column()
  numberField: number;

  @Column()
  int32Field: Int32;

  @Column()
  int64Field: Long;

  @Column()
  decimal128Field: Decimal128;

  @Column()
  booleanField: boolean;

  @Column({ nullable: true })
  nullField: string;

  @Column()
  dateField: Date;

  @Column()
  objectField: Record<string, any>;

  @Column('array')
  arrayField: any[];

  @Column()
  objectIdField: ObjectId;

  @Column()
  binaryField: Binary;

  @Column()
  regexField: BSONRegExp;

  @Column()
  timestampField: Timestamp;

  @Column()
  minKeyField: MinKey;

  @Column()
  maxKeyField: MaxKey;
}
