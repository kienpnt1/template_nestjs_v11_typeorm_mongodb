import { IsOptional } from 'class-validator';
import { CommonRequestPaginateInterface } from '@core/interfaces';
import { ApiProperty } from '@nestjs/swagger';

export class ListDemoDto extends CommonRequestPaginateInterface {
    @ApiProperty({ required: false, description: 'Page number', default: 1 })
    @IsOptional()
    page?: number;

    @ApiProperty({ required: false, description: 'Items per page', default: 10 })
    @IsOptional()
    pageSize?: number;

    @ApiProperty({ required: false, description: 'Search keyword' })
    @IsOptional()
    keySearch: string;
}
