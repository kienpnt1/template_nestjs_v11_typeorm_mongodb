import { CommonRequestInterface } from '@core/interfaces';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsDateString, IsMongoId, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateDemoDto extends CommonRequestInterface {
  @ApiProperty({ example: 'test string' })
  @IsString()
  stringField: string;

  @ApiProperty({ example: 123 })
  @IsNumber()
  numberField: number;

  @ApiProperty({ example: 10 })
  @IsNumber()
  int32Field: number;

  @ApiProperty({ example: 1000 })
  @IsNumber()
  int64Field: number;

  @ApiProperty({ example: '10.5' })
  @IsString()
  decimal128Field: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  booleanField: boolean;

  @ApiProperty({ required: false, example: null })
  @IsOptional()
  @IsString()
  nullField: string;

  @ApiProperty({ example: '2023-01-01T00:00:00Z' })
  @IsDateString()
  dateField: Date;

  @ApiProperty({ example: { key: 'value' } })
  @IsObject()
  objectField: Record<string, any>;

  @ApiProperty({ example: [1, 2, 3] })
  @IsArray()
  arrayField: any[];

  @ApiProperty({ example: '507f1f77bcf86cd799439011' })
  @IsMongoId()
  objectIdField: string;

  @ApiProperty({ example: 'base64string' })
  @IsString()
  binaryField: string;

  @ApiProperty({ example: '^test' })
  @IsString()
  regexField: string;

  @ApiProperty({ example: 1672531200 })
  @IsNumber()
  timestampField: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  minKeyField: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  maxKeyField: number;
}
