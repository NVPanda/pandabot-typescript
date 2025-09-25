import { proto } from '@whiskeysockets/baileys';
import { RentalService } from '../../application/RentalService';

export class AuthMiddleware {
  constructor(private rentalService: RentalService) {}

  public async checkRental(groupId: string): Promise<boolean> {
    return this.rentalService.isActive(groupId);
  }
}