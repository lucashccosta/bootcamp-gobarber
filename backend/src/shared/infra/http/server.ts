import 'reflect-metadata'; //utilizar com typeorm
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors'; //permite que o express capture exceptions em async routes
import routes from '@shared/infra/http/routes/index.routes';
import '@shared/infra/typeorm';
import '@shared/container/index';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

// Global Exception Handling Middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: 'error',
            message: err.message
        });
    }

    return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
    });
});

app.listen(3333, () => {
    console.log('🚀 Server started on port 3333');
});