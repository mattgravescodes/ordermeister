// NestJS
import { Module } from '@nestjs/common';

// Service
import { OrdersService } from './orders.service';

// Controller
import { OrdersController } from './orders.controller';

// Clients
import { CustomerClient } from '@repo/api/clients/customer/customer.client';
import { InventoryClient } from '@repo/api/clients/inventory/inventory.client';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, CustomerClient, InventoryClient],
})

export class OrdersModule { }
