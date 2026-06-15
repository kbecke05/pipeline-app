// TODO: import { useEffect, useState } from 'react'
// TODO: import { getDashboardStats } from '../lib/api/jobs'
// TODO: import { getJobs } from '../lib/api/jobs'
// TODO: import type { DashboardStats, Job } from '../types'
import { LinkButton, StatusBadge, Table } from '../components/ui'

export default function Dashboard() {
  // TODO: const [stats, setStats]     = useState<DashboardStats | null>(null)
  // TODO: const [recentJobs, setRecentJobs] = useState<Job[]>([])
  // TODO: const [loading, setLoading] = useState(true)

  // TODO: useEffect(() => {
  //   fetch stats via getDashboardStats()
  //   fetch recent jobs via getJobs() (first 5)
  //   setLoading(false)
  // }, [])

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">Your job search at a glance.</p>
      </div>

      {/* ── Stats cards ─────────────────────────────────────── */}
      {/*
        TODO: Render real values from `stats`:
          stats.total, stats.applied, stats.interviewing, stats.offers, stats.rejected
        Replace each placeholder <div> with:
          <div>
            <p className="...label">{label}</p>
            <p className="...number">{value ?? '—'}</p>
          </div>
      */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 mb-10">
        {['Total', 'Applied', 'Interviewing', 'Offers', 'Rejected'].map((label) => (
          <div key={label} className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-sm text-gray-500">{label}</p>
            <p className="mt-1 text-3xl font-bold text-gray-900">—</p>
          </div>
        ))}
      </div>

      {/* ── Recent applications ──────────────────────────────── */}
      {/*
        TODO: Replace EmptyRow with recentJobs.map(...) rows.
        Each row: company, title, StatusBadge, applied_date.
        Each row links to /jobs/:id via Table.Row onClick.
      */}
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
          <Table.EmptyRow colSpan={4}>
            No applications yet.{' '}
            <LinkButton to="/jobs/new" variant="ghost" size="sm" className="inline">
              Add your first one.
            </LinkButton>
          </Table.EmptyRow>
        </Table.Body>
      </Table>
    </div>
  )
}
