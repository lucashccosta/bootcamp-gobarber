import { container } from 'tsyringe';
import cacheConfig from '@config/cache';

import ICacheProvider from '@shared/providers/CacheProvider/models/ICacheProvider';
import RedisCacheProvider from '@shared/providers/CacheProvider/implementations/RedisCacheProvider';

const providers = {
    redis: RedisCacheProvider,
};

container.registerSingleton<ICacheProvider>(
    'CacheProvider', 
    providers[cacheConfig.driver]
);