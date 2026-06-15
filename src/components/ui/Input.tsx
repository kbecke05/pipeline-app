import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  fullWidth?: boolean
}

export default function Input({ fullWidth = true, className = '', ...props }: InputProps) {
  return (
    <input
      {...props}
      className={`px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50 disabled:text-gray-400 ${fullWidth ? 'w-full' : ''} ${className}`}
    />
  )
}
