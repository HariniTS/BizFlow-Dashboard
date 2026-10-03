import { useEffect, useMemo, useState } from 'react'
import { useAuthStore } from '../store/authStore'
import { useOrderStore } from '../store/orderStore'
import { useProductStore } from '../store/productStore'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'

type DateFilter = 'All Time' | 'Last 7 Days' | 'Last 30 Days'

function Dashboard() {
  const user = useAuthStore((state) => state.user)
  const orders = useOrderStore((state) => state.orders)
  const products = useProductStore((state) => state.products)

  const [dateFilter, setDateFilter] =
    useState<DateFilter>('All Time')

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 700)

    return () => clearTimeout(timer)
  }, [])

  const filteredOrders = useMemo(() => {
    if (dateFilter === 'All Time') {
      return orders
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const days =
      dateFilter === 'Last 7 Days' ? 7 : 30

    const startDate = new Date(today)
    startDate.setDate(today.getDate() - (days - 1))

    return orders.filter((order) => {
      const orderDate = new Date(
        `${order.createdAt}T00:00:00`
      )

      return (
        orderDate >= startDate &&
        orderDate <= today
      )
    })
  }, [orders, dateFilter])

  const totalRevenue = filteredOrders.reduce(
    (total, order) => total + order.total,
    0
  )

  const totalOrders = filteredOrders.length

  const totalProducts = products.length

  const lowStockProducts = products.filter(
    (product) => product.stock <= 10
  ).length

  const revenueData = filteredOrders.map((order) => ({
    date: order.createdAt.slice(5),
    revenue: order.total,
  }))

  const statusData = [
    {
      status: 'Pending',
      orders: filteredOrders.filter(
        (order) => order.status === 'Pending'
      ).length,
    },
    {
      status: 'Processing',
      orders: filteredOrders.filter(
        (order) => order.status === 'Processing'
      ).length,
    },
    {
      status: 'Shipped',
      orders: filteredOrders.filter(
        (order) => order.status === 'Shipped'
      ).length,
    },
    {
      status: 'Delivered',
      orders: filteredOrders.filter(
        (order) => order.status === 'Delivered'
      ).length,
    },
    {
      status: 'Cancelled',
      orders: filteredOrders.filter(
        (order) => order.status === 'Cancelled'
      ).length,
    },
  ]

  const stats = [
    {
      title: 'Total Revenue',
      value: `₹${totalRevenue.toLocaleString('en-IN')}`,
    },
    {
      title: 'Total Orders',
      value: totalOrders.toString(),
    },
    {
      title: 'Products',
      value: totalProducts.toString(),
    },
    {
      title: 'Low Stock',
      value: lowStockProducts.toString(),
    },
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-100 transition-colors dark:bg-slate-950">
        <div className="mx-auto max-w-7xl">
          <div>
            <div className="h-9 w-48 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />

            <div className="mt-3 h-5 w-64 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="rounded-xl bg-white p-6 shadow-sm dark:bg-slate-900"
              >
                <div className="h-4 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

                <div className="mt-4 h-8 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {Array.from({ length: 2 }).map((_, index) => (
              <div
                key={index}
                className="rounded-xl bg-white p-6 shadow-sm dark:bg-slate-900"
              >
                <div className="h-5 w-36 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

                <div className="mt-3 h-4 w-56 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

                <div className="mt-6 h-64 animate-pulse rounded-lg bg-slate-100 dark:bg-slate-800" />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-100 transition-colors dark:bg-slate-950">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Dashboard
            </h1>

            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Welcome back, {user?.name}
            </p>
          </div>

          <div>
            <label
              htmlFor="dashboard-date-filter"
              className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Date Range
            </label>

            <select
              id="dashboard-date-filter"
              value={dateFilter}
              onChange={(event) =>
                setDateFilter(
                  event.target.value as DateFilter
                )
              }
              className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            >
              <option value="All Time">All Time</option>
              <option value="Last 7 Days">Last 7 Days</option>
              <option value="Last 30 Days">Last 30 Days</option>
            </select>
          </div>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="rounded-xl bg-white p-6 shadow-sm transition-colors dark:bg-slate-900"
            >
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {stat.title}
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                {stat.value}
              </h2>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-slate-900">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Revenue Trend
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Revenue generated from selected date range
              </p>
            </div>

            <div className="h-80">
              {revenueData.length > 0 ? (
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="date" />

                    <YAxis />

                    <Tooltip
                      formatter={(value) =>
                        `₹${Number(value).toLocaleString('en-IN')}`
                      }
                    />

                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#2563eb"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-slate-500 dark:text-slate-400">
                  No revenue data available for this period.
                </div>
              )}
            </div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-slate-900">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Order Status
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Current order status distribution
              </p>
            </div>

            <div className="h-80">
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <BarChart data={statusData}>
                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="status" />

                  <YAxis allowDecimals={false} />

                  <Tooltip />

                  <Bar
                    dataKey="orders"
                    name="Orders"
                    fill="#2563eb"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard