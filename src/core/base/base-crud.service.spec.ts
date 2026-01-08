import { BaseCrudService } from './base-crud.service';
import { InvalidDataException } from '@core/exceptions';
import { PaginationHelper } from '@helpers/index';

class FakeRepository<T> {
  private data: Record<number, T> = {};
  public metadata = {
    columns: [] as any[],
  };

  set(id: number, value: T) {
    this.data[id] = value;
  }
  async findOne(options: any): Promise<T | null> {
    const id = Number(options?.where?.id);
    return this.data[id] || null;
  }
}

describe('BaseCrudService', () => {
  describe('findByIdOrFail', () => {
    it('returns entity when exists', async () => {
      const repo = new FakeRepository<any>();
      repo.set(1, { id: 1 });
      const service = new BaseCrudService<any>(repo as any);
      const result = await service.findByIdOrFail(1);
      expect(result).toEqual({ id: 1 });
    });

    it('throws when not found', async () => {
      const repo = new FakeRepository<any>();
      const service = new BaseCrudService<any>(repo as any);
      await expect(service.findByIdOrFail(999)).rejects.toBeInstanceOf(InvalidDataException);
    });
  });

  describe('getSortOptions', () => {
    it('should return parsed order when sort string is provided', () => {
      const repo = new FakeRepository<any>();
      const service = new BaseCrudService<any>(repo as any);
      const sort = 'name:ASC;createdAt:DESC';
      const result = service.getSortOptions(sort);
      expect(result).toEqual({ name: 'ASC', createdAt: 'DESC' });
    });

    it('should return default sort by displayOrder and id DESC when entity has displayOrder', () => {
      const repo = new FakeRepository<any>();
      repo.metadata.columns = [{ propertyName: 'id' }, { propertyName: 'name' }, { propertyName: 'displayOrder' }];
      const service = new BaseCrudService<any>(repo as any);
      const result = service.getSortOptions();
      expect(result).toEqual({ displayOrder: 'DESC', id: 'DESC' });
    });

    it('should return default sort by id DESC when entity does not have displayOrder', () => {
      const repo = new FakeRepository<any>();
      repo.metadata.columns = [{ propertyName: 'id' }, { propertyName: 'name' }];
      const service = new BaseCrudService<any>(repo as any);
      const result = service.getSortOptions();
      expect(result).toEqual({ id: 'DESC' });
    });

    it('should return default sort by id DESC when entity has id but no displayOrder', () => {
      const repo = new FakeRepository<any>();
      // Simulate entity with both id and other fields, but no displayOrder
      repo.metadata.columns = [{ propertyName: 'id' }, { propertyName: 'updatedAt' }];
      const service = new BaseCrudService<any>(repo as any);
      const result = service.getSortOptions();
      expect(result).toEqual({ id: 'DESC' });
    });
  });
});
