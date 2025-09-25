export interface Group {
  id: string;
  owner: string;
  isRented: boolean;
  rentalEndDate?: Date;
}