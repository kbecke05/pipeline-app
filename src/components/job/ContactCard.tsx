import type { Contact } from '../../types'
import { PencilIcon, TrashIcon } from '../ui/icons'

interface ContactCardProps {
  contact: Contact
  onDelete: (id: string) => void
  onEdit: (contact:Contact) => void
}

export default function ContactCard({ contact, onDelete, onEdit}: ContactCardProps) {
  return (
    <div className="flex items-start justify-between px-5 py-3 border-b border-gray-100 last:border-0">
      <div className="space-y-0.5">
        <p className="text-sm font-medium text-gray-900">{contact.name}</p>
        {contact.title && <p className="text-xs text-gray-500">{contact.title}</p>}
        {contact.email && (
          <a href={`mailto:${contact.email}`} className="text-xs text-indigo-600 hover:underline block">{contact.email}</a>
        )}
        {contact.linkedin_url && (
          <a href={contact.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-xs text-indigo-600 hover:underline block">LinkedIn Profile</a>
        )}
        {contact.notes && <p className="text-xs text-gray-400 mt-1">{contact.notes}</p>}
      </div>
      <div className="flex items-center gap-3 ml-4 shrink-0">
        <button className="text-gray-400 hover:text-gray-600" onClick={() => onEdit(contact)} aria-label="Edit contact">
          <PencilIcon className="w-4 h-4" />
        </button>
        <button className="text-gray-400 hover:text-gray-600" onClick={() => onDelete(contact.id)} aria-label="Delete contact">
          <TrashIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}