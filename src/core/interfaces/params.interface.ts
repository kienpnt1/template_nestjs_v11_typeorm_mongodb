import { IsNotEmpty } from 'class-validator';

export class IParamsCommon {
  @IsNotEmpty()
  id: string;
}
