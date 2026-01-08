import { DynamicModule, Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { LogConfig } from './logger.interface';

@Module({})
export class LoggerModule {
  static register(logConfig: LogConfig): DynamicModule {
    return {
      global: true,
      module: LoggerModule,
      providers: [
        {
          provide: LoggerService,
          useValue: () => new LoggerService(logConfig),
        },
      ],
      exports: [LoggerService],
    };
  }
}
