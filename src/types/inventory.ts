export type MovementType = 'IN' | 'OUT'

export interface InventoryMovement {
  id: string
  productId: string
  type: MovementType
  quantity: number
  reason: string
  createdAt: string
}