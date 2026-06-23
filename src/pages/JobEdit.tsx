import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getJob, updateJob } from '../lib/api/jobs'
import type { JobUpdate } from '../types'
import { Alert, Button, FormField, Input, Select } from '../components/ui'
import { JOB_STATUS_LABELS } from '../types'
import { errorMessage } from '../lib/utils'

export default function JobEdit() {
  const navigate = useNavigate()
  const {id} = useParams<{id : string}>()
  const [formData, setFormData] = useState<JobUpdate>()
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    async function load() {
      setLoading(true)
      try {
        const job = await getJob(id!)
        if (!job) {navigate('/jobs'); return}
        setFormData(job)
      }
      catch (err) {
        setError(errorMessage(err))
      }
      finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const {name, value, type} = e.target
    if (type === "checkbox") {
      setFormData((prev)=>({...prev, [name]:(e.target as HTMLInputElement).checked}))
    } else if (type === "number"){
      setFormData((prev)=>({...prev, [name]: value === '' ? null : Number(value)}))
    } else {
      setFormData((prev)=>({...prev, [name]: value === '' ? null : value}))
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    try {
      await updateJob(id!, formData!)
      navigate(`/jobs/${id}`)
    }
    catch (err) {
      setError(errorMessage(err))
    }
    finally {
      setSaving(false)
    }
  }


  if (loading) return <div className="p-8 text-sm text-gray-400">Loading...</div>
  if (!formData) return null

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
        <h1 className="text-2xl font-bold text-gray-900">Edit Application</h1>
        <p className="mt-1 text-sm text-gray-500">Update the details for this application.</p>
      </div>

      {error && <Alert className="mb-4">{error}</Alert>}

      <form onSubmit={handleSubmit} className="space-y-5 bg-white rounded-xl border border-gray-200 p-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField htmlFor="jobCompany" label="Company" required>
            <Input id="jobCompany" type="text" name='company' value={formData.company ?? ''} onChange={handleChange}/>
          </FormField>
          <FormField htmlFor="jobTitle" label="Role / Title" required>
            <Input id="jobTitle" type="text" name='title' value={formData.title ?? ''} onChange={handleChange}/>
          </FormField>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField htmlFor="jobStatus" label="Status">
            <Select id="jobStatus" fullWidth name='status' value={formData.status ?? ''} onChange={handleChange}>
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
          <Input id="jobUrl" type="url" name='job_url' value={formData.job_url ?? ''} onChange={handleChange} placeholder="https://…" />
        </FormField>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField htmlFor="jobLocation" label="Location">
            <Input id="jobLocation" type="text" name='location' value={formData.location ?? ''} onChange={handleChange}/>
          </FormField>
          <div className="flex items-center gap-2 pt-6">
            <input type="checkbox" id="remote" name='remote' checked={formData.remote ?? false} onChange={handleChange} className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
            <label htmlFor="remote" className="text-sm font-medium text-gray-700">Remote / Hybrid</label>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField htmlFor="jobSalaryMin" label="Salary Min">
            <Input id="jobSalaryMin" type="number" name='salary_min' value={formData.salary_min ?? ''} onChange={handleChange}/>
          </FormField>
          <FormField htmlFor="jobSalaryMax" label="Salary Max">
            <Input id="jobSalaryMax" type="number" name='salary_max' value={formData.salary_max ?? ''} onChange={handleChange}/>
          </FormField>
        </div>

        <FormField htmlFor="jobNotes" label="Notes">
          <textarea
            id="jobNotes"
            rows={4}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            name='notes'
            value={formData.notes ?? ''}
            onChange={handleChange} />
        </FormField>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="secondary" type="button" onClick={() => navigate(-1)}>Cancel</Button>
          <Button variant="primary" type="submit" disabled={saving}>Save Changes</Button>
        </div>
      </form>
    </div>
  )
}
