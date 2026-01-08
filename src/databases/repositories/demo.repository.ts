import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, MongoRepository } from 'typeorm';
import { DemoEntity } from '@databases/entities';
import { DemoModel } from '@databases/models';
import { ICoreRepository } from './base';

@Injectable()
export class DemoRepository extends MongoRepository<DemoEntity> implements ICoreRepository<DemoModel> {
  constructor(
    @InjectRepository(DemoEntity)
    repository: MongoRepository<DemoEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  withManager(manager: EntityManager): DemoRepository {
    return new DemoRepository(manager.getMongoRepository(DemoEntity));
  }
}
