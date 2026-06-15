import type { ReactNode } from 'react'

const variants = {
  error:   'bg-red-50 border-red-200 text-red-700',
  warning: 'bg-amber-50 border-amber-200 text-amber-700',
  success: 'bg-emerald-50 border-emerald-200 text-emerald-700',
  info:    'bg-blue-50 border-blue-200 text-blue-700',
}

interface AlertProps {
  variant?: keyof typeof variants
  children: ReactNode
  className?: string
}

export default function Alert({ variant = 'error', children, className = '' }: AlertProps) {
  return (
    <div className={`px-4 py-3 border rounded-lg text-sm ${variants[variant]} ${className}`}>
      {children}
    </div>
  )
}
