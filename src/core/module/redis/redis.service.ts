import { Injectable, Logger } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private readonly logger = new Logger(RedisService.name);

  constructor(@InjectRedis() private readonly redis: Redis) {}

  async getByKey<T = any>(key: string): Promise<T | undefined> {
    try {
      const data = await this.redis.get(key);
      return data ? JSON.parse(data) : undefined;
    } catch (error) {
      this.logger.error(`Error parsing Redis key "${key}":`, error);
      return undefined;
    }
  }

  async setDataKey(key: string, data: any, timeInSeconds?: number): Promise<'OK' | null> {
    if (data === undefined || data === null) return null;
    const formatted = typeof data === 'string' ? data : JSON.stringify(data);
    return timeInSeconds
      ? await this.redis.set(key, formatted, 'EX', timeInSeconds)
      : await this.redis.set(key, formatted);
  }

  async delDataKey(keys: string[]): Promise<number> {
    if (!keys?.length) return 0;
    return await this.redis.del(...keys);
  }

  async getAllKeys(pattern = '*'): Promise<string[]> {
    return await this.redis.keys(pattern);
  }

  async getAllKeyValues(): Promise<Record<string, any>> {
    const keys = await this.getAllKeys();
    const entries = await Promise.all(keys.map(async (key) => [key, await this.getByKey(key)]));
    return Object.fromEntries(entries);
  }

  /**
   * 🔍 Find all keys and values matching a given pattern (e.g., 'tenant:*:dbConfig')
   */
  async findByPattern(pattern: string): Promise<Record<string, any>> {
    const keys = await this.getAllKeys(pattern);
    const entries = await Promise.all(keys.map(async (key) => [key, await this.getByKey(key)]));
    return Object.fromEntries(entries);
  }
}
