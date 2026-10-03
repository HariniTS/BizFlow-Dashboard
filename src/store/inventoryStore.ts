import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { InventoryMovement, MovementType } from '../types/inventory'
import { initialInventoryMovements } from '../data/inventory'

interface InventoryState {
  movements: InventoryMovement[]
  addMovement: (
    productId: string,
    type: MovementType,
    quantity: number,
    reason: string
  ) => void
}

export const useInventoryStore = create<InventoryState>()(
  persist(
    (set) => ({
      movements: initialInventoryMovements,

      addMovement: (
        productId,
        type,
        quantity,
        reason
      ) => {
        const newMovement: InventoryMovement = {
          id: `MOV${Date.now()}`,
          productId,
          type,
          quantity,
          reason,
          createdAt: new Date()
            .toISOString()
            .split('T')[0],
        }

        set((state) => ({
          movements: [
            newMovement,
            ...state.movements,
          ],
        }))
      },
    }),
    {
      name: 'bizflow-inventory',
    }
  )
)