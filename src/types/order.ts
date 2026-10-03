export type OrderStatus =
  | 'Pending'
  | 'Processing'
  | 'Shipped'
  | 'Delivered'
  | 'Cancelled'

export interface OrderStatusHistory {
  status: OrderStatus
  updatedAt: string
}

export interface Order {
  id: string
  customerName: string
  customerEmail: string
  products: string[]
  total: number
  status: OrderStatus
  createdAt: string
  statusHistory?: OrderStatusHistory[]
}