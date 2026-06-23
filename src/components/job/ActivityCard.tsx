import type { Activity } from '../../types'
import { ACTIVITY_TYPE_LABELS } from '../../types'
import { PencilIcon, TrashIcon } from '../ui/icons'

interface ActivityCardProps {
  activity: Activity
  onDelete: (id: string) => void
  onEdit: (activity: Activity) => void
}

export default function ActivityCard({ activity, onDelete, onEdit }: ActivityCardProps) {
  return (
    <div className="flex items-start justify-between px-5 py-3 border-b border-gray-100 last:border-0">
      <div className="space-y-0.5">
        <p className="text-sm font-medium text-gray-900">{activity.title}</p>
        <p className="text-xs text-gray-500">
          {ACTIVITY_TYPE_LABELS[activity.type]} · {new Date(activity.date).toLocaleDateString()}
        </p>
        {activity.description && <p className="text-xs text-gray-400 mt-1">{activity.description}</p>}
      </div>
      <div className="flex items-center gap-3 ml-4 shrink-0">
        <button className="text-gray-400 hover:text-gray-600" onClick={() => onEdit(activity)} aria-label="Edit activity">
          <PencilIcon className="w-4 h-4" />
        </button>
        <button className="text-gray-400 hover:text-gray-600" onClick={() => onDelete(activity.id)} aria-label="Delete activity">
          <TrashIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}