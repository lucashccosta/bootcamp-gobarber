import { Request, Response, NextFunction } from 'express';
import redis from 'redis';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import AppError from '@shared/errors/AppError';

const redisClient = redis.createClient({
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: Number(process.env.REDIS_PORT) || 6379,
    password: process.env.REDIS_PASSWORD || undefined
});

const rateLimiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'ratelimit',
    points: 5,
    duration: 1
});

const apiRateLimiter = async (
    request: Request, 
    response: Response, 
    next: NextFunction
): Promise<void> => {
    try {
        await rateLimiter.consume(request.ip);

        return next();
    }
    catch(err) {
        throw new AppError('Too many requests.', 429);
    }
};

export default apiRateLimiter;