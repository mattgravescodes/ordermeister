// NestJS
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body
} from '@nestjs/common';

// Service
import { OrdersService } from './orders.service';

// Dto
import { CreateOrderDto } from '@repo/api/order/dto/create/create-order.dto';
import { UpdateOrderStatusDto } from '@repo/api/order/dto/update/update-order-status.dto';
import { UpdateOrderShippingDto } from '@repo/api/order/dto/update/update-order-shipping.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Post()
  createOrder(@Body() dto: CreateOrderDto) {
    return this.ordersService.createOrder(dto);
  }

  @Get()
  fetchAllOrders() {
    return this.ordersService.fetchAllOrders();
  }

  @Get(':id')
  fetchSingleOrder(@Param('id') id: string) {
    return this.ordersService.fetchSingleOrder(id);
  }

  @Patch(':id/status')
  updateOrderStatus(
    @Param('id') id: string,
    @Body() dto: UpdateOrderStatusDto,
  ) {
    return this.ordersService.updateOrderStatus(id, dto);
  }

  @Patch(':id/shipping')
  updateOrderShipping(
    @Param('id') id: string,
    @Body() dto: UpdateOrderShippingDto,
  ) {
    return this.ordersService.updateOrderShipping(id, dto);
  }

  @Delete(':id')
  removeOrder(@Param('id') id: string) {
    return this.ordersService.removeOrder(id);
  }
}
