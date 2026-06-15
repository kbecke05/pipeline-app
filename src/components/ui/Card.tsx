import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
}

interface CardHeaderProps {
  title: string
  action?: ReactNode
}

function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-white rounded-xl border border-gray-200 ${className}`}>
      {children}
    </div>
  )
}

Card.Header = function CardHeader({ title, action }: CardHeaderProps) {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
      <h2 className="text-base font-semibold text-gray-900">{title}</h2>
      {action}
    </div>
  )
}

Card.Body = function CardBody({ children, className = '' }: CardProps) {
  return (
    <div className={`p-6 ${className}`}>{children}</div>
  )
}

export default Card
