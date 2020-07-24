import Redis, { Redis as RedisClient } from 'ioredis';
import cacheConfig from '@config/cache';
import ICacheProvider from '@shared/providers/CacheProvider/models/ICacheProvider';

class RedisCacheProvider implements ICacheProvider {

    private client: RedisClient;

    constructor() {
        this.client = new Redis(cacheConfig.config.redis);
    }

    public async save(key: string, value: string): Promise<void> {
        this.client.set(key, JSON.stringify(value));
    }

    public async recover<T>(key: string): Promise<T | null> {
        const data = await this.client.get(key);
        if(!data) {
            return null;
        }

        const parsedData = JSON.parse(data) as T;

        return parsedData;
    }

    public async invalidate(key: string): Promise<void> {

    }

    /**
     * Invalida todas as chaves que possuam o prefixo
     * @param prefix 
     */
    public async invalidatePrefix(prefix: string): Promise<void> {
        const keys = await this.client.keys(`${prefix}:*`);
        const pipeline = await this.client.pipeline();
        
        keys.forEach(key => {
            pipeline.del(key);
        });

        await pipeline.exec(); //executa em batch
    }
}

export default RedisCacheProvider;