import { Test, TestingModule } from '@nestjs/testing';
import { DemoService } from './demo.service';
import { DemoRepository } from '@databases/repositories';
import { DemoEntity } from '@databases/entities';
import { ListDemoDto } from './dto/list-demo.dto';

const mockDemoRepository = () => ({
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  remove: jest.fn(),
});

describe('DemoService', () => {
  let service: DemoService;
  let repository: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DemoService,
        { provide: DemoRepository, useFactory: mockDemoRepository },
      ],
    }).compile();

    service = module.get<DemoService>(DemoService);
    repository = module.get<DemoRepository>(DemoRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return paginated demo entities', async () => {
      const result = [[new DemoEntity()], 1];
      const listDemoDto = { page: 1, pageSize: 10 } as unknown as ListDemoDto;
      repository.findAndCount.mockResolvedValue(result);

      const response = await service.findAll(listDemoDto);
      expect(response.data).toEqual(result[0]);
      expect(response.totalItem).toEqual(result[1]);
    });
  });

  describe('findOne', () => {
    it('should return a demo entity', async () => {
      const result = new DemoEntity();
      repository.findOne.mockResolvedValue(result);
      // We need a valid ObjectId string for validation
      const id = '507f1f77bcf86cd799439011'; 
      expect(await service.findOne(id)).toBe(result);
    });
  });
});
