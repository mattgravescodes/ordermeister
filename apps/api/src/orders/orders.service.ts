// NestJS
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

// 3rd Party Utils
import { v4 as uuidv4 } from 'uuid';

// Entity
import { Order } from '@repo/api/order/entities/order.entity';

// Enum
import { OrderStatus } from '@repo/api/order/enum/order-status.enum';

// DTOs
import { CreateOrderDto } from '@repo/api/order/dto/create/create-order.dto';
import { UpdateOrderStatusDto } from '@repo/api/order/dto/update/update-order-status.dto';
import { UpdateOrderShippingDto } from '@repo/api/order/dto/update/update-order-shipping.dto';

// Clients
import { CustomerClient } from '@repo/api/clients/customer/customer.client';
import { InventoryClient } from '@repo/api/clients/inventory/inventory.client';

@Injectable()
export class OrdersService {
  private readonly _orders: Order[] = [
    {
      id: "7f3dbe4b-9041-4c0e-8f45-fdb72019b6b2",
      userId: 'user_001',
      email: 'tyrion.lannister@casterlyrock.gov',
      items: [
        {
          productId: 'wine_golden',
          productName: 'Arbor Gold Wine',
          quantity: 6,
          price: 19.99,
          sku: 'WINE-ARBOR-GLD',
          variations: ['volume: 750ml', 'vintage: 297AC'],
        },
        {
          productId: 'book_political',
          productName: 'Politics of Power',
          quantity: 1,
          price: 39.99,
          sku: 'BOOK-POL-001',
        },
      ],
      shippingAddress: {
        fullName: 'Tyrion Lannister',
        addressLine1: '13 Lion’s Tooth Lane',
        city: 'Casterly Rock',
        state: 'Westerlands',
        postalCode: 'CR001',
        country: 'Westeros',
        phone: '+44-000-LIONS',
      },
      status: OrderStatus.SHIPPED,
      subtotal: 159.93,
      shippingCost: 15,
      tax: 14.99,
      total: 189.92,
      createdAt: '2025-05-01T10:30:00.000Z',
      updatedAt: '2025-05-02T12:00:00.000Z',
      notes: 'Deliver with discretion. Do not spill the wine.',
    },
    {
      id: "4c91c769-734f-457e-922e-0b132ff32d46",
      userId: 'user_002',
      email: 'arya.stark@winterfell.com',
      items: [
        {
          productId: 'dagger_valyrian',
          productName: 'Valyrian Steel Dagger',
          quantity: 1,
          price: 149.99,
          sku: 'WPN-DAGG-VAL',
          variations: ['engraving: none'],
        },
        {
          productId: 'cloak_dark',
          productName: 'Dark Northern Cloak',
          quantity: 1,
          price: 59.99,
          sku: 'APP-CLAK-NORTH',
          variations: ['color: black', 'material: wool'],
        },
      ],
      shippingAddress: {
        fullName: 'Arya Stark',
        addressLine1: '1 Godswood Path',
        city: 'Winterfell',
        state: 'The North',
        postalCode: 'WF002',
        country: 'Westeros',
        phone: '+44-000-STARK',
      },
      status: OrderStatus.PENDING,
      subtotal: 209.98,
      shippingCost: 12.0,
      tax: 18.90,
      total: 240.88,
      createdAt: '2025-05-05T09:45:00.000Z',
      updatedAt: '2025-05-05T09:45:00.000Z',
      notes: 'Leave package in the crypts. I’ll find it.',
    },
    {
      id: "fe2e9e9c-2591-4e4f-9a87-1a5a987b2d9a",
      userId: 'user_003',
      email: 'daenerys@dragonstone.gov',
      items: [
        {
          productId: 'dagger_valyrian',
          productName: 'Valyrian Steel Dagger',
          quantity: 1,
          price: 149.99,
          sku: 'WPN-DAGG-VAL',
          variations: ['engraving: none'],
        },
        {
          productId: 'cloak_dark',
          productName: 'Dark Northern Cloak',
          quantity: 1,
          price: 59.99,
          sku: 'APP-CLAK-NORTH',
          variations: ['color: black', 'material: wool'],
        },
      ],
      shippingAddress: {
        fullName: 'Daenerys Targaryen',
        addressLine1: '7 Blackwater Bay Road',
        addressLine2: 'Chamber of the Painted Table',
        city: 'Dragonstone',
        state: 'Crownlands',
        postalCode: 'DRG001',
        country: 'Westeros',
      },
      status: OrderStatus.DELIVERED,
      subtotal: 3249.96,
      shippingCost: 0,
      tax: 259.99,
      total: 3509.95,
      createdAt: '2025-04-28T08:00:00.000Z',
      updatedAt: '2025-05-02T17:30:00.000Z',
      notes: 'Fireproof packaging required.',
    },
    {
      id: "e5bc3d8e-bbc6-41aa-a33b-74b3f62c92df",
      userId: 'user_004',
      email: 'jon.snow@thenightswatch.org',
      items: [
        {
          productId: 'cloak_black',
          productName: 'Night’s Watch Cloak',
          quantity: 1,
          price: 89.99,
          sku: 'APP-CLAK-BLK',
          variations: ['material: wool', 'trim: crow-feathered'],
        },
        {
          productId: 'sword_longclaw',
          productName: 'Longclaw Sword',
          quantity: 1,
          price: 349.99,
          sku: 'WPN-LONGCLAW',
          variations: ['hilt: direwolf pommel'],
        },
      ],
      shippingAddress: {
        fullName: 'Jon Snow',
        addressLine1: 'The Wall, Castle Black',
        city: 'The Wall',
        state: 'The North',
        postalCode: 'WALL001',
        country: 'Westeros',
      },
      status: OrderStatus.PROCESSING,
      subtotal: 439.98,
      shippingCost: 20.0,
      tax: 36.25,
      total: 496.23,
      createdAt: '2025-05-06T06:20:00.000Z',
      updatedAt: '2025-05-06T07:00:00.000Z',
      notes: 'No wildlings should handle this delivery.',
    },
    {
      id: "dfd08485-6401-4208-93f3-5f0acb7d10d5",
      userId: 'user_005',
      email: 'brienne@maidenvault.kn',
      items: [
        {
          productId: 'armor_plate',
          productName: 'Full Plate Armor',
          quantity: 1,
          price: 499.99,
          sku: 'ARMOR-FULL-001',
          variations: ['size: L', 'finish: polished steel'],
        },
        {
          productId: 'oathkeeper',
          productName: 'Oathkeeper Sword',
          quantity: 1,
          price: 399.99,
          sku: 'WPN-OATHKEEP',
          variations: ['engraving: lion & rose'],
        },
      ],
      shippingAddress: {
        fullName: 'Brienne of Tarth',
        addressLine1: '9 Sapphire Isle Keep',
        city: 'Evenfall Hall',
        state: 'The Stormlands',
        postalCode: 'STMLD001',
        country: 'Westeros',
      },
      status: OrderStatus.PROCESSING,
      subtotal: 899.98,
      shippingCost: 25.0,
      tax: 72.00,
      total: 996.98,
      createdAt: '2025-05-07T14:15:00.000Z',
      updatedAt: '2025-05-08T09:00:00.000Z',
      notes: 'Ensure items are battle-ready upon arrival.',
    }
  ];

