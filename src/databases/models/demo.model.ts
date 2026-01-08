import { BaseModel } from './base/base.model';
import { ObjectId, Decimal128, Binary, Timestamp, MinKey, MaxKey, BSONRegExp, Int32, Long } from 'mongodb';

export class DemoModel extends BaseModel {
  stringField: string;
  numberField: number;
  int32Field: Int32;
  int64Field: Long;
  decimal128Field: Decimal128;
  booleanField: boolean;
  nullField: string;
  dateField: Date;
  objectField: Record<string, any>;
  arrayField: any[];
  objectIdField: ObjectId;
  binaryField: Binary;
  regexField: BSONRegExp;
  timestampField: Timestamp;
  minKeyField: MinKey;
  maxKeyField: MaxKey;
}
