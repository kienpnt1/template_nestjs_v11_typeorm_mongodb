// src/redis/redis-pubsub.service.ts

import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

@Injectable()
export class RedisPubSubService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RedisPubSubService.name);

  private subscriber: Redis;
  private publisher: Redis;

  constructor(@InjectRedis() private readonly redis: Redis) {}

  async onModuleInit() {
    // Tạo kết nối riêng cho pub và sub
    this.subscriber = new Redis(this.redis.options);
    this.publisher = new Redis(this.redis.options);

    this.logger.log('RedisPubSubService initialized');
  }

  async onModuleDestroy() {
    await this.subscriber?.quit();
    await this.publisher?.quit();
    this.logger.log('RedisPubSubService connections closed');
  }

  async publish(channel: string, message: any): Promise<number> {
    const payload = typeof message === 'string' ? message : JSON.stringify(message);
    return await this.publisher.publish(channel, payload);
  }

  async subscribe(channel: string, handler: (message: string) => void): Promise<void> {
    await this.subscriber.subscribe(channel);

    this.subscriber.on('message', (receivedChannel, message) => {
      if (receivedChannel === channel) {
        try {
          handler(message);
        } catch (error) {
          this.logger.error(`Error in handler for channel "${channel}":`, error);
        }
      }
    });

    this.logger.log(`Subscribed to Redis channel: ${channel}`);
  }
}
