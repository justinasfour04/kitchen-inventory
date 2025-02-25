export type InventoryItem = {
  barcode: string;
  name: string;
  quantity: number;
  imageUrl: string;
  unit: string;
  expirationDate: Date;
  minimumQuantity: number;
  notes: string;
};

export interface DbInventoryItem extends InventoryItem {
  shelfId: number;
  categoryId: number;
  id: number;
  createdAt: Date;
  updatedAt: Date;
}
