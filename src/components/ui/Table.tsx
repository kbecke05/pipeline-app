import type { ReactNode, TdHTMLAttributes, ThHTMLAttributes } from 'react'

interface RowProps {
  children: ReactNode
  onClick?: () => void
}

function Table({ children }: { children: ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <table className="w-full text-sm">{children}</table>
    </div>
  )
}

Table.Head = function TableHead({ children }: { children: ReactNode }) {
  return <thead className="bg-gray-50 border-b border-gray-100">{children}</thead>
}

Table.Body = function TableBody({ children }: { children: ReactNode }) {
  return <tbody>{children}</tbody>
}

Table.Row = function TableRow({ children, onClick }: RowProps) {
  return (
    <tr
      onClick={onClick}
      className={`border-b border-gray-100 last:border-0 ${onClick ? 'hover:bg-gray-50 cursor-pointer transition-colors' : ''}`}
    >
      {children}
    </tr>
  )
}

Table.Th = function TableTh({ children, ...props }: ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      {...props}
      className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide"
    >
      {children}
    </th>
  )
}

Table.Td = function TableTd({ children, className = '', ...props }: TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td {...props} className={`px-6 py-4 text-gray-800 ${className}`}>
      {children}
    </td>
  )
}

Table.EmptyRow = function TableEmptyRow({ colSpan, children }: { colSpan: number; children: ReactNode }) {
  return (
    <tr>
      <td colSpan={colSpan} className="px-6 py-12 text-center text-sm text-gray-400">
        {children}
      </td>
    </tr>
  )
}

export default Table
