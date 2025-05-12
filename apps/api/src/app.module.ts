// NestJS
import { Module } from '@nestjs/common';

// Modules
import { OrdersModule } from './orders/orders.module';

// Service
import { AppService } from './app.service';

// Controller
import { AppController } from './app.controller';

@Module({
  imports: [OrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
