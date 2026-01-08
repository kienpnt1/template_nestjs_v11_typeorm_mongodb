import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { DemoRepository } from '@databases/repositories';
import { DemoEntity } from '@databases/entities';
import { ObjectId } from 'mongodb';
import { ListDemoDto } from './dto';
import { CommonRequestInterface } from '@core/interfaces';
import { PaginationHelper } from '@helpers/pagination.helper';

@Injectable()
export class GuestDemoService {
  private readonly logger = new Logger(GuestDemoService.name);

  constructor(private readonly demoRepository: DemoRepository) { }

  public async findAll(pickData: ListDemoDto): Promise<any> {
    this.logger.log(`Guest fetching all demo entities`);
    const { skip, take } = PaginationHelper.fromPageSizeToSkipTake(pickData);
    const limit = take > 100 ? 100 : take;

    const [data, total] = await this.demoRepository.findAndCount({
      skip,
      take: limit,
    });

    return PaginationHelper.toPaginate(data, pickData, total);
  }

  public async findOne(id: string, context: CommonRequestInterface): Promise<DemoEntity> {
    this.logger.log(`Guest fetching demo entity with ID: ${id}`);
    return this.findByIdOrFail(id.toString());
  }

  private async findByIdOrFail(id: string, relations?: string[]) {
    if (!ObjectId.isValid(id)) throw new NotFoundException(`Invalid ID format`);
    const entity = await this.demoRepository.findOne({ where: { _id: new ObjectId(id) } });
    if (!entity) throw new NotFoundException(`Demo with ID ${id} not found`);
    return entity;
  }
}
