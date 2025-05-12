// Validation
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateOrderShippingDto {
  @IsString()
  @IsNotEmpty()
  trackingCompany: string;

  @IsString()
  @IsNotEmpty()
  trackingNumber: string;
}
