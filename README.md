# BizFlow Dashboard

A modern and responsive SaaS Business Management Dashboard built using React, TypeScript, Vite, Tailwind CSS, Zustand, React Router, Recharts, and Lucide React.

BizFlow provides a centralized interface for managing business operations such as products, orders, inventory, analytics, notifications, and user access.

## Project Overview

BizFlow is a frontend-based business management dashboard developed to demonstrate common SaaS application features. It uses mock data and browser local storage instead of a backend server or external database.

## Features

### Authentication and Authorization
- Mock login system
- Admin, Manager, and Staff roles
- Protected routes
- Role-based navigation
- Login validation
- Logout functionality
- Persistent authentication state

### Dashboard
- Total Revenue
- Total Orders
- Total Products
- Low Stock Products
- Revenue Trend Chart
- Order Status Chart
- Date range filters
- Loading skeleton
- Empty states

### Product Management
- Add products
- Edit products
- Delete products
- Form validation
- Search and category filtering
- Sorting
- Pagination
- Row selection
- Column visibility
- Persistent product data

### Order Management
- Search orders
- Filter by order status
- Update order status
- View order details
- Customer and product information
- Order status history
- Persistent order updates

### Inventory Management
- View product stock
- Stock IN and Stock OUT operations
- Quantity validation
- Movement reasons
- Inventory movement history
- Low stock identification
- Persistent inventory records

### Analytics
- Revenue insights
- Order statistics
- Average order value
- Order status visualization
- Product analysis charts
- Responsive charts

### Settings
- Business profile
- Business email and phone
- Opening and closing time
- Currency selection
- Timezone selection
- Notification preferences
- Save confirmation

### Notifications
- Low stock alerts
- New order notifications
- Delivery notifications
- Unread notification count
- Mark individual notifications as read
- Mark all notifications as read

### Theme and Responsive Design
- Light mode
- Dark mode
- Persistent theme preference
- Responsive sidebar
- Mobile navigation
- Responsive cards and charts
- Horizontally scrollable tables
- Mobile-friendly forms and dialogs

## Role-Based Access

| Feature | Admin | Manager | Staff |
|---|---|---|---|
| Dashboard | Yes | Yes | Yes |
| Products | Yes | Yes | No |
| Orders | Yes | Yes | Yes |
| Inventory | Yes | Yes | Yes |
| Analytics | Yes | Yes | No |
| Settings | Yes | No | No |

## Technology Stack

| Technology | Purpose |
|---|---|
| React | User interface |
| TypeScript | Type safety |
| Vite | Development and build tool |
| Tailwind CSS | Styling |
| React Router DOM | Navigation and routing |
| Zustand | State management |
| Recharts | Data visualization |
| Lucide React | Icons |
| Browser Local Storage | Data persistence |

## Project Structure

```text
BizFlow-Dashboard/
├── public/
├── src/
│   ├── components/
│   │   ├── data-table/
│   │   │   └── DataTable.tsx
│   │   └── layout/
│   │       ├── Header.tsx
│   │       ├── Layout.tsx
│   │       └── Sidebar.tsx
│   ├── data/
│   │   ├── inventory.ts
│   │   ├── orders.ts
│   │   ├── products.ts
│   │   └── users.ts
│   ├── hooks/
│   │   └── useDebounce.ts
│   ├── pages/
│   │   ├── Analytics.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Inventory.tsx
│   │   ├── Login.tsx
│   │   ├── Orders.tsx
│   │   ├── Products.tsx
│   │   └── Settings.tsx
│   ├── routes/
│   │   ├── AppRoutes.tsx
│   │   └── ProtectedRoute.tsx
│   ├── store/
│   │   ├── authStore.ts
│   │   ├── inventoryStore.ts
│   │   ├── orderStore.ts
│   │   ├── productStore.ts
│   │   └── themeStore.ts
│   ├── types/
│   │   ├── auth.ts
│   │   ├── inventory.ts
│   │   ├── order.ts
│   │   └── product.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── .vscode/
├── package.json
├── vite.config.ts
└── README.md
```

## Demo Login Credentials

### Admin

```text
Email: admin@bizflow.com
Password: admin123
```

### Manager

```text
Email: manager@bizflow.com
Password: manager123
```

### Staff

```text
Email: staff@bizflow.com
Password: staff123
```

These are demonstration credentials for the mock authentication system. They are not intended for production use.

## Installation

Clone or download the project and open its directory in a terminal.

```bash
cd BizFlow-Dashboard
```

Install dependencies:

```bash
npm install
```

## Run the Development Server

```bash
npm run dev
```

Open the local URL shown in your terminal.

## Production Build

```bash
npm run build
```

## Preview the Production Build

```bash
npm run preview
```

## State Management

Zustand is used to manage application state through separate stores for:

- Authentication
- Products
- Orders
- Inventory
- Theme

Zustand persistence stores selected application data in browser local storage.

## Reusable Components and Hooks

### DataTable

The reusable DataTable supports dynamic columns, custom cell rendering, row selection, select all, column visibility, empty states, and responsive table layout.

### useDebounce

The reusable `useDebounce` hook improves search interactions by delaying filtering until the user pauses typing. It is used in Products, Orders, and Inventory.

## Routing

Main application routes:

```text
/login
/dashboard
/products
/orders
/inventory
/analytics
/settings
```

Protected routes restrict access to authenticated users, while role-based restrictions control access to specific modules.

## Data and Persistence

BizFlow uses mock data stored in the project and browser local storage for selected application state.

The application does not currently use a backend API or external database.

## Validation and Accessibility

The project includes client-side validation for login, product forms, and inventory operations.

Accessibility-focused features include:
- Semantic HTML
- Form labels
- Accessible navigation controls
- ARIA labels
- Keyboard-friendly form controls
- Visible focus styles
- Empty-state messages

## Testing

The following areas have been manually checked:

- Role-based access
- Login and logout
- Dashboard interactions
- Product operations
- Order status updates
- Inventory operations
- Analytics display
- Settings interactions
- Light and dark themes
- Responsive layouts
- Browser refresh and data persistence

## Future Enhancements

- Real backend API integration
- Database integration
- Secure user authentication
- JWT-based authorization
- Real-time notifications
- Advanced analytics
- PDF and Excel report exports
- User management
- Audit logs
- Inventory forecasting
- Cloud deployment

## Project Status

The core frontend features have been implemented and manually tested. Documentation and deployment preparation are the remaining finalization tasks.

## Author

**Harini**

**Project:** BizFlow Dashboard

Created for educational and demonstration purposes.
