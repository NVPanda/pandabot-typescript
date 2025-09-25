import { injectable, inject } from 'inversify';
import pLimit from 'p-limit';
import { UserRepository } from '../infrastructure/repositories/UserRepository';
import { AiProviderFactory } from '../infrastructure/external/AiProviderFactory';
import { AiProvider } from '../infrastructure/external/AiProvider';
import TYPES from '../types';

@injectable()
export class VipAiService {
  private limit = pLimit(5);

  constructor(
    @inject(TYPES.UserRepository) private userRepo: UserRepository,
    @inject(TYPES.AiProviderFactory) private factory: AiProviderFactory
  ) {}

  public async generateResponse(userId: string, query: string, providerName: string): Promise<string> {
    const user = await this.userRepo.findById(userId);
    if (!user.isVip) throw new Error('Acesso VIP requerido');

    return this.limit(async () => {
      const provider: AiProvider = this.factory.create(providerName);
      return provider.generateText(query);
    });
  }

  public async generateImage(userId: string, query: string, providerName: string): Promise<string> {
    const user = await this.userRepo.findById(userId);
    if (!user.isVip) throw new Error('Acesso VIP requerido');

    return this.limit(async () => {
      const provider: AiProvider = this.factory.create(providerName);
      return provider.generateImage(query);
    });
  }
}