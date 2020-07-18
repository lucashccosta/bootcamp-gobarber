import { Request, Response, NextFunction, request } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAuthenticated(req: Request, res: Response, next: NextFunction): void {
    const authHeader = req.headers.authorization;
    if(!authHeader) {
        throw new AppError('JWT token is missing.', 401);
    }

    const [, token] = authHeader.split(' '); //exclui o Bearer
    
    try {
        const decoded = verify(token, authConfig.jwt.secret);
        const { sub } = decoded as TokenPayload; //força o decoded ser do tipo TokenPayload

        // insere o usuário logado em todas as rotas autenticadas
        request.user = {
            id: sub
        };

        return next();
    }
    catch(err) {
        throw new AppError('Invalid JWT token.', 401);
    }
}