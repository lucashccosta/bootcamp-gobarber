import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
    email: string,
    password: string
}

interface IResponse {
    user: User,
    token: string
}

@injectable()
class AuthenticateUserService {

    private usersRepository: IUsersRepository;

    private hashProvider: IHashProvider;

    constructor(
        @inject('UsersRepository')
        usersRepository: IUsersRepository,

        @inject('HashProvider')
        hashProvider: IHashProvider
    ) {
        this.usersRepository = usersRepository;
        this.hashProvider = hashProvider;
    }

    public async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);
        if(!user) {
            throw new AppError('Incorrect email/password combination', 401);
        }

        const passwordMatched = await this.hashProvider.compare(password, user.password);
        if(!passwordMatched) {
            throw new AppError('Incorrect email/password combination', 401);
        }

        //Usuário autenticado
        const { secret, expiresIn } = authConfig.jwt;
        const token = sign({}, secret, {
            subject: user.id,
            expiresIn
        });

        return { user, token };
    }
}

export default AuthenticateUserService;