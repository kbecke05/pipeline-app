import { Link, type LinkProps } from 'react-router-dom'

const variants = {
  primary:   'bg-indigo-600 text-white hover:bg-indigo-500',
  secondary: 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50',
  danger:    'text-red-600 border border-red-200 hover:bg-red-50',
  ghost:     'text-gray-500 hover:text-gray-700',
}

const sizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
}

interface LinkButtonProps extends LinkProps {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
}

export default function LinkButton({ variant = 'primary', size = 'md', className = '', children, ...props }: LinkButtonProps) {
  return (
    <Link
      {...props}
      className={`inline-flex items-center gap-2 font-medium rounded-lg transition-colors ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </Link>
  )
}
