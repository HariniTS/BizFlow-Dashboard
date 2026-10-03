import { NavLink, useNavigate } from 'react-router-dom'
import {
  BarChart3,
  Boxes,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  Settings,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { useAuthStore } from '../../store/authStore'

function Sidebar() {
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  const navigate = useNavigate()

  const [isOpen, setIsOpen] = useState(false)

  const navigation = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: LayoutDashboard,
      roles: ['admin', 'manager', 'staff'],
    },
    {
      name: 'Products',
      path: '/products',
      icon: Package,
      roles: ['admin', 'manager'],
    },
    {
      name: 'Orders',
      path: '/orders',
      icon: ClipboardList,
      roles: ['admin', 'manager', 'staff'],
    },
    {
      name: 'Inventory',
      path: '/inventory',
      icon: Boxes,
      roles: ['admin', 'manager', 'staff'],
    },
    {
      name: 'Analytics',
      path: '/analytics',
      icon: BarChart3,
      roles: ['admin', 'manager'],
    },
    {
      name: 'Settings',
      path: '/settings',
      icon: Settings,
      roles: ['admin'],
    },
  ]

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleNavigation = () => {
    setIsOpen(false)
  }

  const allowedNavigation = navigation.filter((item) =>
    user ? item.roles.includes(user.role) : false
  )

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open navigation menu"
        className="fixed left-4 top-4 z-50 rounded-lg bg-white p-2 text-slate-700 shadow-md transition hover:bg-slate-100 md:hidden dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
      >
        <Menu size={22} />
      </button>

      {isOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/50 md:hidden"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-200 dark:border-slate-700 dark:bg-slate-900 ${
          isOpen
            ? 'translate-x-0'
            : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-slate-200 px-6 dark:border-slate-700">
          <div>
            <h1 className="text-2xl font-bold text-blue-600">
              BizFlow
            </h1>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Business Management
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close navigation menu"
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 md:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto p-4">
          {allowedNavigation.map((item) => {
            const Icon = item.icon

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={handleNavigation}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
                  }`
                }
              >
                <Icon size={20} />

                <span>{item.name}</span>
              </NavLink>
            )
          })}
        </nav>

        <div className="border-t border-slate-200 p-4 dark:border-slate-700">
          <div className="mb-4 rounded-lg bg-slate-50 p-3 dark:bg-slate-800">
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              {user?.name}
            </p>

            <p className="mt-1 text-xs capitalize text-slate-500 dark:text-slate-400">
              {user?.role}
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50 dark:hover:bg-red-950"
          >
            <LogOut size={20} />

            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  )
}

export default Sidebar