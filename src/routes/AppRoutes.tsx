import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import Orders from '../pages/Orders'
import Inventory from '../pages/Inventory'
import Products from '../pages/Products'
import Analytics from '../pages/Analytics'
import Settings from '../pages/Settings'
import ProtectedRoute from './ProtectedRoute'
import Layout from '../components/layout/Layout'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            <Route
              path="/orders"
              element={<Orders />}
            />

            <Route
              path="/inventory"
              element={<Inventory />}
            />
          </Route>
        </Route>

        <Route
          element={
            <ProtectedRoute
              allowedRoles={['admin', 'manager']}
            />
          }
        >
          <Route element={<Layout />}>
            <Route
              path="/products"
              element={<Products />}
            />

            <Route
              path="/analytics"
              element={<Analytics />}
            />
          </Route>
        </Route>

        <Route
          element={
            <ProtectedRoute allowedRoles={['admin']} />
          }
        >
          <Route element={<Layout />}>
            <Route
              path="/settings"
              element={<Settings />}
            />
          </Route>
        </Route>

        <Route
          path="/"
          element={<Navigate to="/dashboard" replace />}
        />

        <Route
          path="*"
          element={<Navigate to="/dashboard" replace />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes