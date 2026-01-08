/**
 * A Model base object.
 */
export class BaseModel {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: string;
  updatedBy?: string;
}
