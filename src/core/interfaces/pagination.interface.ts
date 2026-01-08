import { IsNumberString, ValidateIf } from 'class-validator';

export class IPagination {
  @ValidateIf((o) => o.otherProperty !== undefined)
  select?: Record<string, any> & string;

  @ValidateIf((o) => o.otherProperty !== undefined)
  sort?: Record<string, any> & string;

  @ValidateIf((o) => o.otherProperty !== undefined)
  @IsNumberString()
  offset?: number;

  @ValidateIf((o) => o.otherProperty !== undefined)
  @IsNumberString()
  page?: number;

  @ValidateIf((o) => o.otherProperty !== undefined)
  @IsNumberString()
  pageSize?: number;
}
