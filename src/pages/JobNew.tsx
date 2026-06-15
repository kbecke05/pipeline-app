import { useNavigate } from 'react-router-dom'
// TODO: import { useState } from 'react'
// TODO: import { createJob } from '../lib/api/jobs'
// TODO: import type { JobInsert, JobStatus } from '../types'
// TODO: import { JOB_STATUS_LABELS } from '../types'

export default function JobNew() {
  const navigate = useNavigate()

  // TODO: const [saving, setSaving] = useState(false)
  // TODO: const [error, setError]   = useState<string | null>(null)

  // TODO: Build controlled form state for all JobInsert fields:
  //   company, title, status, applied_date, job_url,
  //   salary_min, salary_max, location, remote, notes

  // TODO: async function handleSubmit(e: React.FormEvent) {
  //   e.preventDefault()
  //   setSaving(true)
  //   try {
  //     const job = await createJob(formData)
  //     navigate(`/jobs/${job.id}`)
  //   } catch (err) {
  //     setError(err instanceof Error ? err.message : 'Something went wrong')
  //   } finally {
  //     setSaving(false)
  //   }
  // }

  return (
    <div className="p-8 max-w-2xl">
      {/* ── Header ────────────────────────────────────────────── */}
      <div className="mb-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Add Application</h1>
        <p className="mt-1 text-sm text-gray-500">Track a new job you're pursuing.</p>
      </div>

      {/* ── Form ──────────────────────────────────────────────── */}
      {/*
        TODO: Wire this form up with controlled inputs and handleSubmit.
        Fields needed (see JobInsert type):
          - company (required text)
          - title   (required text)
          - status  (select, default 'wishlist')
          - applied_date (date input, optional)
          - job_url (url input, optional)
          - location (text, optional)
          - remote  (checkbox, default false)
          - salary_min / salary_max (number inputs, optional)
          - notes (textarea, optional)
      */}
      <form className="space-y-5 bg-white rounded-xl border border-gray-200 p-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company <span className="text-red-500">*</span></label>
            <input type="text" placeholder="Acme Corp" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role / Title <span className="text-red-500">*</span></label>
            <input type="text" placeholder="Senior Engineer" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
              {/* TODO: map JOB_STATUS_LABELS entries to <option> elements */}
              <option value="wishlist">Wishlist</option>
              <option value="applied">Applied</option>
              <option value="phone_screen">Phone Screen</option>
              <option value="interview">Interview</option>
              <option value="offer">Offer</option>
              <option value="rejected">Rejected</option>
              <option value="withdrawn">Withdrawn</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date Applied</label>
            <input type="date" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Job URL</label>
          <input type="url" placeholder="https://…" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input type="text" placeholder="San Francisco, CA" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div className="flex items-center gap-2 pt-6">
            <input type="checkbox" id="remote" className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
            <label htmlFor="remote" className="text-sm font-medium text-gray-700">Remote / Hybrid</label>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Salary Min</label>
            <input type="number" placeholder="80000" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Salary Max</label>
            <input type="number" placeholder="120000" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
          <textarea rows={4} placeholder="Referral from Jane. Interesting product…" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
        </div>

        {/* TODO: Show error state if error is set */}

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-colors"
          >
            {/* TODO: show "Saving…" when saving is true */}
            Save Application
          </button>
        </div>
      </form>
    </div>
  )
}
