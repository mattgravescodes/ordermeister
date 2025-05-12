// Validation
import { IsEnum, IsNotEmpty } from 'class-validator';

// Enum
import { OrderStatus } from '../../enum/order-status.enum';

export class UpdateOrderStatusDto {
    @IsEnum(OrderStatus)
    @IsNotEmpty()
    status: OrderStatus;
}
