import type { ReactNode } from 'react'

export interface DataTableColumn<T> {
  key: keyof T
  header: ReactNode
  render?: (
    value: T[keyof T],
    row: T
  ) => ReactNode
  visible?: boolean
}

interface DataTableProps<T> {
  columns: DataTableColumn<T>[]
  data: T[]
  rowKey: (row: T) => string
  emptyMessage?: string
  selectable?: boolean
  selectedRows?: string[]
  onSelectionChange?: (
    selectedRows: string[]
  ) => void
}

function DataTable<T>({
  columns,
  data,
  rowKey,
  emptyMessage = 'No data found.',
  selectable = false,
  selectedRows = [],
  onSelectionChange,
}: DataTableProps<T>) {
  const visibleColumns = columns.filter(
    (column) => column.visible !== false
  )

  const visibleRowKeys = data.map((row) =>
    rowKey(row)
  )

  const allSelected =
    visibleRowKeys.length > 0 &&
    visibleRowKeys.every((id) =>
      selectedRows.includes(id)
    )

  const handleSelectAll = () => {
    if (!onSelectionChange) {
      return
    }

    if (allSelected) {
      onSelectionChange(
        selectedRows.filter(
          (id) => !visibleRowKeys.includes(id)
        )
      )

      return
    }

    const newSelectedRows = Array.from(
      new Set([
        ...selectedRows,
        ...visibleRowKeys,
      ])
    )

    onSelectionChange(newSelectedRows)
  }

  const handleSelectRow = (id: string) => {
    if (!onSelectionChange) {
      return
    }

    if (selectedRows.includes(id)) {
      onSelectionChange(
        selectedRows.filter(
          (selectedId) => selectedId !== id
        )
      )

      return
    }

    onSelectionChange([
      ...selectedRows,
      id,
    ])
  }

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm dark:bg-slate-900">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
              {selectable && (
                <th className="w-12 px-4 py-4 text-center">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={handleSelectAll}
                    aria-label="Select all rows"
                    className="h-4 w-4 rounded border-slate-300 accent-blue-600"
                  />
                </th>
              )}

              {visibleColumns.map((column) => (
                <th
                  key={String(column.key)}
                  className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((row) => {
              const id = rowKey(row)
              const isSelected =
                selectedRows.includes(id)

              return (
                <tr
                  key={id}
                  className={`border-b border-slate-100 transition dark:border-slate-800 ${
                    isSelected
                      ? 'bg-blue-50 dark:bg-blue-950/50'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  {selectable && (
                    <td className="px-4 py-4 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() =>
                          handleSelectRow(id)
                        }
                        aria-label="Select row"
                        className="h-4 w-4 rounded border-slate-300 accent-blue-600"
                      />
                    </td>
                  )}

                  {visibleColumns.map((column) => (
                    <td
                      key={String(column.key)}
                      className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300"
                    >
                      {column.render
                        ? column.render(
                            row[column.key],
                            row
                          )
                        : String(
                            row[column.key] ?? ''
                          )}
                    </td>
                  ))}
                </tr>
              )
            })}

            {data.length === 0 && (
              <tr>
                <td
                  colSpan={
                    visibleColumns.length +
                    (selectable ? 1 : 0)
                  }
                  className="px-6 py-12 text-center text-slate-500 dark:text-slate-400"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DataTable