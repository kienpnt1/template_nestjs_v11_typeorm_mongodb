import { BaseError } from '@core/exceptions';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class TransactionBaseRepository {
  constructor(private readonly dataSource: DataSource) {}
  public async _withTransaction<T>(handler: (manager: DataSource['manager']) => Promise<T>) {
    if (this.dataSource.options.type === 'mongodb') {
      return handler(this.dataSource.manager);
    }
    const runner = this.dataSource.createQueryRunner();
    try {
      await runner.connect();
      await runner.startTransaction();
      const result = await handler(runner.manager);
      await runner.commitTransaction();
      return result;
    } catch (error) {
      await runner.rollbackTransaction();
      throw new BaseError({ message: error?.message || error });
    } finally {
      await runner.release();
    }
  }
}
