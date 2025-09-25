import { injectable } from 'inversify';
import { Repository } from 'typeorm';
import { Rental } from '../../domain/entities/Rental';

@injectable()
export class RentalRepository {
  private repo: Repository<Rental>;

  constructor() {
    this.repo = new DataSource().getRepository(Rental);
  }

  public async save(rental: Rental): Promise<Rental> {
    return this.repo.save(rental);
  }

  public async findActiveByGroup(groupId: string): Promise<Rental[]> {
    return this.repo.find({ where: { groupId, endDate: { $gt: new Date() } } });
  }
}