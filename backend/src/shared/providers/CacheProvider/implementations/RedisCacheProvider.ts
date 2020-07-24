import Redis, { Redis as RedisClient } from 'ioredis';
import cacheConfig from '@config/cache';
import ICacheProvider from '@shared/providers/CacheProvider/models/ICacheProvider';

class RedisCacheProvider implements ICacheProvider {

    private client: RedisClient;

    constructor() {
        this.client = new Redis(cacheConfig.config.redis);
    }

    public async save(key: string, value: string): Promise<void> {

    }

    public async recover(key: string): Promise<void> {

    }

    public async invalidate(key: string): Promise<void> {

    }
}

export default RedisCacheProvider;