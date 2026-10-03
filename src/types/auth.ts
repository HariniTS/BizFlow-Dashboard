export type UserRole = 'admin' | 'manager' | 'staff'

export interface User {
  id: string
  name: string
  email: string
  password: string
  role: UserRole
}