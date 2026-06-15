import type { SelectHTMLAttributes } from 'react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  fullWidth?: boolean
}

export default function Select({ fullWidth = false, className = '', children, ...props }: SelectProps) {
  return (
    <select
      {...props}
      className={`px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50 disabled:text-gray-400 ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {children}
    </select>
  )
}
