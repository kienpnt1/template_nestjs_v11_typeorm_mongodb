import { Controller, Get, Param, Query, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GuestDemoService } from './demo.service';
import { IRequest } from '@core/interfaces';
import { ListDemoDto } from './dto';
import { validateCommon } from '@helpers/validate.helper';

@ApiTags('Guest - Demo')
@Controller('guest/demo')
export class GuestDemoController {
  constructor(private readonly demoService: GuestDemoService) { }

  @Get()
  @ApiOperation({ summary: 'Get all demo entities (Guest)' })
  @ApiResponse({ status: 200, description: 'Return list of demo entities.' })
  findAll(@Query() reqQuery: ListDemoDto, @Req() req: IRequest) {
    const pickData: ListDemoDto = reqQuery;
    validateCommon(req, pickData);
    return this.demoService.findAll(pickData);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a demo entity by ID (Guest)' })
  @ApiResponse({ status: 200, description: 'Return the demo entity.' })
  @ApiResponse({ status: 404, description: 'Demo entity not found.' })
  findOne(@Param('id') id: string, @Req() req: IRequest) {
    const context: any = {};
    validateCommon(req, context);
    return this.demoService.findOne(id, context);
  }
}
