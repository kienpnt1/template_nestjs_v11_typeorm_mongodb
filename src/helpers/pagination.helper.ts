import { IPagination } from '@core/interfaces';

export class PaginationHelper {
  /**
   * @param _option { select: string, sort: string, offset: number, page: number, pageSize: number }
   * @returns data: { skip: number, take: number }
   */
  static fromPageSizeToSkipTake(_option: IPagination) {
    const skip = (+_option.page > 1 ? (+_option.page - 1) * +_option.pageSize : 0) || 0;
    const take = +_option.pageSize || 100;
    return { skip, take };
  }

  static toPaginate(result, pageRequest: IPagination, totalItems: number) {
    if (result instanceof Array) {
      const size = +pageRequest.pageSize || 100;
      const totalPage = Math.ceil(totalItems / size);
      return {
        data: result,
        page: +pageRequest.page || 1,
        pageSize: size,
        totalItem: +totalItems || 0,
        totalPage: totalPage || 1,
      };
    } else return result;
  }

  /**
   *
   * @param sortString
   * @returns object {key: value}
   */
  static parseOrder(sortString: string) {
    const results: any = {};
    const splitSortString = sortString.split(';');
    splitSortString.forEach((element) => {
      const tmpSplitElement = element.split(':');
      if (tmpSplitElement && tmpSplitElement.length === 2) {
        results[tmpSplitElement[0]] = tmpSplitElement[1];
      }
    });
    return results;
  }
}
