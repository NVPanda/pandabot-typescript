import { injectable, inject } from 'inversify';
import { RentalRepository } from '../infrastructure/repositories/RentalRepository';
import { Rental } from '../domain/entities/Rental';
import { Group } from '../domain/entities/Group';
import TYPES from '../types';

@injectable()
export class RentalService {
  constructor(
    @inject(TYPES.RentalRepository) private rentalRepo: RentalRepository
  ) {}

  public async rentGroup(groupId: string, durationHours: number): Promise<Rental> {
    const rental = new Rental();
    rental.groupId = groupId;
    rental.durationHours = durationHours;
    rental.startDate = new Date();
    rental.endDate = new Date(Date.now() + durationHours * 60 * 60 * 1000);
    await this.rentalRepo.save(rental);
    // Atualiza group isRented = true
    return rental;
  }

  public async isActive(groupId: string): Promise<boolean> {
    const rentals = await this.rentalRepo.findActiveByGroup(groupId);
    return rentals.some(r => r.endDate! > new Date());
  }
}