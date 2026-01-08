import { GenericMapperService } from '@databases/mappers';
import { TransactionBaseRepositoryModule } from '@databases/repositories/base/transaction/transaction.base.repository.module';
import { InitModule } from '@modules/init/init.module';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [InitModule, TransactionBaseRepositoryModule],
  providers: [GenericMapperService],
  exports: [InitModule, TransactionBaseRepositoryModule, GenericMapperService],
})
export class CommonModule {}
