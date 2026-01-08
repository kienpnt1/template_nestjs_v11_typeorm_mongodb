import { Controller, Get, Post, Body, Put, Param, Delete, Req, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { DemoService } from './demo.service';
import { CreateDemoDto } from './dto/create-demo.dto';
import { UpdateDemoDto } from './dto/update-demo.dto';
import { ListDemoDto } from './dto/list-demo.dto';
import { IRequest } from '@core/interfaces';
import { validateCommon } from '@helpers/validate.helper';

@ApiTags('Admin - Demo')
@ApiBearerAuth()
@Controller('admin/demo')
export class DemoController {
  constructor(private readonly demoService: DemoService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new demo entity' })
  @ApiResponse({ status: 201, description: 'The demo entity has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createDemoDto: CreateDemoDto, @Req() req: IRequest) {
    validateCommon(req, createDemoDto);
    return this.demoService.create(createDemoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all demo entities' })
  @ApiResponse({ status: 200, description: 'Return list of demo entities.' })
  findAll(@Query() reqQuery: ListDemoDto, @Req() req: IRequest) {
    const pickData: ListDemoDto = reqQuery;
    validateCommon(req, pickData);
    return this.demoService.findAll(pickData);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a demo entity by ID' })
  @ApiResponse({ status: 200, description: 'Return the demo entity.' })
  @ApiResponse({ status: 404, description: 'Demo entity not found.' })
  findOne(@Param('id') id: string, @Req() req: IRequest) {
    const context: any = {};
    validateCommon(req, context);
    return this.demoService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a demo entity' })
  @ApiResponse({ status: 200, description: 'The demo entity has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Demo entity not found.' })
  update(@Param('id') id: string, @Body() updateDemoDto: UpdateDemoDto, @Req() req: IRequest) {
    validateCommon(req, updateDemoDto);
    return this.demoService.update(id, updateDemoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a demo entity' })
  @ApiResponse({ status: 200, description: 'The demo entity has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Demo entity not found.' })
  remove(@Param('id') id: string, @Req() req: IRequest) {
    const context: any = {};
    validateCommon(req, context);
    return this.demoService.remove(id);
  }
}
