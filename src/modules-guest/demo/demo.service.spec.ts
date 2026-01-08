import { Test, TestingModule } from '@nestjs/testing';
import { GuestDemoService } from './demo.service';
import { DemoRepository } from '@databases/repositories';

const mockDemoRepository = {
  findAndCount: jest.fn(),
  find: jest.fn(),
};

describe('GuestDemoService', () => {
  let service: GuestDemoService;
  let repository: typeof mockDemoRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GuestDemoService,
        {
          provide: DemoRepository,
          useValue: mockDemoRepository,
        },
      ],
    }).compile();

    service = module.get<GuestDemoService>(GuestDemoService);
    repository = module.get(DemoRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return paginated result', async () => {
    const mockData = [{ id: 1 }, { id: 2 }];
    const mockTotal = 10;
    mockDemoRepository.findAndCount.mockResolvedValue([mockData, mockTotal]);

    const dto: any = { page: '1', pageSize: '2' };
    const result = await service.findAll(dto);

    expect(repository.findAndCount).toHaveBeenCalledWith({
      skip: 0,
      take: 2,
    });

    expect(result).toEqual({
      data: mockData,
      page: 1,
      pageSize: 2,
      totalItem: 10,
      totalPage: 5,
    });
  });

  it('findAll should limit pageSize to 100', async () => {
    const mockData = [];
    const mockTotal = 0;
    mockDemoRepository.findAndCount.mockResolvedValue([mockData, mockTotal]);

    const dto: any = { page: '1', pageSize: '1000' };
    await service.findAll(dto);

    expect(repository.findAndCount).toHaveBeenCalledWith({
      skip: 0,
      take: 100,
    });
  });
});
