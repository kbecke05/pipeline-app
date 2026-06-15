// TODO: import { useEffect, useState } from 'react'
// TODO: import { getDashboardStats } from '../lib/api/jobs'
// TODO: import { getJobs } from '../lib/api/jobs'
// TODO: import type { DashboardStats, Job } from '../types'

export default function Dashboard() {
  // TODO: const [stats, setStats] = useState<DashboardStats | null>(null)
  // TODO: const [recentJobs, setRecentJobs] = useState<Job[]>([])
  // TODO: const [loading, setLoading] = useState(true)

  // TODO: useEffect(() => {
  //   fetch stats via getDashboardStats()
  //   fetch recent jobs via getJobs() (limit to ~5 most recent)
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
        TODO: Render a row of stat cards using stats.*
        Suggested cards: Total, Applied, Interviewing, Offers, Rejected

        Each card shape:
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500">{label}</p>
          <p className="mt-1 text-3xl font-bold text-gray-900">{value}</p>
        </div>
      */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 mb-10">
        <div className="bg-white rounded-xl border border-gray-200 p-5 animate-pulse h-24" />
        <div className="bg-white rounded-xl border border-gray-200 p-5 animate-pulse h-24" />
        <div className="bg-white rounded-xl border border-gray-200 p-5 animate-pulse h-24" />
        <div className="bg-white rounded-xl border border-gray-200 p-5 animate-pulse h-24" />
        <div className="bg-white rounded-xl border border-gray-200 p-5 animate-pulse h-24" />
      </div>

      {/* ── Recent applications ──────────────────────────────── */}
      {/*
        TODO: Render a list of recent jobs (recentJobs).
        Each row should show: company, title, status badge, applied_date.
        Link each row to /jobs/:id
      */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900">Recent Applications</h2>
        </div>
        <div className="p-6 text-sm text-gray-400 italic">
          Your recent applications will appear here.
        </div>
      </div>
    </div>
  )
}
