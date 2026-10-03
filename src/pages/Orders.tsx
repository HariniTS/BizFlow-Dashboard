import { useState } from 'react'
import { Search, X } from 'lucide-react'
import { useOrderStore } from '../store/orderStore'
import type { OrderStatus } from '../types/order'
import useDebounce from '../hooks/useDebounce'

const statusOptions: OrderStatus[] = [
  'Pending',
  'Processing',
  'Shipped',
  'Delivered',
  'Cancelled',
]

function Orders() {
  const orders = useOrderStore((state) => state.orders)

  const updateOrderStatus = useOrderStore(
    (state) => state.updateOrderStatus
  )

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [selectedOrderId, setSelectedOrderId] =
    useState<string | null>(null)

  const debouncedSearch = useDebounce(search, 300)

  const selectedOrder =
    orders.find(
      (order) => order.id === selectedOrderId
    ) || null

  const filteredOrders = orders.filter((order) => {
    const searchValue =
      debouncedSearch.toLowerCase().trim()

    const matchesSearch =
      order.id.toLowerCase().includes(searchValue) ||
      order.customerName
        .toLowerCase()
        .includes(searchValue) ||
      order.customerEmail
        .toLowerCase()
        .includes(searchValue)

    const matchesStatus =
      statusFilter === 'All' ||
      order.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusClass = (status: OrderStatus) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400'

      case 'Processing':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400'

      case 'Shipped':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400'

      case 'Delivered':
        return 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400'

      case 'Cancelled':
        return 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400'

      default:
        return 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
    }
  }

  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Orders
        </h1>

        <p className="mt-1 text-slate-500 dark:text-slate-400">
          Manage customer orders and order status.
        </p>
      </div>

      <div className="mt-6 rounded-xl bg-white p-4 shadow-sm dark:bg-slate-900">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
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
              placeholder="Search orders..."
              aria-label="Search orders"
              className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-10 pr-4 text-slate-900 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div className="flex items-center gap-3">
            <label
              htmlFor="order-status-filter"
              className="text-sm font-medium text-slate-600 dark:text-slate-300"
            >
              Status
            </label>

            <select
              id="order-status-filter"
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
              className="rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              <option value="All">All</option>

              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl bg-white shadow-sm dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300">
                  Order ID
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300">
                  Customer
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300">
                  Products
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300">
                  Total
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300">
                  Status
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300">
                  Date
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  onClick={() =>
                    setSelectedOrderId(order.id)
                  }
                  className="cursor-pointer border-b border-slate-100 transition hover:bg-slate-50 last:border-0 dark:border-slate-800 dark:hover:bg-slate-800/50"
                >
                  <td className="px-6 py-4">
                    <p className="font-medium text-blue-600 dark:text-blue-400">
                      {order.id}
                    </p>
                  </td>

                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-900 dark:text-white">
                      {order.customerName}
                    </p>

                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {order.customerEmail}
                    </p>
                  </td>

                  <td className="px-6 py-4">
                    <div className="max-w-xs">
                      {order.products.map((product) => (
                        <p
                          key={product}
                          className="text-sm text-slate-600 dark:text-slate-300"
                        >
                          {product}
                        </p>
                      ))}
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm font-semibold text-slate-900 dark:text-white">
                    ₹{order.total.toLocaleString('en-IN')}
                  </td>

                  <td
                    className="px-6 py-4"
                    onClick={(event) =>
                      event.stopPropagation()
                    }
                  >
                    <select
                      value={order.status}
                      onChange={(event) =>
                        updateOrderStatus(
                          order.id,
                          event.target
                            .value as OrderStatus
                        )
                      }
                      aria-label={`Change status for ${order.id}`}
                      className={`rounded-full border-0 px-3 py-1 text-xs font-medium outline-none ${getStatusClass(
                        order.status
                      )}`}
                    >
                      {statusOptions.map((status) => (
                        <option
                          key={status}
                          value={status}
                        >
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                    {order.createdAt}
                  </td>
                </tr>
              ))}

              {filteredOrders.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-slate-500 dark:text-slate-400"
                  >
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 text-sm text-slate-500 dark:text-slate-400">
        Showing {filteredOrders.length} of {orders.length}{' '}
        orders
      </div>

      {selectedOrder && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-4 py-6"
          onClick={() => setSelectedOrderId(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-xl dark:bg-slate-900"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5 dark:border-slate-700">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Order Details
                </h2>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {selectedOrder.id}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedOrderId(null)
                }
                aria-label="Close order details"
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6 p-6">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Customer
                </p>

                <p className="mt-1 font-semibold text-slate-900 dark:text-white">
                  {selectedOrder.customerName}
                </p>

                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {selectedOrder.customerEmail}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Products
                </p>

                <div className="mt-2 space-y-2">
                  {selectedOrder.products.map(
                    (product) => (
                      <div
                        key={product}
                        className="rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                      >
                        {product}
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-800">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Total Amount
                  </p>

                  <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
                    ₹
                    {selectedOrder.total.toLocaleString(
                      'en-IN'
                    )}
                  </p>
                </div>

                <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-800">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Order Date
                  </p>

                  <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
                    {selectedOrder.createdAt}
                  </p>
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">
                  Current Status
                </p>

                <span
                  className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${getStatusClass(
                    selectedOrder.status
                  )}`}
                >
                  {selectedOrder.status}
                </span>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Status History
                </p>

                <div className="mt-4 space-y-4">
                  {(selectedOrder.statusHistory ||
                    []).map(
                    (history, index) => (
                      <div
                        key={`${history.status}-${history.updatedAt}-${index}`}
                        className="flex items-center gap-4"
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                          {index + 1}
                        </div>

                        <div className="flex-1">
                          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <span
                              className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${getStatusClass(
                                history.status
                              )}`}
                            >
                              {history.status}
                            </span>

                            <span className="text-xs text-slate-500 dark:text-slate-400">
                              {history.updatedAt}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  )}

                  {(!selectedOrder.statusHistory ||
                    selectedOrder.statusHistory.length ===
                      0) && (
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      No status history available.
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 px-6 py-4 text-right dark:border-slate-700">
              <button
                type="button"
                onClick={() =>
                  setSelectedOrderId(null)
                }
                className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Orders