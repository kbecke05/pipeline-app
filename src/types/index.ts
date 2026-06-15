// ─── Enums ────────────────────────────────────────────────────────────────────

export type JobStatus =
  | 'wishlist'
  | 'applied'
  | 'phone_screen'
  | 'interview'
  | 'offer'
  | 'rejected'
  | 'withdrawn'

export type ActivityType =
  | 'applied'
  | 'email'
  | 'phone_call'
  | 'interview'
  | 'offer'
  | 'rejection'
  | 'note'

// ─── Database row types ───────────────────────────────────────────────────────

export interface Job {
  id: string
  user_id: string
  company: string
  title: string
  status: JobStatus
  applied_date: string | null   // ISO date string, e.g. "2024-06-13"
  job_url: string | null
  salary_min: number | null
  salary_max: number | null
  location: string | null
  remote: boolean
  notes: string | null
  created_at: string
  updated_at: string
}

export interface Contact {
  id: string
  job_id: string
  user_id: string
  name: string
  title: string | null
  email: string | null
  linkedin_url: string | null
  notes: string | null
  created_at: string
}

export interface Activity {
  id: string
  job_id: string
  user_id: string
  type: ActivityType
  title: string
  description: string | null
  date: string   // ISO timestamp
  created_at: string
}

// ─── Input types (omit server-generated fields) ───────────────────────────────

export type JobInsert = Omit<Job, 'id' | 'user_id' | 'created_at' | 'updated_at'>
export type JobUpdate = Partial<JobInsert>

export type ContactInsert = Omit<Contact, 'id' | 'user_id' | 'created_at'>
export type ContactUpdate = Partial<ContactInsert>

export type ActivityInsert = Omit<Activity, 'id' | 'user_id' | 'created_at'>
export type ActivityUpdate = Partial<ActivityInsert>

// ─── Aggregates ───────────────────────────────────────────────────────────────

export interface DashboardStats {
  total: number
  wishlist: number
  applied: number
  interviewing: number   // phone_screen + interview combined
  offers: number
  rejected: number
}

// ─── UI helpers ───────────────────────────────────────────────────────────────

export const JOB_STATUS_LABELS: Record<JobStatus, string> = {
  wishlist:     'Wishlist',
  applied:      'Applied',
  phone_screen: 'Phone Screen',
  interview:    'Interview',
  offer:        'Offer',
  rejected:     'Rejected',
  withdrawn:    'Withdrawn',
}

export const JOB_STATUS_COLORS: Record<JobStatus, string> = {
  wishlist:     'bg-indigo-100 text-indigo-700',
  applied:      'bg-blue-100 text-blue-700',
  phone_screen: 'bg-amber-100 text-amber-700',
  interview:    'bg-purple-100 text-purple-700',
  offer:        'bg-emerald-100 text-emerald-700',
  rejected:     'bg-red-100 text-red-700',
  withdrawn:    'bg-gray-100 text-gray-600',
}

export const ACTIVITY_TYPE_LABELS: Record<ActivityType, string> = {
  applied:    'Applied',
  email:      'Email',
  phone_call: 'Phone Call',
  interview:  'Interview',
  offer:      'Offer Received',
  rejection:  'Rejection',
  note:       'Note',
}
