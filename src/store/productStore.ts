import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '../types/product'
import { initialProducts } from '../data/products'

interface ProductState {
  products: Product[]
  addProduct: (product: Product) => void
  updateProduct: (product: Product) => void
  deleteProduct: (id: string) => void
}

export const useProductStore = create<ProductState>()(
  persist(
    (set) => ({
      products: initialProducts,

      addProduct: (product) => {
        set((state) => ({
          products: [...state.products, product],
        }))
      },

      updateProduct: (product) => {
        set((state) => ({
          products: state.products.map((item) =>
            item.id === product.id ? product : item
          ),
        }))
      },

      deleteProduct: (id) => {
        set((state) => ({
          products: state.products.filter(
            (item) => item.id !== id
          ),
        }))
      },
    }),
    {
      name: 'bizflow-products',
    }
  )
)