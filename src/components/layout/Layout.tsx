import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

function Layout() {
  return (
    <div className="min-h-screen bg-slate-100 transition-colors dark:bg-slate-950">
      <Sidebar />

      <div className="min-h-screen md:ml-64">
        <Header />

        <main className="p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout