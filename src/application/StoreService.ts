import { injectable } from 'inversify';
import { UserRepository } from '../infrastructure/repositories/UserRepository';
import { User } from '../domain/entities/User';

@injectable()
export class StoreService {
  constructor(private userRepo: UserRepository) {}

  public async buyService(userId: string, service: string, price: number): Promise<User> {
    const user = await this.userRepo.findById(userId);
    if (user.balance < price) throw new Error('Saldo insuficiente');
    user.balance -= price;
    // Simula Pix: integra API real em prod
    await this.userRepo.save(user);
    return user;
  }
}