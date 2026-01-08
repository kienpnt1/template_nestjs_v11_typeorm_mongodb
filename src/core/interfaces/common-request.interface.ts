import { IsOptional, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

import { IUser } from './user.interface';
import { IPagination } from './pagination.interface';

export class CommonRequestInterface {
  @IsOptional()
  user: IUser;
  @IsOptional()
  lang: string;
  @IsOptional()
  ipAddress: string;
  @IsOptional()
  osType: string;
}

export class CommonRequestPaginateInterface extends IPagination {
  @IsOptional()
  user: IUser;
  @IsOptional()
  lang: string;
  @IsOptional()
  ipAddress: string;
  @IsOptional()
  osType: string;
}

export class CommonParamId {
  @Type(() => Number)
  @IsInt({ message: 'ID must be an integer' })
  @Min(1, { message: 'ID must be greater than 0' })
  id: number;
}
