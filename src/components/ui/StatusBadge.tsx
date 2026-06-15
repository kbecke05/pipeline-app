import { JOB_STATUS_COLORS, JOB_STATUS_LABELS, type JobStatus } from '../../types'

export default function StatusBadge({ status }: { status: JobStatus }) {
  return (
    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${JOB_STATUS_COLORS[status]}`}>
      {JOB_STATUS_LABELS[status]}
    </span>
  )
}
