import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Order, OrderStatus } from '../types/order'
import { initialOrders } from '../data/orders'

interface OrderState {
  orders: Order[]
  updateOrderStatus: (
    id: string,
    status: OrderStatus
  ) => void
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set) => ({
      orders: initialOrders,

      updateOrderStatus: (id, status) => {
        set((state) => ({
          orders: state.orders.map((order) => {
            if (order.id !== id) {
              return order
            }

            if (order.status === status) {
              return order
            }

            const history = order.statusHistory || []

            return {
              ...order,
              status,
              statusHistory: [
                ...history,
                {
                  status,
                  updatedAt: new Date()
                    .toISOString()
                    .split('T')[0],
                },
              ],
            }
          }),
        }))
      },
    }),
    {
      name: 'bizflow-orders',
    }
  )
)