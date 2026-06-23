import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getJobs, deleteJob } from '../lib/api/jobs'
import { errorMessage } from '../lib/utils'
import type { Job } from '../types'
import { JOB_STATUS_LABELS, JobStatus } from '../types'
import { Alert, Input, LinkButton, PageHeader, Select, StatusBadge, Table, TrashIcon } from '../components/ui'

export default function Jobs() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<JobStatus | ''>('')
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    setError(null)
    async function loadJobs() {
      try {
        const data = await getJobs({
          status: statusFilter || undefined,
          search: search || undefined
        })
        setJobs(data)
      } catch (err) {
        setError(errorMessage(err))
      } finally {
        setLoading(false)
      }
    }
    loadJobs()
  }, [search, statusFilter])

  async function handleDelete(e: React.MouseEvent<HTMLButtonElement>, id: string) {
    e.stopPropagation()
    if (!confirm('Delete this job application?')) return
    setError(null)
    try {
      await deleteJob(id)
      setJobs(jobs.filter((job)=>job.id !== id))
    }
    catch(err) {
      setError(errorMessage(err))
    } 
  }
  

  return (
    <div className="p-8">
      <PageHeader
        title="Applications"
        description="Track every role you've applied to."
        action={
          <LinkButton to="/jobs/new">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Application
          </LinkButton>
        }
      />

      <div className="flex gap-3 mb-6">
        <Input type="text" placeholder="Search company or role…" className="flex-1" value={search} onChange={(e)=>setSearch(e.target.value)}/>
        <Select value={statusFilter} onChange={(e)=>setStatusFilter(e.target.value as JobStatus | '')}>
          <option value="">All statuses</option>
          {Object.entries(JOB_STATUS_LABELS).map(([value, label])=> (
            <option key={value} value={value}>{label}</option>
          ))}
        </Select>
      </div>

      {error && <Alert className="mb-4">{error}</Alert>}

      <Table>
        <Table.Head>
          <Table.Row>
            <Table.Th>Company</Table.Th>
            <Table.Th>Role</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Applied</Table.Th>
            <Table.Th>Location</Table.Th>
            <Table.Th></Table.Th>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {loading ? (
            Array.from({length: 5}).map((_, i)=>(
              <Table.Row key={i}>
                {Array.from({ length: 5 }).map((_, j) => (
                  <Table.Td key={j}>
                    <div className="h-4 bg-gray-100 rounded animate-pulse" />
                  </Table.Td>
                ))}
              </Table.Row>
            ))
          ) : 
          (jobs.map((job) => (
            <Table.Row key={job.id} onClick={() => navigate(`/jobs/${job.id}`)}>
              <Table.Td>{job.company}</Table.Td>
              <Table.Td>{job.title}</Table.Td>
              <Table.Td><StatusBadge status={job.status} /></Table.Td>
              <Table.Td>{job.applied_date ?? '—'}</Table.Td>
              <Table.Td>{job.location ?? '—'}</Table.Td>
              <Table.Td>
                <button onClick={(e)=> handleDelete(e, job.id)} className="text-gray-400 hover:text-gray-600" aria-label="Delete application">
                  <TrashIcon className="w-4 h-4" />
                </button>
              </Table.Td>
            </Table.Row>
          )))}
          {jobs.length === 0 && !loading && (
            <Table.EmptyRow colSpan={6}>
              No applications yet.{' '}
              <LinkButton to="/jobs/new" variant="ghost" size="sm" className="inline">
                Add your first one.
              </LinkButton>
            </Table.EmptyRow>
          )}
        </Table.Body>
      </Table>
    </div>
  )
}
