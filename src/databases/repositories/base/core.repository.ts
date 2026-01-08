import { EntityManager } from 'typeorm';

export interface ICoreRepository<T> {
  withManager(manager: EntityManager);
}
