import { RedisOptions } from 'ioredis';

interface ICacheConfig {
    driver: 'redis';
    config: {
        redis: RedisOptions;
    }
}

export default {
    driver: process.env.CACHE_DRIVER,
    config: {
        redis: {
            host: process.env.REDIS_HOST || '127.0.0.1',
            port: process.env.REDIS_PORT || 6379,
            username: process.env.REDIS_USERNAME,
            password: process.env.REDIS_PASSWORD
         }
    }
} as ICacheConfig;