import { Link, useParams } from 'react-router-dom'
// TODO: import { useEffect, useState } from 'react'
// TODO: import { useNavigate } from 'react-router-dom'
// TODO: import { getJob, deleteJob } from '../lib/api/jobs'
// TODO: import { getContactsByJob, createContact, deleteContact } from '../lib/api/contacts'
// TODO: import { getActivitiesByJob, createActivity, deleteActivity } from '../lib/api/activities'
// TODO: import type { Job, Contact, Activity } from '../types'
// TODO: import { ACTIVITY_TYPE_LABELS } from '../types'
import { Button, Card, LinkButton, StatusBadge } from '../components/ui'

export default function JobDetail() {
  const { id } = useParams<{ id: string }>()
  // const navigate = useNavigate()

  // TODO: const [job, setJob]              = useState<Job | null>(null)
  // TODO: const [contacts, setContacts]    = useState<Contact[]>([])
  // TODO: const [activities, setActivities] = useState<Activity[]>([])
  // TODO: const [loading, setLoading]      = useState(true)

  // TODO: useEffect(() => {
  //   fetch job via getJob(id!)
  //   if job is null → navigate('/jobs')
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
      {/* ── Back + actions ──────────────────────────────────── */}
      <div className="flex items-center justify-between mb-6">
        <Link to="/jobs" className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          All Applications
        </Link>
        <div className="flex gap-2">
          <LinkButton to={`/jobs/${id}/edit`} variant="secondary" size="sm">Edit</LinkButton>
          {/* TODO: onClick={handleDelete} */}
          <Button variant="danger" size="sm">Delete</Button>
        </div>
      </div>

      {/* ── Job summary ─────────────────────────────────────── */}
      {/*
        TODO: Replace placeholder values with real job.* fields.
        TODO: Wrap in a loading skeleton or spinner when loading is true.
      */}
      <Card className="mb-6">
        <Card.Body>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                {/* TODO: job.company */}Company Name
              </p>
              <h1 className="text-xl font-bold text-gray-900">
                {/* TODO: job.title */}Job Title
              </h1>
            </div>
            {/* TODO: <StatusBadge status={job.status} /> */}
            <StatusBadge status="applied" />
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
              <dt className="text-gray-400">Salary</dt>
              <dd className="font-medium text-gray-800">
                {/* TODO: show salary_min–salary_max if present */}—
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

          {/* TODO: if job.notes: <p className="mt-4 text-sm text-gray-600">{job.notes}</p> */}
        </Card.Body>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* ── Contacts ──────────────────────────────────────── */}
        {/*
          TODO: map `contacts` to contact cards showing name, title, email, linkedin_url.
          TODO: Wire "+ Add" button to open an inline form and call createContact({ job_id: id!, ...data }).
          TODO: Wire delete on each card to deleteContact(contact.id).
        */}
        <Card>
          <Card.Header
            title="Contacts"
            action={<Button size="sm">+ Add</Button>}
          />
          <Card.Body className="text-sm text-gray-400 italic">No contacts yet.</Card.Body>
        </Card>

        {/* ── Activity timeline ─────────────────────────────── */}
        {/*
          TODO: map `activities` to timeline entries (newest first — already sorted).
          TODO: Show type label (ACTIVITY_TYPE_LABELS[a.type]), title, description, formatted date.
          TODO: Wire "+ Log" button to open a form and call createActivity({ job_id: id!, ...data }).
          TODO: Wire delete to deleteActivity(activity.id).
        */}
        <Card>
          <Card.Header
            title="Activity Timeline"
            action={<Button size="sm">+ Log</Button>}
          />
          <Card.Body className="text-sm text-gray-400 italic">No activity logged yet.</Card.Body>
        </Card>
      </div>
    </div>
  )
}
