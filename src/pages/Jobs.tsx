import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getJobs } from '../lib/api/jobs'
import type { Job, JobStatus } from '../types'
import { errorMessage } from '../lib/utils'
// TODO: import { JOB_STATUS_LABELS, JOB_STATUS_COLORS } from '../types'

export default function Jobs() {
  // TODO: const [search, setSearch]       = useState('')
  // TODO: const [statusFilter, setStatus] = useState<JobStatus | ''>('')
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // TODO: useEffect(() => {
  //   fetch jobs via getJobs({ status: statusFilter || undefined, search })
  //   update jobs state and setLoading(false)
  // }, [search, statusFilter])

  useEffect(() => {
    async function loadJobs() {
      try {
        const data = await getJobs()
        setJobs(data)
      }
      catch(err) {
        const err_message = errorMessage(err)
        console.log(err_message)
        setError(err_message)
      }
      finally {
        setLoading(false)
      }
    }

    loadJobs()
  }, [])

  return (
    <div className="p-8">
      {/* ── Header ──────────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Applications</h1>
          <p className="mt-1 text-sm text-gray-500">Track every role you've applied to.</p>
        </div>
        <Link
          to="/jobs/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-500 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Application
        </Link>
      </div>

      {/* ── Filters ─────────────────────────────────────────── */}
      {/*
        TODO: Add a search input bound to `search` state.
        TODO: Add a status <select> bound to `statusFilter` state.
               Options: '' (All), and each value from JOB_STATUS_LABELS.

        Suggested layout:
        <div className="flex gap-3 mb-6">
          <input ... />
          <select ... />
        </div>
      */}
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Search company or role…"
          disabled
          className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm bg-white placeholder-gray-400"
        />
        <select disabled className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white text-gray-500">
          <option>All statuses</option>
        </select>
      </div>

      {/* ── Jobs table ──────────────────────────────────────── */}
      {/*
        TODO: Replace placeholder with real rows from `jobs`.
        Each row: company, title, status badge (JOB_STATUS_COLORS), applied_date, location.
        Row should link to /jobs/:id on click.
      */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Company</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Role</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Applied</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Location</th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody>
            {/* TODO: map jobs → <tr> rows */}
            <tr>
              <td colSpan={6} className="px-6 py-10 text-center text-sm text-gray-400 italic">
                No applications yet.{' '}
                <Link to="/jobs/new" className="text-indigo-600 hover:underline">Add your first one.</Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
