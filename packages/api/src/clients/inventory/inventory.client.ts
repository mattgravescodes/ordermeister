import { Injectable } from '@nestjs/common';
import { InventoryItem } from './inventory-item.interface';

@Injectable()
export class InventoryClient {
    private readonly inventory: InventoryItem[] = [
        {
            productId: 'wine_golden',
            productName: 'Arbor Gold Wine',
            availableQuantity: 20,
            sku: 'WINE-ARBOR-GLD',
            variations: ['volume: 750ml', 'vintage: 297AC'],
        },
        {
            productId: 'book_political',
            productName: 'Politics of Power',
            availableQuantity: 5,
            sku: 'BOOK-POL-001',
        },
        {
            productId: 'dagger_valyrian',
            productName: 'Valyrian Steel Dagger',
            availableQuantity: 3,
            sku: 'WPN-DAGG-VAL',
            variations: ['engraving: none'],
        },
        {
            productId: 'cloak_dark',
            productName: 'Dark Northern Cloak',
            availableQuantity: 4,
            sku: 'APP-CLAK-NORTH',
            variations: ['color: black', 'material: wool'],
        },
        {
            productId: 'cloak_black',
            productName: 'Night’s Watch Cloak',
            availableQuantity: 2,
            sku: 'APP-CLAK-BLK',
            variations: ['material: wool', 'trim: crow-feathered'],
        },
        {
            productId: 'sword_longclaw',
            productName: 'Longclaw Sword',
            availableQuantity: 1,
            sku: 'WPN-LONGCLAW',
            variations: ['hilt: direwolf pommel'],
        },
        {
            productId: 'armor_plate',
            productName: 'Full Plate Armor',
            availableQuantity: 1,
            sku: 'ARMOR-FULL-001',
            variations: ['size: L', 'finish: polished steel'],
        },
        {
            productId: 'oathkeeper',
            productName: 'Oathkeeper Sword',
            availableQuantity: 1,
            sku: 'WPN-OATHKEEP',
            variations: ['engraving: lion & rose'],
        },
    ];

    isAvailable(productId: string, quantity: number): boolean {
        const item = this.inventory.find((i) => i.productId === productId);
        return !!item && item.availableQuantity >= quantity;
    }

    reserve(productId: string, quantity: number): void {
        const item = this.inventory.find((i) => i.productId === productId);
        if (item && item.availableQuantity >= quantity) item.availableQuantity -= quantity;
    }

    getItem(productId: string): InventoryItem | null {
        return this.inventory.find((i) => i.productId === productId) || null;
    }
}
