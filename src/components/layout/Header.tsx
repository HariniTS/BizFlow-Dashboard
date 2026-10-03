import { Bell, Check, Moon, Sun } from 'lucide-react'
import { useState } from 'react'
import { useAuthStore } from '../../store/authStore'
import { useThemeStore } from '../../store/themeStore'

function Header() {
  const user = useAuthStore((state) => state.user)

  const theme = useThemeStore((state) => state.theme)
  const toggleTheme = useThemeStore(
    (state) => state.toggleTheme
  )

  const [isNotificationsOpen, setIsNotificationsOpen] =
    useState(false)

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Low stock alert',
      message: 'Wireless Charger has only 4 items left.',
      time: '5 min ago',
      unread: true,
    },
    {
      id: 2,
      title: 'New order received',
      message: 'Order ORD010 has been placed.',
      time: '20 min ago',
      unread: true,
    },
    {
      id: 3,
      title: 'Order delivered',
      message: 'Order ORD007 was delivered successfully.',
      time: '1 hour ago',
      unread: true,
    },
  ])

  const unreadCount = notifications.filter(
    (notification) => notification.unread
  ).length

  const markAllAsRead = () => {
    setNotifications((currentNotifications) =>
      currentNotifications.map((notification) => ({
        ...notification,
        unread: false,
      }))
    )
  }

  const markAsRead = (id: number) => {
    setNotifications((currentNotifications) =>
      currentNotifications.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              unread: false,
            }
          : notification
      )
    )
  }

  return (
    <header className="relative flex h-20 items-center justify-between border-b border-slate-200 bg-white px-4 pl-16 transition-colors dark:border-slate-700 dark:bg-slate-900 sm:px-6 sm:pl-16 md:pl-6">
      <div className="min-w-0">
        <h2 className="truncate text-lg font-semibold text-slate-900 dark:text-white sm:text-xl">
          Business Dashboard
        </h2>

        <p className="hidden text-sm text-slate-500 dark:text-slate-400 sm:block">
          Manage your business from one place
        </p>
      </div>

      <div className="ml-4 flex shrink-0 items-center gap-1 sm:gap-3">
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          {theme === 'light' ? (
            <Moon size={20} />
          ) : (
            <Sun size={20} />
          )}
        </button>

        <div className="relative">
          <button
            type="button"
            onClick={() =>
              setIsNotificationsOpen(
                (current) => !current
              )
            }
            aria-label="Notifications"
            aria-expanded={isNotificationsOpen}
            className="relative rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <Bell size={20} />

            {unreadCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                {unreadCount}
              </span>
            )}
          </button>

          {isNotificationsOpen && (
            <div className="absolute right-0 top-12 z-50 w-[calc(100vw-2rem)] max-w-sm overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900">
              <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4 dark:border-slate-700">
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    Notifications
                  </h3>

                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    {unreadCount} unread notification
                    {unreadCount !== 1 ? 's' : ''}
                  </p>
                </div>

                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={markAllAsRead}
                    className="text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <button
                      key={notification.id}
                      type="button"
                      onClick={() =>
                        markAsRead(notification.id)
                      }
                      className={`w-full border-b border-slate-100 px-4 py-4 text-left transition last:border-0 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800 ${
                        notification.unread
                          ? 'bg-blue-50/50 dark:bg-blue-950/20'
                          : ''
                      }`}
                    >
                      <div className="flex gap-3">
                        <div
                          className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${
                            notification.unread
                              ? 'bg-blue-600'
                              : 'bg-slate-300 dark:bg-slate-600'
                          }`}
                        />

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <p className="text-sm font-semibold text-slate-900 dark:text-white">
                              {notification.title}
                            </p>

                            {!notification.unread && (
                              <Check
                                size={15}
                                className="shrink-0 text-green-500"
                              />
                            )}
                          </div>

                          <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                            {notification.message}
                          </p>

                          <p className="mt-2 text-[11px] text-slate-400">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-10 text-center text-sm text-slate-500 dark:text-slate-400">
                    No notifications.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600 dark:bg-blue-950 dark:text-blue-400 sm:h-10 sm:w-10">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              {user?.name}
            </p>

            <p className="text-xs capitalize text-slate-500 dark:text-slate-400">
              {user?.role}
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header