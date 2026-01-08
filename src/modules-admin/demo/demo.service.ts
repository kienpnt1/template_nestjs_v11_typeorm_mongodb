import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { DemoRepository } from '@databases/repositories';
import { CreateDemoDto } from './dto/create-demo.dto';
import { UpdateDemoDto } from './dto/update-demo.dto';
import { ListDemoDto } from './dto/list-demo.dto';
import { DemoEntity } from '@databases/entities';
import { ObjectId, Decimal128, Binary, Timestamp, MinKey, MaxKey, BSONRegExp, Int32, Long } from 'mongodb';
import { PaginationHelper } from '@helpers/pagination.helper';

@Injectable()
export class DemoService {
  private readonly logger = new Logger(DemoService.name);

  constructor(private readonly demoRepository: DemoRepository) {}

  async create(createDemoDto: CreateDemoDto): Promise<DemoEntity> {
    this.logger.log(`Creating new demo entity`);
    const entity = new DemoEntity();
    entity.stringField = createDemoDto.stringField;
    entity.numberField = createDemoDto.numberField;
    entity.int32Field = new Int32(createDemoDto.int32Field);
    entity.int64Field = Long.fromNumber(createDemoDto.int64Field);
    entity.decimal128Field = Decimal128.fromString(createDemoDto.decimal128Field);
    entity.booleanField = createDemoDto.booleanField;
    entity.nullField = createDemoDto.nullField || null;
    entity.dateField = new Date(createDemoDto.dateField);
    entity.objectField = createDemoDto.objectField;
    entity.arrayField = createDemoDto.arrayField;
    entity.objectIdField = new ObjectId(createDemoDto.objectIdField);
    entity.binaryField = new Binary(Buffer.from(createDemoDto.binaryField, 'base64'));
    entity.regexField = new BSONRegExp(createDemoDto.regexField);
    entity.timestampField = Timestamp.fromNumber(createDemoDto.timestampField);
    
    if (createDemoDto.minKeyField) entity.minKeyField = new MinKey();
    if (createDemoDto.maxKeyField) entity.maxKeyField = new MaxKey();

    return await this.demoRepository.save(entity);
  }

  async findAll(pickData: ListDemoDto): Promise<any> {
    this.logger.log(`Finding all demo entities with pagination`);
    const { skip, take } = PaginationHelper.fromPageSizeToSkipTake(pickData);
    const limit = take > 100 ? 100 : take;

    const [data, total] = await this.demoRepository.findAndCount({
      skip,
      take: limit,
    });

    return PaginationHelper.toPaginate(data, pickData, total);
  }

  async findOne(id: string): Promise<DemoEntity> {
    this.logger.log(`Finding demo entity with ID: ${id}`);
    if (!ObjectId.isValid(id)) throw new NotFoundException(`Invalid ID format`);
    const entity = await this.demoRepository.findOne({ where: { _id: new ObjectId(id) } });
    if (!entity) throw new NotFoundException(`Demo with ID ${id} not found`);
    return entity;
  }

  async update(id: string, updateDemoDto: UpdateDemoDto): Promise<DemoEntity> {
    this.logger.log(`Updating demo entity with ID: ${id}`);
    const entity = await this.findOne(id);
    
    if (updateDemoDto.stringField !== undefined) entity.stringField = updateDemoDto.stringField;
    if (updateDemoDto.numberField !== undefined) entity.numberField = updateDemoDto.numberField;
    if (updateDemoDto.int32Field !== undefined) entity.int32Field = new Int32(updateDemoDto.int32Field);
    if (updateDemoDto.int64Field !== undefined) entity.int64Field = Long.fromNumber(updateDemoDto.int64Field);
    if (updateDemoDto.decimal128Field !== undefined) entity.decimal128Field = Decimal128.fromString(updateDemoDto.decimal128Field);
    if (updateDemoDto.booleanField !== undefined) entity.booleanField = updateDemoDto.booleanField;
    if (updateDemoDto.nullField !== undefined) entity.nullField = updateDemoDto.nullField;
    if (updateDemoDto.dateField !== undefined) entity.dateField = new Date(updateDemoDto.dateField);
    if (updateDemoDto.objectField !== undefined) entity.objectField = updateDemoDto.objectField;
    if (updateDemoDto.arrayField !== undefined) entity.arrayField = updateDemoDto.arrayField;
    if (updateDemoDto.objectIdField !== undefined) entity.objectIdField = new ObjectId(updateDemoDto.objectIdField);
    if (updateDemoDto.binaryField !== undefined) entity.binaryField = new Binary(Buffer.from(updateDemoDto.binaryField, 'base64'));
    if (updateDemoDto.regexField !== undefined) entity.regexField = new BSONRegExp(updateDemoDto.regexField);
    if (updateDemoDto.timestampField !== undefined) entity.timestampField = Timestamp.fromNumber(updateDemoDto.timestampField);

    return await this.demoRepository.save(entity);
  }

  async remove(id: string): Promise<void> {
    this.logger.log(`Removing demo entity with ID: ${id}`);
    const entity = await this.findOne(id);
    await this.demoRepository.remove(entity);
  }
}
