import { injectable } from 'inversify';
import { Repository } from 'typeorm';
import { User } from '../../domain/entities/User';
import { DataSource } from 'typeorm'; // Assume DataSource global

@injectable()
export class UserRepository {
  private repo: Repository<User>;

  constructor() {
    this.repo = new DataSource().getRepository(User); // Injetar em prod
  }

  public async findById(id: string): Promise<User> {
    return this.repo.findOneBy({ id }) || { id, isVip: false, balance: 0 };
  }

  public async save(user: User): Promise<User> {
    return this.repo.save(user);
  }
}