import { useEffect, useState } from 'react'
import {
  Search,
  Plus,
  X,
  Pencil,
  Trash2,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  Eye,
  EyeOff,
} from 'lucide-react'
import { useProductStore } from '../store/productStore'
import type { Product } from '../types/product'
import DataTable from '../components/data-table/DataTable'
import type { DataTableColumn } from '../components/data-table/DataTable'
import useDebounce from '../hooks/useDebounce'

interface FormErrors {
  name?: string
  sku?: string
  category?: string
  price?: string
  stock?: string
}

type SortField =
  | 'name'
  | 'sku'
  | 'category'
  | 'price'
  | 'stock'
  | 'status'

type SortDirection = 'asc' | 'desc'

type ColumnVisibility = {
  name: boolean
  sku: boolean
  category: boolean
  price: boolean
  stock: boolean
  status: boolean
  id: boolean
}

const PRODUCTS_PER_PAGE = 5

function Products() {
  const products = useProductStore((state) => state.products)
  const addProduct = useProductStore((state) => state.addProduct)
  const updateProduct = useProductStore((state) => state.updateProduct)
  const deleteProduct = useProductStore((state) => state.deleteProduct)

  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)

  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] =
    useState<Product | null>(null)
  const [errors, setErrors] = useState<FormErrors>({})

  const [sortField, setSortField] =
    useState<SortField>('name')
  const [sortDirection, setSortDirection] =
    useState<SortDirection>('asc')

  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [showColumns, setShowColumns] = useState(false)

  const [columnVisibility, setColumnVisibility] =
    useState<ColumnVisibility>({
      name: true,
      sku: true,
      category: true,
      price: true,
      stock: true,
      status: true,
      id: true,
    })

  const [name, setName] = useState('')
  const [sku, setSku] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')
  const [status, setStatus] =
    useState<Product['status']>('Active')

  const debouncedSearch = useDebounce(search, 300)

  const categories = [
    'All',
    ...Array.from(
      new Set(products.map((product) => product.category))
    ),
  ]

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((current) =>
        current === 'asc' ? 'desc' : 'asc'
      )
      return
    }

    setSortField(field)
    setSortDirection('asc')
  }

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown size={15} />
    }

    return sortDirection === 'asc' ? (
      <ArrowUp size={15} />
    ) : (
      <ArrowDown size={15} />
    )
  }

  const filteredProducts = products.filter((product) => {
    const searchValue =
      debouncedSearch.toLowerCase().trim()

    const matchesSearch =
      product.name.toLowerCase().includes(searchValue) ||
      product.sku.toLowerCase().includes(searchValue) ||
      product.category.toLowerCase().includes(searchValue)

    const matchesCategory =
      categoryFilter === 'All' ||
      product.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const first = a[sortField]
    const second = b[sortField]

    if (
      typeof first === 'number' &&
      typeof second === 'number'
    ) {
      return sortDirection === 'asc'
        ? first - second
        : second - first
    }

    const firstValue = String(first).toLowerCase()
    const secondValue = String(second).toLowerCase()

    const comparison =
      firstValue.localeCompare(secondValue)

    return sortDirection === 'asc'
      ? comparison
      : -comparison
  })

  const totalPages = Math.max(
    1,
    Math.ceil(
      sortedProducts.length / PRODUCTS_PER_PAGE
    )
  )

  const startIndex =
    (currentPage - 1) * PRODUCTS_PER_PAGE

  const paginatedProducts = sortedProducts.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE
  )

  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedSearch, categoryFilter])

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages])

  useEffect(() => {
    const existingIds = new Set(
      products.map((product) => product.id)
    )

    setSelectedRows((current) =>
      current.filter((id) => existingIds.has(id))
    )
  }, [products])

  const resetForm = () => {
    setName('')
    setSku('')
    setCategory('')
    setPrice('')
    setStock('')
    setStatus('Active')
    setEditingProduct(null)
    setErrors({})
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    const trimmedName = name.trim()
    const trimmedSku = sku.trim()
    const trimmedCategory = category.trim()
    const numericPrice = Number(price)
    const numericStock = Number(stock)

    if (!trimmedName) {
      newErrors.name = 'Product name is required.'
    } else if (trimmedName.length < 2) {
      newErrors.name =
        'Product name must contain at least 2 characters.'
    }

    if (!trimmedSku) {
      newErrors.sku = 'SKU is required.'
    } else if (trimmedSku.length < 3) {
      newErrors.sku =
        'SKU must contain at least 3 characters.'
    }

    const duplicateSku = products.some(
      (product) =>
        product.sku.toLowerCase() ===
          trimmedSku.toLowerCase() &&
        product.id !== editingProduct?.id
    )

    if (duplicateSku) {
      newErrors.sku = 'This SKU already exists.'
    }

    if (!trimmedCategory) {
      newErrors.category = 'Category is required.'
    }

    if (price === '') {
      newErrors.price = 'Price is required.'
    } else if (
      !Number.isFinite(numericPrice) ||
      numericPrice < 0
    ) {
      newErrors.price = 'Price must be 0 or greater.'
    }

    if (stock === '') {
      newErrors.stock = 'Stock is required.'
    } else if (
      !Number.isInteger(numericStock) ||
      numericStock < 0
    ) {
      newErrors.stock =
        'Stock must be a whole number of 0 or greater.'
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    if (!validateForm()) {
      return
    }

    if (editingProduct) {
      updateProduct({
        ...editingProduct,
        name: name.trim(),
        sku: sku.trim(),
        category: category.trim(),
        price: Number(price),
        stock: Number(stock),
        status,
      })
    } else {
      const newProduct: Product = {
        id: `P${String(products.length + 1).padStart(3, '0')}`,
        name: name.trim(),
        sku: sku.trim(),
        category: category.trim(),
        price: Number(price),
        stock: Number(stock),
        status,
        createdAt: new Date()
          .toISOString()
          .split('T')[0],
      }

      addProduct(newProduct)
    }

    resetForm()
    setShowForm(false)
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setName(product.name)
    setSku(product.sku)
    setCategory(product.category)
    setPrice(String(product.price))
    setStock(String(product.stock))
    setStatus(product.status)
    setErrors({})
    setShowForm(true)
  }

  const handleDelete = (product: Product) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${product.name}"?`
    )

    if (confirmed) {
      deleteProduct(product.id)
    }
  }

  const toggleColumn = (
    column: keyof ColumnVisibility
  ) => {
    setColumnVisibility((current) => ({
      ...current,
      [column]: !current[column],
    }))
  }

  const columns: DataTableColumn<Product>[] = [
    {
      key: 'name',
      visible: columnVisibility.name,
      header: (
        <button
          type="button"
          onClick={() => handleSort('name')}
          className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
        >
          Product
          {getSortIcon('name')}
        </button>
      ),
      render: (_, product) => (
        <div>
          <p className="font-medium text-slate-900 dark:text-white">
            {product.name}
          </p>

          <p className="text-xs text-slate-400 dark:text-slate-500">
            {product.id}
          </p>
        </div>
      ),
    },
    {
      key: 'sku',
      visible: columnVisibility.sku,
      header: (
        <button
          type="button"
          onClick={() => handleSort('sku')}
          className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
        >
          SKU
          {getSortIcon('sku')}
        </button>
      ),
    },
    {
      key: 'category',
      visible: columnVisibility.category,
      header: (
        <button
          type="button"
          onClick={() => handleSort('category')}
          className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
        >
          Category
          {getSortIcon('category')}
        </button>
      ),
    },
    {
      key: 'price',
      visible: columnVisibility.price,
      header: (
        <button
          type="button"
          onClick={() => handleSort('price')}
          className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
        >
          Price
          {getSortIcon('price')}
        </button>
      ),
      render: (value) => (
        <span className="font-medium text-slate-900 dark:text-white">
          ₹{Number(value).toLocaleString('en-IN')}
        </span>
      ),
    },
    {
      key: 'stock',
      visible: columnVisibility.stock,
      header: (
        <button
          type="button"
          onClick={() => handleSort('stock')}
          className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
        >
          Stock
          {getSortIcon('stock')}
        </button>
      ),
    },
    {
      key: 'status',
      visible: columnVisibility.status,
      header: (
        <button
          type="button"
          onClick={() => handleSort('status')}
          className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
        >
          Status
          {getSortIcon('status')}
        </button>
      ),
      render: (value) => (
        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
            value === 'Active'
              ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400'
              : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
          }`}
        >
          {String(value)}
        </span>
      ),
    },
    {
      key: 'id',
      visible: columnVisibility.id,
      header: 'Actions',
      render: (_, product) => (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleEdit(product)}
            aria-label={`Edit ${product.name}`}
            className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50 dark:hover:bg-blue-950"
          >
            <Pencil size={18} />
          </button>

          <button
            type="button"
            onClick={() => handleDelete(product)}
            aria-label={`Delete ${product.name}`}
            className="rounded-lg p-2 text-red-600 transition hover:bg-red-50 dark:hover:bg-red-950"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
    },
  ]

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Products
          </h1>

          <p className="mt-1 text-slate-500 dark:text-slate-400">
            Manage your products and inventory.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            resetForm()
            setShowForm(true)
          }}
          className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          <Plus size={20} />
          Add Product
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/50 px-4 py-8">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {editingProduct
                    ? 'Edit Product'
                    : 'Add Product'}
                </h2>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {editingProduct
                    ? 'Update the product information.'
                    : 'Add a new product to your catalog.'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  resetForm()
                  setShowForm(false)
                }}
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
                aria-label="Close form"
              >
                <X size={22} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-6 grid gap-5 sm:grid-cols-2"
            >
              <div>
                <label
                  htmlFor="product-name"
                  className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Product Name
                </label>

                <input
                  id="product-name"
                  type="text"
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  placeholder="Enter product name"
                  className={`w-full rounded-lg border bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500 dark:bg-slate-800 dark:text-white ${
                    errors.name
                      ? 'border-red-400'
                      : 'border-slate-300 dark:border-slate-700'
                  }`}
                  required
                />

                {errors.name && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="product-sku"
                  className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  SKU
                </label>

                <input
                  id="product-sku"
                  type="text"
                  value={sku}
                  onChange={(event) =>
                    setSku(event.target.value)
                  }
                  placeholder="Enter SKU"
                  className={`w-full rounded-lg border bg-white px-4 py-3 uppercase text-slate-900 outline-none focus:border-blue-500 dark:bg-slate-800 dark:text-white ${
                    errors.sku
                      ? 'border-red-400'
                      : 'border-slate-300 dark:border-slate-700'
                  }`}
                  required
                />

                {errors.sku && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.sku}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="product-category"
                  className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Category
                </label>

                <input
                  id="product-category"
                  type="text"
                  value={category}
                  onChange={(event) =>
                    setCategory(event.target.value)
                  }
                  placeholder="Enter category"
                  className={`w-full rounded-lg border bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500 dark:bg-slate-800 dark:text-white ${
                    errors.category
                      ? 'border-red-400'
                      : 'border-slate-300 dark:border-slate-700'
                  }`}
                  required
                />

                {errors.category && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.category}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="product-price"
                  className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Price
                </label>

                <input
                  id="product-price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={price}
                  onChange={(event) =>
                    setPrice(event.target.value)
                  }
                  placeholder="Enter price"
                  className={`w-full rounded-lg border bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500 dark:bg-slate-800 dark:text-white ${
                    errors.price
                      ? 'border-red-400'
                      : 'border-slate-300 dark:border-slate-700'
                  }`}
                  required
                />

                {errors.price && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.price}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="product-stock"
                  className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Stock
                </label>

                <input
                  id="product-stock"
                  type="number"
                  min="0"
                  step="1"
                  value={stock}
                  onChange={(event) =>
                    setStock(event.target.value)
                  }
                  placeholder="Enter stock"
                  className={`w-full rounded-lg border bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500 dark:bg-slate-800 dark:text-white ${
                    errors.stock
                      ? 'border-red-400'
                      : 'border-slate-300 dark:border-slate-700'
                  }`}
                  required
                />

                {errors.stock && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.stock}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="product-status"
                  className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Status
                </label>

                <select
                  id="product-status"
                  value={status}
                  onChange={(event) =>
                    setStatus(
                      event.target.value as Product['status']
                    )
                  }
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="flex flex-col justify-end gap-3 sm:col-span-2 sm:flex-row">
                <button
                  type="button"
                  onClick={() => {
                    resetForm()
                    setShowForm(false)
                  }}
                  className="rounded-lg border border-slate-300 px-5 py-3 font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
                >
                  {editingProduct
                    ? 'Update Product'
                    : 'Save Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
              placeholder="Search products..."
              aria-label="Search products"
              className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-10 pr-4 text-slate-900 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <label
              htmlFor="category-filter"
              className="text-sm font-medium text-slate-600 dark:text-slate-300"
            >
              Category
            </label>

            <select
              id="category-filter"
              value={categoryFilter}
              onChange={(event) =>
                setCategoryFilter(event.target.value)
              }
              className="rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  setShowColumns((current) => !current)
                }
                aria-expanded={showColumns}
                className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                <Eye size={18} />
                Columns
              </button>

              {showColumns && (
                <div className="absolute right-0 top-full z-30 mt-2 w-56 rounded-xl border border-slate-200 bg-white p-3 shadow-lg dark:border-slate-700 dark:bg-slate-900">
                  <p className="mb-2 text-sm font-semibold text-slate-900 dark:text-white">
                    Show Columns
                  </p>

                  {[
                    ['name', 'Product'],
                    ['sku', 'SKU'],
                    ['category', 'Category'],
                    ['price', 'Price'],
                    ['stock', 'Stock'],
                    ['status', 'Status'],
                    ['id', 'Actions'],
                  ].map(([key, label]) => {
                    const columnKey =
                      key as keyof ColumnVisibility

                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() =>
                          toggleColumn(columnKey)
                        }
                        className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
                      >
                        <span>{label}</span>

                        {columnVisibility[columnKey] ? (
                          <Eye
                            size={16}
                            className="text-blue-600"
                          />
                        ) : (
                          <EyeOff
                            size={16}
                            className="text-slate-400"
                          />
                        )}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedRows.length > 0 && (
        <div className="mt-4 flex flex-col gap-2 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between dark:border-blue-900 dark:bg-blue-950/50">
          <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
            {selectedRows.length} product
            {selectedRows.length === 1 ? '' : 's'} selected
          </p>

          <button
            type="button"
            onClick={() => setSelectedRows([])}
            className="text-left text-sm font-medium text-blue-700 hover:text-blue-900 dark:text-blue-300 dark:hover:text-blue-200"
          >
            Clear Selection
          </button>
        </div>
      )}

      <div className="mt-6 overflow-x-auto">
        <DataTable
          columns={columns}
          data={paginatedProducts}
          rowKey={(product) => product.id}
          emptyMessage="No products found."
          selectable
          selectedRows={selectedRows}
          onSelectionChange={setSelectedRows}
        />
      </div>

      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Showing{' '}
          {sortedProducts.length === 0
            ? 0
            : startIndex + 1}
          {' - '}
          {Math.min(
            startIndex + PRODUCTS_PER_PAGE,
            sortedProducts.length
          )}{' '}
          of {sortedProducts.length} products
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage((page) =>
                Math.max(1, page - 1)
              )
            }
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Previous
          </button>

          {Array.from(
            { length: totalPages },
            (_, index) => index + 1
          ).map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => setCurrentPage(page)}
              className={`h-9 w-9 rounded-lg text-sm font-medium transition ${
                currentPage === page
                  ? 'bg-blue-600 text-white'
                  : 'border border-slate-300 text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((page) =>
                Math.min(totalPages, page + 1)
              )
            }
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default Products