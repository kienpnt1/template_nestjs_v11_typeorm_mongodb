import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class InitService {
  constructor() {}

  async initTenant() {
    Logger.warn(`InitModule dependencies initialized `);
  }
}
