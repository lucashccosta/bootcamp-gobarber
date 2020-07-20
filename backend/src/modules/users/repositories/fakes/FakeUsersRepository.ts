import { uuid } from 'uuidv4';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

class FakeUsersRepository implements IUsersRepository {

    private users: User[] = [];

    public async findById(id: string): Promise<User | undefined> {
        const user = this.users.find(usr => usr.id === id);

        return user;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const user = this.users.find(usr => usr.email === email);

        return user;
    }

    public async create(data: ICreateUserDTO): Promise<User> {
        const user = new User();
        Object.assign(user, { id: uuid() }, data);

        this.users.push(user);

        return user;
    }

    public async update(user: User): Promise<User> {
        const findIndex = this.users.findIndex(usr => usr.id === user.id);

        this.users[findIndex] = user;

        return user;
    }
}

export default FakeUsersRepository;