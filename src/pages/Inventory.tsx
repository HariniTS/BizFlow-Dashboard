import { useMemo, useState } from 'react'
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  Search,
  X,
} from 'lucide-react'
import { useProductStore } from '../store/productStore'
import { useInventoryStore } from '../store/inventoryStore'
import type { MovementType } from '../types/inventory'
import useDebounce from '../hooks/useDebounce'

function Inventory() {
  const products = useProductStore((state) => state.products)

  const updateProduct = useProductStore(
    (state) => state.updateProduct
  )

  const movements = useInventoryStore(
    (state) => state.movements
  )

  const addMovement = useInventoryStore(
    (state) => state.addMovement
  )

  const [search, setSearch] = useState('')
  const [selectedProductId, setSelectedProductId] =
    useState<string | null>(null)

  const [movementType, setMovementType] =
    useState<MovementType>('IN')

  const [quantity, setQuantity] = useState('')
  const [reason, setReason] = useState('')
  const [error, setError] = useState('')

  const debouncedSearch = useDebounce(search, 300)

  const filteredProducts = useMemo(() => {
    const searchValue =
      debouncedSearch.toLowerCase().trim()

    return products.filter(
      (product) =>
        product.name
          .toLowerCase()
          .includes(searchValue) ||
        product.sku
          .toLowerCase()
          .includes(searchValue)
    )
  }, [products, debouncedSearch])

  const selectedProduct = products.find(
    (product) => product.id === selectedProductId
  )

  const handleOpenMovement = (
    productId: string,
    type: MovementType
  ) => {
    setSelectedProductId(productId)
    setMovementType(type)
    setQuantity('')
    setReason('')
    setError('')
  }

  const handleMovement = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()
    setError('')

    if (!selectedProduct) {
      setError('Please select a product.')
      return
    }

    const movementQuantity = Number(quantity)

    if (
      !Number.isInteger(movementQuantity) ||
      movementQuantity <= 0
    ) {
      setError(
        'Quantity must be a positive whole number.'
      )
      return
    }

    if (!reason.trim()) {
      setError('Please enter a reason.')
      return
    }

    if (
      movementType === 'OUT' &&
      movementQuantity > selectedProduct.stock
    ) {
      setError(
        `Cannot remove ${movementQuantity} items. Available stock is ${selectedProduct.stock}.`
      )
      return
    }

    const newStock =
      movementType === 'IN'
        ? selectedProduct.stock + movementQuantity
        : selectedProduct.stock - movementQuantity

    updateProduct({
      ...selectedProduct,
      stock: newStock,
    })

    addMovement(
      selectedProduct.id,
      movementType,
      movementQuantity,
      reason.trim()
    )

    setSelectedProductId(null)
    setQuantity('')
    setReason('')
  }

  const getProductName = (productId: string) => {
    return (
      products.find(
        (product) => product.id === productId
      )?.name || 'Unknown Product'
    )
  }

  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Inventory
        </h1>

        <p className="mt-1 text-slate-500 dark:text-slate-400">
          Manage stock levels and inventory movements.
        </p>
      </div>

      <div className="mt-6 rounded-xl bg-white p-4 shadow-sm dark:bg-slate-900">
        <div className="relative w-full max-w-md">
          <Search
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search products..."
            aria-label="Search inventory products"
            className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-10 pr-4 text-slate-900 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl bg-white shadow-sm dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300">
                  Product
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300">
                  SKU
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300">
                  Category
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300">
                  Stock
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300">
                  Status
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-slate-100 last:border-0 dark:border-slate-800"
                >
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-900 dark:text-white">
                      {product.name}
                    </p>
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                    {product.sku}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                    {product.category}
                  </td>

                  <td className="px-6 py-4">
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {product.stock}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    {product.stock <= 10 ? (
                      <span className="inline-flex rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700 dark:bg-red-950 dark:text-red-400">
                        Low Stock
                      </span>
                    ) : (
                      <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-950 dark:text-green-400">
                        In Stock
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          handleOpenMovement(
                            product.id,
                            'IN'
                          )
                        }
                        className="inline-flex items-center gap-1 rounded-lg bg-green-50 px-3 py-2 text-xs font-medium text-green-700 transition hover:bg-green-100 dark:bg-green-950 dark:text-green-400 dark:hover:bg-green-900"
                      >
                        <ArrowDownToLine size={15} />
                        Stock In
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleOpenMovement(
                            product.id,
                            'OUT'
                          )
                        }
                        className="inline-flex items-center gap-1 rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-700 transition hover:bg-red-100 dark:bg-red-950 dark:text-red-400 dark:hover:bg-red-900"
                      >
                        <ArrowUpFromLine size={15} />
                        Stock Out
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredProducts.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-slate-500 dark:text-slate-400"
                  >
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Inventory Movement History
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Recent stock additions and removals.
          </p>
        </div>

        <div className="mt-4 overflow-hidden rounded-xl bg-white shadow-sm dark:bg-slate-900">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300">
                    Movement ID
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300">
                    Product
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300">
                    Type
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300">
                    Quantity
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300">
                    Reason
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300">
                    Date
                  </th>
                </tr>
              </thead>

              <tbody>
                {movements.map((movement) => (
                  <tr
                    key={movement.id}
                    className="border-b border-slate-100 last:border-0 dark:border-slate-800"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">
                      {movement.id}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                      {getProductName(
                        movement.productId
                      )}
                    </td>

                    <td className="px-6 py-4">
                      {movement.type === 'IN' ? (
                        <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-950 dark:text-green-400">
                          IN
                        </span>
                      ) : (
                        <span className="inline-flex rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700 dark:bg-red-950 dark:text-red-400">
                          OUT
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4 text-sm font-semibold text-slate-900 dark:text-white">
                      {movement.quantity}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                      {movement.reason}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                      {movement.createdAt}
                    </td>
                  </tr>
                ))}

                {movements.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-12 text-center text-slate-500 dark:text-slate-400"
                    >
                      No inventory movements found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-4 py-6"
          onClick={() => {
            setSelectedProductId(null)
            setError('')
          }}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white shadow-xl dark:bg-slate-900"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5 dark:border-slate-700">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  {movementType === 'IN'
                    ? 'Add Stock'
                    : 'Remove Stock'}
                </h2>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {selectedProduct.name}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedProductId(null)
                  setError('')
                }}
                aria-label="Close inventory form"
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={handleMovement}
              className="space-y-5 p-6"
            >
              <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-800">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Current Stock
                </p>

                <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
                  {selectedProduct.stock}
                </p>
              </div>

              <div>
                <label
                  htmlFor="movement-quantity"
                  className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Quantity
                </label>

                <input
                  id="movement-quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(event) =>
                    setQuantity(event.target.value)
                  }
                  placeholder="Enter quantity"
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="movement-reason"
                  className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Reason
                </label>

                <input
                  id="movement-reason"
                  type="text"
                  value={reason}
                  onChange={(event) =>
                    setReason(event.target.value)
                  }
                  placeholder="Enter reason"
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  required
                />
              </div>

              {error && (
                <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-950 dark:text-red-400">
                  {error}
                </div>
              )}

              <div className="flex flex-col justify-end gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedProductId(null)
                    setError('')
                  }}
                  className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className={`rounded-lg px-5 py-2.5 text-sm font-medium text-white ${
                    movementType === 'IN'
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-red-600 hover:bg-red-700'
                  }`}
                >
                  {movementType === 'IN'
                    ? 'Add Stock'
                    : 'Remove Stock'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Inventory