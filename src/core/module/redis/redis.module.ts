import { DynamicModule, Global, Module } from '@nestjs/common';
import { RedisModule } from '@nestjs-modules/ioredis';
import { RedisService } from './redis.service';
import { IRedisConfig } from './redis.config';
import { RedisPubSubService } from './redis.pubsub';

@Global()
@Module({})
export class RedisCustomModule {
  static register(config: IRedisConfig): DynamicModule {
    // version 2.x chỉ có thể dùng connection link.
    const redisUrl = `redis://:${config.password}@${config.host}:${config.port}/${config.db ?? 0}`;
    return {
      module: RedisCustomModule,
      global: true,
      imports: [
        RedisModule.forRoot({
          type: 'single',
          url: redisUrl,
        }),
      ],
      providers: [RedisService, RedisPubSubService],
      exports: [RedisService, RedisPubSubService],
    };
  }
}
