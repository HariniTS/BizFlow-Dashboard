import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '../types/auth'
import { users } from '../data/users'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => boolean
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: (email, password) => {
        const user = users.find(
          (item) =>
            item.email === email && item.password === password
        )

        if (!user) {
          return false
        }

        set({
          user,
          isAuthenticated: true,
        })

        return true
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        })
      },
    }),
    {
      name: 'bizflow-auth',
    }
  )
)