  constructor(
    private readonly customerClient: CustomerClient,
    private readonly inventoryClient: InventoryClient,
  ) { }

  createOrder(createOrderDto: CreateOrderDto): Order {
    // 1. Validate customer
    const customer = this.customerClient.getCustomerById(createOrderDto.userId);
    if (!customer || !customer.isActive) throw new BadRequestException(`Customer ID ${createOrderDto.userId} is invalid or inactive.`);

    // 2. Validate inventory for each item
    for (const item of createOrderDto.items) {
      const isAvailable = this.inventoryClient.isAvailable(item.productId, item.quantity);
      if (!isAvailable) throw new BadRequestException(`Insufficient inventory for product: ${item.productName}`);
    }

    // 3. Reserve inventory
    for (const item of createOrderDto.items) {
      this.inventoryClient.reserve(item.productId, item.quantity);
    }

    // 4. Create and store the order
    const newOrder: Order = {
      id: uuidv4(),
      ...createOrderDto,
      status: createOrderDto.status || OrderStatus.PENDING,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this._orders.push(newOrder);
    return newOrder;
  }

  fetchAllOrders(): Order[] {
    return this._orders;
  }

  fetchSingleOrder(id: string): Order {
    const order = this._orders.find((order) => order.id === id);
    if (!order) throw new NotFoundException(`Order with id "${id}" not found`);
    return order;
  }

  updateOrderStatus(id: string, dto: UpdateOrderStatusDto): Order {
    const order = this.fetchSingleOrder(id);
    order.status = dto.status;
    order.updatedAt = new Date().toISOString();
    return order;
  }

  updateOrderShipping(id: string, dto: UpdateOrderShippingDto): Order {
    const order = this.fetchSingleOrder(id);
    order.trackingCompany = dto.trackingCompany;
    order.trackingNumber = dto.trackingNumber;
    order.updatedAt = new Date().toISOString();
    return order;
  }

  removeOrder(id: string): void {
    const index = this._orders.findIndex((order) => order.id === id);
    if (index === -1) throw new NotFoundException(`Order with id "${id}" not found`);
    this._orders.splice(index, 1);
  }
}
