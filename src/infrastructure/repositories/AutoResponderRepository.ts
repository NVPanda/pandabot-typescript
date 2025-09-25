import { injectable } from 'inversify';
import { Repository } from 'typeorm';
import { AutoResponderRule } from '../../domain/entities/AutoResponder';

@injectable()
export class AutoResponderRepository {
  private repo: Repository<AutoResponderRule>;

  constructor() {
    this.repo = new DataSource().getRepository(AutoResponderRule);
  }

  public async findByTrigger(trigger: string): Promise<AutoResponderRule | null> {
    return this.repo.findOneBy({ trigger, active: true });
  }
}