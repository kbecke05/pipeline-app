import { useNavigate, useParams } from 'react-router-dom'
// TODO: import { useEffect, useState } from 'react'
// TODO: import { getJob, updateJob } from '../lib/api/jobs'
// TODO: import type { Job, JobUpdate, JobStatus } from '../types'
// TODO: import { JOB_STATUS_LABELS } from '../types'

export default function JobEdit() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  // TODO: const [job, setJob]       = useState<Job | null>(null)
  // TODO: const [saving, setSaving] = useState(false)
  // TODO: const [loading, setLoading] = useState(true)
  // TODO: const [error, setError]   = useState<string | null>(null)

  // TODO: Controlled form state initialized from the fetched job (same fields as JobNew)

  // TODO: useEffect(() => {
  //   const fetched = await getJob(id!)
  //   if (!fetched) { navigate('/jobs'); return }
  //   setJob(fetched)
  //   populate form state from fetched values
  //   setLoading(false)
  // }, [id])

  // TODO: async function handleSubmit(e: React.FormEvent) {
  //   e.preventDefault()
  //   setSaving(true)
  //   try {
  //     await updateJob(id!, formData)
  //     navigate(`/jobs/${id}`)
  //   } catch (err) {
  //     setError(...)
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
        <h1 className="text-2xl font-bold text-gray-900">Edit Application</h1>
        {/* TODO: Subtitle: job.company + ' — ' + job.title */}
        <p className="mt-1 text-sm text-gray-500">Update the details for this application.</p>
      </div>

      {/* ── Form ──────────────────────────────────────────────── */}
      {/*
        TODO: Identical field set to JobNew, but pre-populated from job state.
        TODO: Show loading skeleton when loading is true.
        TODO: Show error message when error is set.
        TODO: Disable all inputs and buttons when saving is true.
      */}
      <form className="space-y-5 bg-white rounded-xl border border-gray-200 p-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company <span className="text-red-500">*</span></label>
            <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role / Title <span className="text-red-500">*</span></label>
            <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
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
            <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div className="flex items-center gap-2 pt-6">
            <input type="checkbox" id="remote" className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
            <label htmlFor="remote" className="text-sm font-medium text-gray-700">Remote / Hybrid</label>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Salary Min</label>
            <input type="number" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Salary Max</label>
            <input type="number" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
          <textarea rows={4} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
        </div>

        {/* TODO: error message */}

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
            {/* TODO: 'Saving…' when saving */}
            Save Changes
          </button>
        </div>
      </form>
    </div>
  )
}
