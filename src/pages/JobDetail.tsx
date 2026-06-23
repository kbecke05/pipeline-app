import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getJob, deleteJob } from '../lib/api/jobs'
import { getContactsByJob, createContact, deleteContact, updateContact } from '../lib/api/contacts'
import { getActivitiesByJob, createActivity, deleteActivity, updateActivity } from '../lib/api/activities'
import type { Job, Contact, Activity, ContactInsert, ActivityInsert } from '../types'
import { ACTIVITY_TYPE_LABELS } from '../types'
import { Alert, Select, Button, Card, FormField, Input, LinkButton, StatusBadge } from '../components/ui'
import { errorMessage } from '../lib/utils'
import ContactCard from '../components/job/ContactCard'
import ActivityCard from '../components/job/ActivityCard'

export default function JobDetail() {
  const [jobData, setJobData] = useState<Job | null>(null)
  const [contacts, setContacts] = useState<Contact[]>([])
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showAddContactForm, setShowAddContactForm] = useState(false)
  const [savingContact, setSavingContact] = useState(false)
  const [editingContact, setEditingContact] = useState<Contact | null>(null)
  const [showAddActivityForm, setShowAddActivityForm] = useState(false)
  const [savingActivity, setSavingActivity] = useState(false)
  const [editingActivity, setEditingActivity] = useState<Activity|null>(null)
  const { id } = useParams<{ id: string }>()
  const emptyContact: ContactInsert = {
    job_id: id!,
    name: '',
    title: '',
    email: '',
    linkedin_url: '',
    notes: ''
  }
  const [contactFormData, setContactFormData] = useState<ContactInsert>(emptyContact)
  const emptyActivity: ActivityInsert = {
    job_id: id!,
    type: 'note',
    title: '',
    description: '',
    date: new Date().toISOString().slice(0, 10)
  }
  const [activityFormData, setActivityFormData] = useState<ActivityInsert>(emptyActivity)
  const navigate = useNavigate()

  useEffect(()=>{
    setLoading(true)
    async function load() {
      try {
        const job = await getJob(id!)
        if (!job) {
          navigate('/jobs/')
          return
        }
        setJobData(job)
        const contacts = await getContactsByJob(id!)
        setContacts(contacts)
        const activities = await getActivitiesByJob(id!)
        setActivities(activities)
      }
      catch(err) {
        setError(errorMessage(err))
      }
      finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  async function handleDelete() {
    setError(null)
    if (!confirm("Are you sure you want to delete this job application?")) return;
    try {
      await deleteJob(id!)
      navigate('/jobs/')
    }
    catch(err) {
      setError(errorMessage(err))
    }
  }

  async function handleCreateContact(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSavingContact(true)
    try {
      if (!editingContact) {
        const newContact = await createContact(contactFormData)
        setContacts((prev)=>[...prev, newContact])
      } else {
        const updatedContact = await updateContact(editingContact.id, contactFormData)
        setContacts(prev=>prev.map((contact)=>contact.id === updatedContact.id ? updatedContact : contact))
      }
      setContactFormData(emptyContact)
      setShowAddContactForm(false)
      setEditingContact(null)
    }
    catch(err) {
      setError(errorMessage(err))
    }
    finally {
      setSavingContact(false)
    }
  }

  async function handleDeleteContact(contactId:string) {
    setError(null)
    if (!confirm("Are you sure you want to delete this contact?")) return;
    try {
      await deleteContact(contactId)
      setContacts((prev)=>prev.filter((c)=>c .id !== contactId))
    }
    catch(err) {
      setError(errorMessage(err))
    }
  }

  function handleContactChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setContactFormData((prev)=>({...prev, [e.target.name]:e.target.value}))
  }

  function handleEditContact(contact : Contact) {
    setEditingContact(contact)
    setContactFormData({...contact})
    setShowAddContactForm(true)
  }

  async function handleCreateActivity(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSavingActivity(true)
    try {
      if (!editingActivity) {
        const newActivity = await createActivity(activityFormData)
        setActivities(prev => [...prev, newActivity])
      } else {
        const updatedActivity = await updateActivity(editingActivity.id, activityFormData)
        setActivities(prev=>prev.map((activity)=>activity.id === updatedActivity.id ? updatedActivity :activity))
      } 
      setActivityFormData(emptyActivity)
      setShowAddActivityForm(false)
      setEditingActivity(null)
    }
    catch(err) {
      setError(errorMessage(err))
    }
    finally {
      setSavingActivity(false)
    }
  }

  async function handleDeleteActivity(activityId : string) {
    setError(null)
    if (!confirm("Are you sure you want to delete this activity?")) return;
    try {
      await deleteActivity(activityId)
      setActivities(prev => prev.filter((activity)=>activity.id !== activityId))
    }
    catch(err) {
      setError(errorMessage(err))
    }
  }

  function handleActivityChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setActivityFormData(prev=>({...prev, [e.target.name]: e.target.value}))
  }

  function handleEditActivity(activity : Activity){
    setEditingActivity(activity)
    setActivityFormData({...activity, date: activity.date.slice(0, 10)})
    setShowAddActivityForm(true)
  }

  if (loading) return <div className="p-8 text-sm text-gray-400" >Loading...</div>
  if (!jobData) return null

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <Link to="/jobs" className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          All Applications
        </Link>
        <div className="flex gap-2">
          <LinkButton to={`/jobs/${id}/edit`} variant="secondary" size="sm">Edit</LinkButton>
          <Button variant="danger" size="sm" onClick={handleDelete}>Delete</Button>
        </div>
      </div>

      {error && <Alert className="mb-4" >{error}</Alert>}

      <Card className="mb-6">
        <Card.Body>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                {jobData.company ?? ''}
              </p>
              <h1 className="text-xl font-bold text-gray-900">
                {jobData.title ?? ''}
              </h1>
            </div>
            <StatusBadge status={jobData.status} />
          </div>

          <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-3">
            <div>
              <dt className="text-gray-400">Applied</dt>
              <dd className="font-medium text-gray-800">{jobData.applied_date ? 
                new Date(jobData.applied_date + 'T00:00:00').toLocaleDateString() : '-'}
              </dd>
            </div>
            <div>
              <dt className="text-gray-400">Location</dt>
              <dd className="font-medium text-gray-800">{jobData.location ?? ''}</dd>
            </div>
            <div>
              <dt className="text-gray-400">Remote</dt>
              <dd className="font-medium text-gray-800">{jobData.remote ? 'Yes' : 'No'}</dd>
            </div>
            <div>
              <dt className="text-gray-400">Salary</dt>
              <dd className="font-medium text-gray-800">
                {jobData.salary_min != null && jobData.salary_max != null ? 
                `$${jobData.salary_min.toLocaleString()} - $${jobData.salary_max.toLocaleString()} `
                : '-'}
              </dd>
            </div>
            <div className="col-span-2">
              <dt className="text-gray-400">Job Posting</dt>
              <dd>
                {jobData.job_url ? 
                  <a className="text-indigo-600 hover:underline" href={jobData.job_url} target='_blank' rel="noopener noreferrer">{new URL(jobData.job_url).hostname}</a>
                  : <span className="text-gray-400">—</span>
                }
              </dd>
            </div>
            <div>
              <dt className="text-gray-400">Notes</dt>
              <dd>
                {jobData.notes}
              </dd>
            </div>
          </dl>
          
        </Card.Body>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <Card.Header
            title="Contacts"
            action={<Button size="sm" onClick={()=>{
              setShowAddContactForm(prev=> !prev)
              setContactFormData(emptyContact)
              setEditingContact(null)
            }}>{showAddContactForm ? "Cancel" : "+ Add"}</Button>}
          />
          {showAddContactForm &&
            <form className="px-6 py-5 border-b border-gray-100 space-y-4" onSubmit={handleCreateContact} >
              <FormField htmlFor="contactName" label="Name" required>
                <Input id="contactName" type="text" name="name" value={contactFormData.name} onChange={handleContactChange} required />
              </FormField>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField htmlFor="contactTitle" label="Title">
                  <Input id="contactTitle" type="text" name="title" value={contactFormData.title ?? ''} onChange={handleContactChange} />
                </FormField>
                <FormField htmlFor="contactEmail" label="Email">
                  <Input id="contactEmail" type="email" name="email" value={contactFormData.email ?? ''} onChange={handleContactChange} />
                </FormField>
              </div>
              <FormField htmlFor="contactLinkedinUrl" label="LinkedIn URL">
                <Input id="contactLinkedinUrl" type="url" name="linkedin_url" value={contactFormData.linkedin_url ?? ''} onChange={handleContactChange} />
              </FormField>
              <FormField htmlFor="contactNotes" label="Notes">
                <textarea
                  id="contactNotes"
                  name="notes"
                  rows={3}
                  value={contactFormData.notes ?? ''}
                  onChange={handleContactChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
              </FormField>
              <div className="flex items-center justify-end gap-3 pt-1">
                <Button variant="secondary" size="sm" type="button" onClick={()=>{
                  setShowAddContactForm(false)
                  setContactFormData(emptyContact)
                  setEditingContact(null)
                  }}>Cancel</Button>
                <Button variant="primary" size="sm" type="submit" disabled={savingContact}>Save</Button>
              </div>
            </form>
          }
          {contacts
          .filter((contact)=>contact.id !== editingContact?.id)
          .map((contact)=>(
            <ContactCard 
              key={contact.id}
              contact={contact} 
              onDelete={() => handleDeleteContact(contact.id)}
              onEdit={()=>handleEditContact(contact)}
            />
          ))}
          {contacts.length === 0 && <Card.Body className="text-sm text-gray-400 italic">No contacts yet.</Card.Body>}
        </Card>

        <Card>
          <Card.Header
            title="Activity Timeline"
            action={<Button size="sm" onClick={()=>{
              setShowAddActivityForm(prev=>!prev)
              setActivityFormData(emptyActivity)
              setEditingActivity(null)
            }}>{showAddActivityForm ? "Cancel" : "+ Log"}</Button>}
          />
          {showAddActivityForm &&
            <form className="px-6 py-5 border-b border-gray-100 space-y-4" onSubmit={handleCreateActivity}>
              <FormField htmlFor="activityType" label="Activity Type">
                <Select id="activityType" name="type" value={activityFormData.type} onChange={handleActivityChange}>
                  {Object.entries(ACTIVITY_TYPE_LABELS).map(([value,label])=>
                    <option key={value} value={value}>{label}</option>
                  )}
                </Select>
              </FormField>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField htmlFor="activityTitle" label="Title" required>
                  <Input id="activityTitle" type="text" name="title" value={activityFormData.title ?? ''} onChange={handleActivityChange} required/>
                </FormField>
              </div>
              <FormField htmlFor="activityDescription" label="Description">
                <textarea
                  id="activityDescription"
                  name="description"
                  rows={3}
                  value={activityFormData.description ?? ''}
                  onChange={handleActivityChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
              </FormField>
              <FormField htmlFor="activityDate" label="Date">
                <Input id="activityDate" type="date" name="date" value={activityFormData.date ?? ''} onChange={handleActivityChange} />
              </FormField>
              <div className="flex items-center justify-end gap-3 pt-1">
                <Button variant="secondary" size="sm" type="button" onClick={()=>{
                  setShowAddActivityForm(false)
                  setActivityFormData(emptyActivity)
                  setEditingActivity(null)
                  }}>Cancel</Button>
                <Button variant="primary" size="sm" type="submit" disabled={savingActivity}>Save</Button>
              </div>
            </form>
          }
          {activities
            .filter((activity)=>activity.id !== editingActivity?.id)
            .map((activity)=>
            <ActivityCard
              key={activity.id}
              activity={activity}
              onDelete={()=>handleDeleteActivity(activity.id)}
              onEdit={()=>handleEditActivity(activity)}
            />
          )}
          {activities.length === 0 && <Card.Body className="text-sm text-gray-400 italic">No activity logged yet.</Card.Body>}
        </Card>
      </div>
    </div>
  )
}
