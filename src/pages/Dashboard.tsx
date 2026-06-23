import { useEffect, useState } from 'react'
import { getDashboardStats, getJobs } from '../lib/api/jobs'
import type { DashboardStats, Job } from '../types'
import { Alert, LinkButton, StatusBadge, Table } from '../components/ui'
import { errorMessage } from '../lib/utils'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats|null>(null)
  const [jobs, setJobs] = useState<Job[]>([])
  const [error, setError] = useState<string|null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(()=>{
    setError(null)
    setLoading(true)
    async function load() {
      try {
        const [jobs, stats] = await Promise.all([getJobs(), getDashboardStats()])
        setJobs(jobs)
        setStats(stats)
      } catch (err) {
        setError(errorMessage(err))
      }
      finally {
        setLoading(false)
      }
    }

    load()
  },[])

  const statCards = [
    ["Total", stats?.total],
    ["Applied", stats?.applied],
    ["Interviewing", stats?.interviewing],
    ["Offers", stats?.offers],
    ["Rejected", stats?.rejected]
  ]


  if (loading) return <div className="p-8 text-sm text-gray-400">Loading...</div>
 
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">Your job search at a glance.</p>
      </div>

      {error && <Alert className="mb-4">{error}</Alert>}

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 mb-10">
        {statCards.map(([label, value]) => (
          <div key={label} className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-sm text-gray-500">{label}</p>
            <p className="mt-1 text-3xl font-bold text-gray-900">{value}</p>
          </div>
        ))}
      </div>
      <h2 className='font-semibold text-gray-900 mb-4'>Recent Activity</h2>
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.Th>Company</Table.Th>
            <Table.Th>Role</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Applied</Table.Th>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {jobs.slice(0,5).map((job)=>(
            <Table.Row
              key={job.id}
              onClick={()=>navigate(`/jobs/${job.id}`)}>
                <Table.Td>{job.company}</Table.Td>
                <Table.Td>{job.title}</Table.Td>
                <Table.Td><StatusBadge status={job.status}/></Table.Td>
                <Table.Td>{job.applied_date ?? '-'}</Table.Td>
            </Table.Row>
          ))}
          {jobs.length === 0 && <Table.EmptyRow colSpan={4}>
            No applications yet.{' '}
            <LinkButton to="/jobs/new" variant="ghost" size="sm" className="inline">
              Add your first one.
            </LinkButton>
          </Table.EmptyRow>}
        </Table.Body>
      </Table>
    </div>
  )
}
