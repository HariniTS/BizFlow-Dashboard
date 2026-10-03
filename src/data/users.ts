import type { User } from '../types/auth'

export const users: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@bizflow.com',
    password: 'admin123',
    role: 'admin',
  },
  {
    id: '2',
    name: 'Manager User',
    email: 'manager@bizflow.com',
    password: 'manager123',
    role: 'manager',
  },
  {
    id: '3',
    name: 'Staff User',
    email: 'staff@bizflow.com',
    password: 'staff123',
    role: 'staff',
  },
]