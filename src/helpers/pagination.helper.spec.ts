import { PaginationHelper } from './pagination.helper';

describe('PaginationHelper', () => {
  it('toPaginate calculates totalPage correctly', () => {
    const data = [1, 2, 3, 4];
    const dto: any = { page: 1, pageSize: 2 };
    const result = PaginationHelper.toPaginate(data, dto, 5);
    expect(result.totalPage).toBe(3);
    expect(result.pageSize).toBe(2);
  });

  it('toPaginate defaults pageSize when missing', () => {
    const data = [1];
    const dto: any = { page: 1 };
    const result = PaginationHelper.toPaginate(data, dto, 100);
    expect(result.pageSize).toBe(100);
    expect(result.totalPage).toBe(1);
  });
});
