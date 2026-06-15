import { Link, useParams } from 'react-router-dom'
// TODO: import { useEffect, useState } from 'react'
// TODO: import { getJob, deleteJob } from '../lib/api/jobs'
// TODO: import { getContactsByJob, createContact, deleteContact } from '../lib/api/contacts'
// TODO: import { getActivitiesByJob, createActivity, deleteActivity } from '../lib/api/activities'
// TODO: import type { Job, Contact, Activity } from '../types'
// TODO: import { JOB_STATUS_LABELS, JOB_STATUS_COLORS, ACTIVITY_TYPE_LABELS } from '../types'
// TODO: import { useNavigate } from 'react-router-dom'

export default function JobDetail() {
  const { id } = useParams<{ id: string }>()
  // const navigate = useNavigate()

  // TODO: const [job, setJob]               = useState<Job | null>(null)
  // TODO: const [contacts, setContacts]      = useState<Contact[]>([])
  // TODO: const [activities, setActivities]  = useState<Activity[]>([])
  // TODO: const [loading, setLoading]        = useState(true)
  // TODO: const [notFound, setNotFound]      = useState(false)

  // TODO: useEffect(() => {
  //   fetch job via getJob(id!)
  //   if job is null → setNotFound(true)
  //   fetch contacts via getContactsByJob(id!)
  //   fetch activities via getActivitiesByJob(id!)
  //   setLoading(false)
  // }, [id])

  // TODO: async function handleDelete() {
  //   if (!confirm('Delete this application?')) return
  //   await deleteJob(id!)
  //   navigate('/jobs')
  // }

  return (
    <div className="p-8 max-w-4xl">
      {/* ── Back + actions header ───────────────────────────── */}
      <div className="flex items-center justify-between mb-6">
        <Link
          to="/jobs"
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          All Applications
        </Link>

        <div className="flex items-center gap-2">
          {/* TODO: Link to /jobs/:id/edit */}
          <Link
            to={`/jobs/${id}/edit`}
            className="px-3 py-1.5 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Edit
          </Link>
          {/* TODO: wire onClick → handleDelete */}
          <button className="px-3 py-1.5 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
            Delete
          </button>
        </div>
      </div>

      {/* ── Job summary card ────────────────────────────────── */}
      {/*
        TODO: Replace placeholders with real job.* values.
        Show: company, title, status badge, applied_date, location, remote, salary range, job_url, notes.
      */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
              {/* TODO: job.company */}
              Company Name
            </p>
            <h1 className="text-xl font-bold text-gray-900">
              {/* TODO: job.title */}
              Job Title
            </h1>
          </div>
          {/* TODO: <span className={`... ${JOB_STATUS_COLORS[job.status]}`}>{JOB_STATUS_LABELS[job.status]}</span> */}
          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-500">Status</span>
        </div>

        <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-3">
          <div>
            <dt className="text-gray-400">Applied</dt>
            <dd className="font-medium text-gray-800">{/* TODO: job.applied_date ?? '—' */}—</dd>
          </div>
          <div>
            <dt className="text-gray-400">Location</dt>
            <dd className="font-medium text-gray-800">{/* TODO: job.location ?? '—' */}—</dd>
          </div>
          <div>
            <dt className="text-gray-400">Remote</dt>
            <dd className="font-medium text-gray-800">{/* TODO: job.remote ? 'Yes' : 'No' */}—</dd>
          </div>
          <div>
            <dt className="text-gray-400">Salary Range</dt>
            <dd className="font-medium text-gray-800">
              {/* TODO: display salary_min / salary_max if present */}—
            </dd>
          </div>
          <div className="col-span-2">
            <dt className="text-gray-400">Job Posting</dt>
            <dd>
              {/* TODO: job.job_url && <a href={job.job_url} target="_blank">View posting</a> */}
              <span className="text-gray-400">—</span>
            </dd>
          </div>
        </dl>

        {/* TODO: if job.notes render notes section */}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* ── Contacts ──────────────────────────────────────── */}
        {/*
          TODO: Map `contacts` to contact cards.
          TODO: Add a form / modal to create a new contact via createContact({ job_id: id!, ...data }).
          TODO: Wire delete button to deleteContact(contact.id) then remove from state.
        */}
        <section className="bg-white rounded-xl border border-gray-200">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-900">Contacts</h2>
            {/* TODO: button to open add-contact form */}
            <button className="text-xs font-medium text-indigo-600 hover:text-indigo-500">+ Add</button>
          </div>
          <div className="p-5 text-sm text-gray-400 italic">No contacts yet.</div>
        </section>

        {/* ── Activity timeline ─────────────────────────────── */}
        {/*
          TODO: Map `activities` to timeline entries, newest first.
          TODO: Add a form to log a new activity via createActivity({ job_id: id!, ...data }).
          TODO: Wire delete to deleteActivity(activity.id).
        */}
        <section className="bg-white rounded-xl border border-gray-200">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-900">Activity Timeline</h2>
            {/* TODO: button to open log-activity form */}
            <button className="text-xs font-medium text-indigo-600 hover:text-indigo-500">+ Log</button>
          </div>
          <div className="p-5 text-sm text-gray-400 italic">No activity logged yet.</div>
        </section>
      </div>
    </div>
  )
}
