import { useNavigate } from 'react-router-dom'
// TODO: import { useState } from 'react'
// TODO: import { createJob } from '../lib/api/jobs'
// TODO: import type { JobInsert } from '../types'
import { Alert, Button, FormField, Input, Select } from '../components/ui'
import { JOB_STATUS_LABELS } from '../types'

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
  //     setError(errorMessage(err))
  //   } finally {
  //     setSaving(false)
  //   }
  // }

  return (
    <div className="p-8 max-w-2xl">
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

      {/* TODO: add onSubmit={handleSubmit} */}
      <form className="space-y-5 bg-white rounded-xl border border-gray-200 p-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField label="Company" required>
            <Input type="text" placeholder="Acme Corp" />
          </FormField>
          <FormField label="Role / Title" required>
            <Input type="text" placeholder="Senior Engineer" />
          </FormField>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField label="Status">
            <Select fullWidth>
              {Object.entries(JOB_STATUS_LABELS).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </Select>
          </FormField>
          <FormField label="Date Applied">
            <Input type="date" />
          </FormField>
        </div>

        <FormField label="Job URL">
          <Input type="url" placeholder="https://…" />
        </FormField>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField label="Location">
            <Input type="text" placeholder="San Francisco, CA" />
          </FormField>
          <div className="flex items-center gap-2 pt-6">
            <input type="checkbox" id="remote" className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
            <label htmlFor="remote" className="text-sm font-medium text-gray-700">Remote / Hybrid</label>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField label="Salary Min">
            <Input type="number" placeholder="80000" />
          </FormField>
          <FormField label="Salary Max">
            <Input type="number" placeholder="120000" />
          </FormField>
        </div>

        <FormField label="Notes">
          <textarea
            rows={4}
            placeholder="Referral from Jane. Interesting product…"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          />
        </FormField>

        {/* TODO: show when error is set */}
        {/* <Alert>{error}</Alert> */}

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="secondary" type="button" onClick={() => navigate(-1)}>Cancel</Button>
          {/* TODO: disabled={saving}, text: saving ? 'Saving…' : 'Save Application' */}
          <Button variant="primary" type="submit">Save Application</Button>
        </div>
      </form>
    </div>
  )
}
