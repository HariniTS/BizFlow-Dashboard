import { useState } from 'react'
import {
  Bell,
  Building2,
  Clock,
  Mail,
  Phone,
  Save,
} from 'lucide-react'

function Settings() {
  const [businessName, setBusinessName] =
    useState('BizFlow Business')

  const [email, setEmail] =
    useState('admin@bizflow.com')

  const [phone, setPhone] =
    useState('+91 98765 43210')

  const [openingTime, setOpeningTime] =
    useState('09:00')

  const [closingTime, setClosingTime] =
    useState('21:00')

  const [currency, setCurrency] =
    useState('INR')

  const [timezone, setTimezone] =
    useState('Asia/Kolkata')

  const [emailNotifications, setEmailNotifications] =
    useState(true)

  const [orderNotifications, setOrderNotifications] =
    useState(true)

  const [inventoryNotifications, setInventoryNotifications] =
    useState(true)

  const [saved, setSaved] = useState(false)

  const handleSave = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    setSaved(true)

    setTimeout(() => {
      setSaved(false)
    }, 2500)
  }

  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Settings
        </h1>

        <p className="mt-1 text-slate-500 dark:text-slate-400">
          Manage your business preferences and notifications.
        </p>
      </div>

      <form
        onSubmit={handleSave}
        className="mt-6 space-y-6"
      >
        <section className="rounded-xl bg-white p-5 shadow-sm transition-colors sm:p-6 dark:bg-slate-900">
          <div className="flex items-center gap-3 border-b border-slate-200 pb-5 dark:border-slate-700">
            <div className="rounded-lg bg-blue-100 p-2.5 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
              <Building2 size={21} />
            </div>

            <div>
              <h2 className="font-bold text-slate-900 dark:text-white">
                Business Profile
              </h2>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                Basic information about your business.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div>
              <label
                htmlFor="business-name"
                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Business Name
              </label>

              <input
                id="business-name"
                type="text"
                value={businessName}
                onChange={(event) =>
                  setBusinessName(event.target.value)
                }
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                required
              />
            </div>

            <div>
              <label
                htmlFor="business-email"
                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Business Email
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="business-email"
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-10 pr-4 text-slate-900 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="business-phone"
                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Phone Number
              </label>

              <div className="relative">
                <Phone
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="business-phone"
                  type="tel"
                  value={phone}
                  onChange={(event) =>
                    setPhone(event.target.value)
                  }
                  className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-10 pr-4 text-slate-900 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  required
                />
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-xl bg-white p-5 shadow-sm transition-colors sm:p-6 dark:bg-slate-900">
          <div className="flex items-center gap-3 border-b border-slate-200 pb-5 dark:border-slate-700">
            <div className="rounded-lg bg-purple-100 p-2.5 text-purple-600 dark:bg-purple-950 dark:text-purple-400">
              <Clock size={21} />
            </div>

            <div>
              <h2 className="font-bold text-slate-900 dark:text-white">
                Business Preferences
              </h2>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                Configure operating hours and regional settings.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label
                htmlFor="opening-time"
                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Opening Time
              </label>

              <input
                id="opening-time"
                type="time"
                value={openingTime}
                onChange={(event) =>
                  setOpeningTime(event.target.value)
                }
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label
                htmlFor="closing-time"
                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Closing Time
              </label>

              <input
                id="closing-time"
                type="time"
                value={closingTime}
                onChange={(event) =>
                  setClosingTime(event.target.value)
                }
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label
                htmlFor="currency"
                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Currency
              </label>

              <select
                id="currency"
                value={currency}
                onChange={(event) =>
                  setCurrency(event.target.value)
                }
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                <option value="INR">
                  INR - Indian Rupee
                </option>

                <option value="USD">
                  USD - US Dollar
                </option>

                <option value="EUR">
                  EUR - Euro
                </option>
              </select>
            </div>

            <div>
              <label
                htmlFor="timezone"
                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Timezone
              </label>

              <select
                id="timezone"
                value={timezone}
                onChange={(event) =>
                  setTimezone(event.target.value)
                }
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                <option value="Asia/Kolkata">
                  India Standard Time
                </option>

                <option value="UTC">
                  Coordinated Universal Time
                </option>

                <option value="America/New_York">
                  Eastern Time
                </option>
              </select>
            </div>
          </div>
        </section>

        <section className="rounded-xl bg-white p-5 shadow-sm transition-colors sm:p-6 dark:bg-slate-900">
          <div className="flex items-center gap-3 border-b border-slate-200 pb-5 dark:border-slate-700">
            <div className="rounded-lg bg-orange-100 p-2.5 text-orange-600 dark:bg-orange-950 dark:text-orange-400">
              <Bell size={21} />
            </div>

            <div>
              <h2 className="font-bold text-slate-900 dark:text-white">
                Notifications
              </h2>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                Choose which business events should generate notifications.
              </p>
            </div>
          </div>

          <div className="mt-5 divide-y divide-slate-200 dark:divide-slate-700">
            <label className="flex cursor-pointer items-center justify-between gap-4 py-4">
              <div>
                <p className="font-medium text-slate-900 dark:text-white">
                  Email Notifications
                </p>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Receive important business updates by email.
                </p>
              </div>

              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={(event) =>
                  setEmailNotifications(
                    event.target.checked
                  )
                }
                className="h-5 w-5 shrink-0 rounded border-slate-300 accent-blue-600"
              />
            </label>

            <label className="flex cursor-pointer items-center justify-between gap-4 py-4">
              <div>
                <p className="font-medium text-slate-900 dark:text-white">
                  Order Notifications
                </p>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Get notified when order statuses change.
                </p>
              </div>

              <input
                type="checkbox"
                checked={orderNotifications}
                onChange={(event) =>
                  setOrderNotifications(
                    event.target.checked
                  )
                }
                className="h-5 w-5 shrink-0 rounded border-slate-300 accent-blue-600"
              />
            </label>

            <label className="flex cursor-pointer items-center justify-between gap-4 py-4">
              <div>
                <p className="font-medium text-slate-900 dark:text-white">
                  Inventory Notifications
                </p>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Get alerts when stock levels are low.
                </p>
              </div>

              <input
                type="checkbox"
                checked={inventoryNotifications}
                onChange={(event) =>
                  setInventoryNotifications(
                    event.target.checked
                  )
                }
                className="h-5 w-5 shrink-0 rounded border-slate-300 accent-blue-600"
              />
            </label>
          </div>
        </section>

        <div className="flex flex-col items-stretch justify-end gap-3 sm:flex-row sm:items-center">
          {saved && (
            <p
              role="status"
              className="text-sm font-medium text-green-600 dark:text-green-400"
            >
              Settings saved successfully.
            </p>
          )}

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <Save size={18} />
            Save Settings
          </button>
        </div>
      </form>
    </div>
  )
}

export default Settings