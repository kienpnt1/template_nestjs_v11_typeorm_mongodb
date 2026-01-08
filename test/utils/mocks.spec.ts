import { Repository } from 'typeorm';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () =>
    ({
      find: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
      update: jest.fn(),
      softDelete: jest.fn(),
      recover: jest.fn(),
      count: jest.fn(),
      findAndCount: jest.fn(),
      preload: jest.fn(),
      merge: jest.fn(),
      createQueryBuilder: jest.fn(() => ({
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        leftJoin: jest.fn().mockReturnThis(),
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        innerJoin: jest.fn().mockReturnThis(),
        innerJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        orWhere: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        addOrderBy: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        getMany: jest.fn(),
        getOne: jest.fn(),
        getRawMany: jest.fn(),
        getRawOne: jest.fn(),
        getCount: jest.fn(),
        getManyAndCount: jest.fn(),
        setParameters: jest.fn().mockReturnThis(),
        offset: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
      })),
      withManager: jest.fn().mockReturnThis(),
      metadata: { columns: [] },
    }) as unknown as MockType<Repository<any>>,
);

export const mapperMockFactory: () => MockType<any> = jest.fn(() => ({
  fromModelToEntity: jest.fn((model, EntityClass) => {
    if (!model) return undefined;
    const entity = new EntityClass();
    Object.assign(entity, model);
    return entity;
  }),
  fromEntityToModel: jest.fn((entity, ModelClass) => {
    if (!entity) return undefined;
    const model = new ModelClass();
    Object.assign(model, entity);
    return model;
  }),
  map: jest.fn(),
  forUpdate: jest.fn(),
}));

export const serviceMockFactory = <T = any>(service: new (...args: any[]) => T): MockType<T> => {
  const methods = Object.getOwnPropertyNames(service.prototype).filter((method) => method !== 'constructor');
  const mock: any = {};
  methods.forEach((method) => {
    mock[method] = jest.fn();
  });
  return mock;
};
