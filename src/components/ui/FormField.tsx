import type { ReactNode } from 'react'

interface FormFieldProps {
  label: string
  htmlFor: string
  required?: boolean
  children: ReactNode
  hint?: string
}

export default function FormField({ label, htmlFor, required, children, hint }: FormFieldProps) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {hint && <p className="mt-1 text-xs text-gray-400">{hint}</p>}
    </div>
  )
}
