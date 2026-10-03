import type { Order } from '../types/order'

export const initialOrders: Order[] = [
  {
    id: 'ORD001',
    customerName: 'Arun Kumar',
    customerEmail: 'arun@example.com',
    products: ['Wireless Headphones', 'Wireless Mouse'],
    total: 3798,
    status: 'Pending',
    createdAt: '2026-09-15',
    statusHistory: [
      {
        status: 'Pending',
        updatedAt: '2026-09-15',
      },
    ],
  },
  {
    id: 'ORD002',
    customerName: 'Priya Sharma',
    customerEmail: 'priya@example.com',
    products: ['Mechanical Keyboard'],
    total: 4599,
    status: 'Processing',
    createdAt: '2026-09-16',
    statusHistory: [
      {
        status: 'Pending',
        updatedAt: '2026-09-16',
      },
      {
        status: 'Processing',
        updatedAt: '2026-09-16',
      },
    ],
  },
  {
    id: 'ORD003',
    customerName: 'Rahul Raj',
    customerEmail: 'rahul@example.com',
    products: ['Smart Watch'],
    total: 6999,
    status: 'Shipped',
    createdAt: '2026-09-17',
    statusHistory: [
      {
        status: 'Pending',
        updatedAt: '2026-09-17',
      },
      {
        status: 'Processing',
        updatedAt: '2026-09-17',
      },
      {
        status: 'Shipped',
        updatedAt: '2026-09-17',
      },
    ],
  },
  {
    id: 'ORD004',
    customerName: 'Divya S',
    customerEmail: 'divya@example.com',
    products: ['Laptop Backpack', 'USB-C Hub'],
    total: 3798,
    status: 'Delivered',
    createdAt: '2026-09-18',
    statusHistory: [
      {
        status: 'Pending',
        updatedAt: '2026-09-18',
      },
      {
        status: 'Processing',
        updatedAt: '2026-09-18',
      },
      {
        status: 'Shipped',
        updatedAt: '2026-09-18',
      },
      {
        status: 'Delivered',
        updatedAt: '2026-09-18',
      },
    ],
  },
  {
    id: 'ORD005',
    customerName: 'Karthik M',
    customerEmail: 'karthik@example.com',
    products: ['Gaming Headset', 'Gaming Mouse'],
    total: 5498,
    status: 'Processing',
    createdAt: '2026-09-19',
    statusHistory: [
      {
        status: 'Pending',
        updatedAt: '2026-09-19',
      },
      {
        status: 'Processing',
        updatedAt: '2026-09-19',
      },
    ],
  },
  {
    id: 'ORD006',
    customerName: 'Sneha R',
    customerEmail: 'sneha@example.com',
    products: ['Webcam'],
    total: 2799,
    status: 'Pending',
    createdAt: '2026-09-20',
    statusHistory: [
      {
        status: 'Pending',
        updatedAt: '2026-09-20',
      },
    ],
  },
  {
    id: 'ORD007',
    customerName: 'Vijay Kumar',
    customerEmail: 'vijay@example.com',
    products: ['Bluetooth Speaker'],
    total: 3299,
    status: 'Delivered',
    createdAt: '2026-09-21',
    statusHistory: [
      {
        status: 'Pending',
        updatedAt: '2026-09-21',
      },
      {
        status: 'Processing',
        updatedAt: '2026-09-21',
      },
      {
        status: 'Shipped',
        updatedAt: '2026-09-21',
      },
      {
        status: 'Delivered',
        updatedAt: '2026-09-21',
      },
    ],
  },
  {
    id: 'ORD008',
    customerName: 'Anjali P',
    customerEmail: 'anjali@example.com',
    products: ['Wireless Charger', 'Laptop Stand'],
    total: 2898,
    status: 'Cancelled',
    createdAt: '2026-09-22',
    statusHistory: [
      {
        status: 'Pending',
        updatedAt: '2026-09-22',
      },
      {
        status: 'Cancelled',
        updatedAt: '2026-09-22',
      },
    ],
  },
  {
    id: 'ORD009',
    customerName: 'Suresh B',
    customerEmail: 'suresh@example.com',
    products: ['Gaming Headset'],
    total: 3599,
    status: 'Shipped',
    createdAt: '2026-09-23',
    statusHistory: [
      {
        status: 'Pending',
        updatedAt: '2026-09-23',
      },
      {
        status: 'Processing',
        updatedAt: '2026-09-23',
      },
      {
        status: 'Shipped',
        updatedAt: '2026-09-23',
      },
    ],
  },
  {
    id: 'ORD010',
    customerName: 'Meena K',
    customerEmail: 'meena@example.com',
    products: ['Smart Watch', 'Wireless Charger'],
    total: 7998,
    status: 'Delivered',
    createdAt: '2026-09-24',
    statusHistory: [
      {
        status: 'Pending',
        updatedAt: '2026-09-24',
      },
      {
        status: 'Processing',
        updatedAt: '2026-09-24',
      },
      {
        status: 'Shipped',
        updatedAt: '2026-09-24',
      },
      {
        status: 'Delivered',
        updatedAt: '2026-09-24',
      },
    ],
  },
]