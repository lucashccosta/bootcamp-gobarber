/**
 * Override Types
 * Adiciona o tipo user dentro da Request do express
 */
declare namespace Express {
    export interface Request {
        user: {
            id: string
        }
    }
}