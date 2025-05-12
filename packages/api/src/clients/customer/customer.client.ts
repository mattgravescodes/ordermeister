import { Injectable } from '@nestjs/common';
import { Customer } from './customer.interface';

@Injectable()
export class CustomerClient {
  private readonly customers: Customer[] = [
    {
      id: 'user_001',
      name: 'Tyrion Lannister',
      email: 'tyrion.lannister@casterlyrock.gov',
      isActive: true,
    },
    {
      id: 'user_002',
      name: 'Arya Stark',
      email: 'arya.stark@winterfell.com',
      isActive: true,
    },
    {
      id: 'user_003',
      name: 'Daenerys Targaryen',
      email: 'daenerys@dragonstone.gov',
      isActive: true,
    },
    {
      id: 'user_004',
      name: 'Jon Snow',
      email: 'jon.snow@thenightswatch.org',
      isActive: true,
    },
    {
      id: 'user_005',
      name: 'Brienne of Tarth',
      email: 'brienne@maidenvault.kn',
      isActive: true,
    },
  ];

  getCustomerById(id: string): Customer | null {
    return this.customers.find((c) => c.id === id) || null;
  }
}
