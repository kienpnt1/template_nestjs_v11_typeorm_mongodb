import { InvalidDataException } from '@core/exceptions';
import { Repository, FindOneOptions } from 'typeorm';
import * as _ from 'lodash';
import { PaginationHelper } from '@helpers/index';
import { ObjectId } from 'mongodb';

export class BaseCrudService<E> {
  constructor(protected readonly repository: Repository<E>) {}

  getSortOptions(sort?: string) {
    if (sort && !_.isEmpty(sort)) {
      return PaginationHelper.parseOrder(sort);
    }

    const cols = this.repository.metadata?.columns || [];
    const hasDisplayOrder = cols.some((column) => column.propertyName === 'displayOrder');

    if (hasDisplayOrder) {
      return { displayOrder: 'DESC', id: 'DESC' };
    }

    const hasMongoId = cols.some((column) => column.propertyName === '_id');
    if (hasMongoId) {
      return { _id: 'DESC' };
    }

    return { id: 'DESC' };
  }

  async findByIdOrFail(id: string | number, relations?: string[]) {
    const idStr = String(id);
    let record = await this.repository.findOne({ where: { id: idStr } as any, relations } as FindOneOptions<E>);
    if (!record && typeof id === 'string' && /^[a-fA-F0-9]{24}$/.test(idStr)) {
      record = await this.repository.findOne({ where: { _id: new ObjectId(idStr) } as any, relations } as FindOneOptions<E>);
    }
    if (!record) {
      throw new InvalidDataException({ message: `Not found with ID ${id}.` });
    }
    return record;
  }
}
