// Validation
import {
    IsString,
    IsNumber,
    IsNotEmpty,
    IsOptional,
    IsArray,
    Min,
    MaxLength,
} from 'class-validator';

export class OrderItemDto {
    @IsString()
    @IsNotEmpty()
    productId: string;

    @IsString()
    @IsNotEmpty()
    productName: string;

    @IsString()
    @IsOptional()
    variantId?: string;

    @IsArray()
    @IsOptional()
    @MaxLength(5, { each: true })
    variations?: string[];

    @IsNumber()
    @Min(1)
    quantity: number;

    @IsNumber()
    @Min(0)
    price: number;

    @IsOptional()
    @IsString()
    sku?: string;
}
