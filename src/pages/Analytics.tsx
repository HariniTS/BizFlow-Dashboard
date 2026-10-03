import {
  BarChart3,
  TrendingUp,
  ShoppingCart,
  IndianRupee,
} from 'lucide-react'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import { useOrderStore } from '../store/orderStore'

const revenueData = [
  { date: 'Sep 15', revenue: 3798 },
  { date: 'Sep 16', revenue: 4599 },
  { date: 'Sep 17', revenue: 6999 },
  { date: 'Sep 18', revenue: 3798 },
  { date: 'Sep 19', revenue: 5498 },
  { date: 'Sep 20', revenue: 2799 },
  { date: 'Sep 21', revenue: 3299 },
  { date: 'Sep 22', revenue: 2898 },
  { date: 'Sep 23', revenue: 3599 },
  { date: 'Sep 24', revenue: 7998 },
]

const productData = [
  { product: 'Smart Watch', sales: 2 },
  { product: 'Gaming Headset', sales: 2 },
  { product: 'Wireless Mouse', sales: 1 },
  { product: 'Wireless Charger', sales: 2 },
  { product: 'Mechanical Keyboard', sales: 1 },
]

function Analytics() {
  const orders = useOrderStore((state) => state.orders)

  const totalRevenue = orders.reduce(
    (total, order) => total + order.total,
    0
  )

  const totalOrders = orders.length

  const deliveredOrders = orders.filter(
    (order) => order.status === 'Delivered'
  ).length

  const pendingOrders = orders.filter(
    (order) => order.status === 'Pending'
  ).length

  const processingOrders = orders.filter(
    (order) => order.status === 'Processing'
  ).length

  const shippedOrders = orders.filter(
    (order) => order.status === 'Shipped'
  ).length

  const cancelledOrders = orders.filter(
    (order) => order.status === 'Cancelled'
  ).length

  const statusData = [
    {
      name: 'Pending',
      value: pendingOrders,
    },
    {
      name: 'Processing',
      value: processingOrders,
    },
    {
      name: 'Shipped',
      value: shippedOrders,
    },
    {
      name: 'Delivered',
      value: deliveredOrders,
    },
    {
      name: 'Cancelled',
      value: cancelledOrders,
    },
  ]

  const averageOrderValue =
    totalOrders > 0
      ? Math.round(totalRevenue / totalOrders)
      : 0

  const chartTextColor =
    document.documentElement.classList.contains('dark')
      ? '#cbd5e1'
      : '#475569'

  const gridColor =
    document.documentElement.classList.contains('dark')
      ? '#334155'
      : '#e2e8f0'

  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Analytics
        </h1>

        <p className="mt-1 text-slate-500 dark:text-slate-400">
          Track business performance and order analytics.
        </p>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl bg-white p-6 shadow-sm transition-colors dark:bg-slate-900">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Total Revenue
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                ₹{totalRevenue.toLocaleString('en-IN')}
              </h2>
            </div>

            <div className="shrink-0 rounded-lg bg-green-100 p-3 text-green-600 dark:bg-green-950 dark:text-green-400">
              <IndianRupee size={22} />
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm transition-colors dark:bg-slate-900">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Total Orders
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                {totalOrders}
              </h2>
            </div>

            <div className="shrink-0 rounded-lg bg-blue-100 p-3 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
              <ShoppingCart size={22} />
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm transition-colors dark:bg-slate-900">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Average Order
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                ₹{averageOrderValue.toLocaleString('en-IN')}
              </h2>
            </div>

            <div className="shrink-0 rounded-lg bg-purple-100 p-3 text-purple-600 dark:bg-purple-950 dark:text-purple-400">
              <TrendingUp size={22} />
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm transition-colors dark:bg-slate-900">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Delivered Orders
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                {deliveredOrders}
              </h2>
            </div>

            <div className="shrink-0 rounded-lg bg-green-100 p-3 text-green-600 dark:bg-green-950 dark:text-green-400">
              <BarChart3 size={22} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl bg-white p-4 shadow-sm transition-colors sm:p-6 dark:bg-slate-900">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Revenue Trend
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Daily revenue performance
            </p>
          </div>

          <div className="h-72 sm:h-80">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <LineChart
                data={revenueData}
                margin={{
                  top: 5,
                  right: 10,
                  left: 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={gridColor}
                />

                <XAxis
                  dataKey="date"
                  tick={{
                    fill: chartTextColor,
                    fontSize: 12,
                  }}
                />

                <YAxis
                  tick={{
                    fill: chartTextColor,
                    fontSize: 12,
                  }}
                />

                <Tooltip
                  formatter={(value) =>
                    `₹${Number(value).toLocaleString('en-IN')}`
                  }
                  contentStyle={{
                    backgroundColor:
                      document.documentElement.classList.contains(
                        'dark'
                      )
                        ? '#0f172a'
                        : '#ffffff',
                    borderColor:
                      document.documentElement.classList.contains(
                        'dark'
                      )
                        ? '#334155'
                        : '#e2e8f0',
                    color:
                      document.documentElement.classList.contains(
                        'dark'
                      )
                        ? '#f8fafc'
                        : '#0f172a',
                  }}
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
          </div>
        </div>

        <div className="rounded-xl bg-white p-4 shadow-sm transition-colors sm:p-6 dark:bg-slate-900">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Order Status
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Current order distribution
            </p>
          </div>

          <div className="h-72 sm:h-80">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius="65%"
                  label
                >
                  {statusData.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={
                        [
                          '#eab308',
                          '#3b82f6',
                          '#a855f7',
                          '#22c55e',
                          '#ef4444',
                        ][index]
                      }
                    />
                  ))}
                </Pie>

                <Tooltip
                  contentStyle={{
                    backgroundColor:
                      document.documentElement.classList.contains(
                        'dark'
                      )
                        ? '#0f172a'
                        : '#ffffff',
                    borderColor:
                      document.documentElement.classList.contains(
                        'dark'
                      )
                        ? '#334155'
                        : '#e2e8f0',
                    color:
                      document.documentElement.classList.contains(
                        'dark'
                      )
                        ? '#f8fafc'
                        : '#0f172a',
                  }}
                />

                <Legend
                  wrapperStyle={{
                    color: chartTextColor,
                    fontSize: 12,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-xl bg-white p-4 shadow-sm transition-colors sm:p-6 dark:bg-slate-900">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Product Sales
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Sales by selected products
          </p>
        </div>

        <div className="h-72 sm:h-80">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <BarChart
              data={productData}
              margin={{
                top: 5,
                right: 10,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={gridColor}
              />

              <XAxis
                dataKey="product"
                tick={{
                  fill: chartTextColor,
                  fontSize: 11,
                }}
                interval={0}
                angle={-20}
                textAnchor="end"
                height={65}
              />

              <YAxis
                allowDecimals={false}
                tick={{
                  fill: chartTextColor,
                  fontSize: 12,
                }}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor:
                    document.documentElement.classList.contains(
                      'dark'
                    )
                      ? '#0f172a'
                      : '#ffffff',
                  borderColor:
                    document.documentElement.classList.contains(
                      'dark'
                    )
                      ? '#334155'
                      : '#e2e8f0',
                  color:
                    document.documentElement.classList.contains(
                      'dark'
                    )
                      ? '#f8fafc'
                      : '#0f172a',
                }}
              />

              <Legend
                wrapperStyle={{
                  color: chartTextColor,
                  fontSize: 12,
                }}
              />

              <Bar
                dataKey="sales"
                name="Units Sold"
                fill="#2563eb"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default Analytics