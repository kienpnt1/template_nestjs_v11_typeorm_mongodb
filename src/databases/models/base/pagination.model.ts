import { Expose as JsonProperty, Type } from 'class-transformer';

export class Sort {
  public property: string;
  public direction: 'ASC' | 'DESC' | string;
  public sort: string;

  constructor(sort: string) {
    if (sort) {
      this.sort = sort;
      [this.property, this.direction] = sort.split(',');
    }
  }

  asOrder(): any {
    const order = {};
    order[this.property] = this.direction;
    return order;
  }

  asGroupOrder(): any {
    const order = {};
    order[`${this.property}`] = this.direction == 'ASC' ? 1 : -1;
    return order;
  }
}

export class IPageRequest {
  @JsonProperty()
  page = 0;
  @JsonProperty()
  size = 20;
  @JsonProperty()
  sort = 'id,ASC';
}

export class PageRequest {
  @JsonProperty()
  page = 0;
  @JsonProperty()
  size = 20;
  @Type(() => Sort)
  sort: Sort = new Sort('id,ASC');

  constructor(page: any, size: any, sort: any) {
    this.page = +page || this.page;
    this.size = +size || this.size;
    this.sort = sort ? new Sort(sort) : this.sort;
  }
}

export class Page<T> {
  constructor(
    public content: T[],
    public total: number,
    public pageable: PageRequest,
  ) {}
}
