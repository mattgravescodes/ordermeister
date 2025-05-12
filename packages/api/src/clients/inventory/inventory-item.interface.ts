export interface InventoryItem {
    productId: string;
    productName: string;
    availableQuantity: number;
    sku?: string;
    variations?: string[];
}
