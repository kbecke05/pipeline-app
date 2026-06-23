import { useNavigate } from 'react-router-dom'
import { Alert, Button, FormField, Input, Select } from '../components/ui'
import { useState } from 'react'
import { createJob } from '../lib/api/jobs'
import { JOB_STATUS_LABELS, JobInsert } from '../types'
import { errorMessage } from '../lib/utils'

export default function JobNew() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<JobInsert>({
    company:      '',
    title:        '',
    status:       'wishlist',
    applied_date: null,
    job_url:      null,
    salary_min:   null,
    salary_max:   null,
    location:     null,
    remote:       false,
    notes:        null,
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const {name, value, type} = e.target
    if (type === 'checkbox') {
      setFormData((prev)=>({...prev, [name]:(e.target as HTMLInputElement).checked}))
    } 
    else if (type === "number") {
      setFormData((prev)=>({...prev, [name]: value === '' ? null : Number(value)}))
    }
    else {
      setFormData((prev)=>({...prev, [name]: value === '' ? null : value}))
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const job = await createJob(formData)
      navigate(`/jobs/`)
    }
    catch (err) {
      setError(errorMessage(err))
    }
    finally {
      setLoading(false)
    }
  }
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

      {error && <Alert className="mb-4">{error}</Alert>}

      <form onSubmit={handleSubmit} className="space-y-5 bg-white rounded-xl border border-gray-200 p-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField htmlFor="jobCompany" label="Company" required>
            <Input id="jobCompany" name='company' value={formData.company ?? ''} type="text" placeholder="Acme Corp" onChange={handleChange}/>
          </FormField>
          <FormField htmlFor="jobTitle" label="Role / Title" required>
            <Input id="jobTitle" name='title' value={formData.title ?? ''} onChange={handleChange} type="text" placeholder="Senior Engineer" />
          </FormField>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField htmlFor="jobStatus" label="Status">
            <Select id="jobStatus" fullWidth name='status' value={formData.status} onChange={handleChange}>
              {Object.entries(JOB_STATUS_LABELS).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </Select>
          </FormField>
          <FormField htmlFor="jobAppliedDate" label="Date Applied">
            <Input id="jobAppliedDate" type="date" name='applied_date' value={formData.applied_date ?? ''} onChange={handleChange}/>
          </FormField>
        </div>

        <FormField htmlFor="jobUrl" label="Job URL">
          <Input id="jobUrl" name='job_url' value={formData.job_url ?? ''} onChange={handleChange} type="url" placeholder="https://…" />
        </FormField>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField htmlFor="jobLocation" label="Location">
            <Input id="jobLocation" name='location' value={formData.location ?? ''} onChange={handleChange} type="text" placeholder="San Francisco, CA" />
          </FormField>
          <div className="flex items-center gap-2 pt-6">
            <input type="checkbox" id="remote" name='remote' checked={formData.remote} onChange={handleChange} className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
            <label htmlFor="remote" className="text-sm font-medium text-gray-700">Remote / Hybrid</label>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField htmlFor="jobSalaryMin" label="Salary Min">
            <Input id="jobSalaryMin" name='salary_min' value={formData.salary_min ?? ''} onChange={handleChange} type="number" placeholder="80000" />
          </FormField>
          <FormField htmlFor="jobSalaryMax" label="Salary Max">
            <Input id="jobSalaryMax" name='salary_max' value={formData.salary_max ?? ''} onChange={handleChange} type="number" placeholder="120000" />
          </FormField>
        </div>

        <FormField htmlFor="jobNotes" label="Notes">
          <textarea
            id="jobNotes"
            name='notes'
            value={formData.notes ?? ''}
            onChange={handleChange}
            rows={4}
            placeholder="Referral from Jane. Interesting product…"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          />
        </FormField>


        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="secondary" type="button" onClick={() => navigate(-1)}>Cancel</Button>
          <Button variant="primary" type="submit" disabled={loading}>Save Application</Button>
        </div>
      </form>
    </div>
  )
}
