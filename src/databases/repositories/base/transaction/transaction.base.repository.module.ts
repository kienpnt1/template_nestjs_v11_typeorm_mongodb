import { Global, Module } from '@nestjs/common';
import { TransactionBaseRepository } from './transaction.base.repository';

@Global()
@Module({
  providers: [TransactionBaseRepository],
  exports: [TransactionBaseRepository],
})
export class TransactionBaseRepositoryModule {}
