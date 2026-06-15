import { supabase } from '../supabase'
import type { Activity, ActivityInsert, ActivityUpdate } from '../../types'

// Returns all activities for a given job, newest first.
export async function getActivitiesByJob(jobId: string): Promise<Activity[]> {
  const { data, error } = await supabase
    .from('activities')
    .select('*')
    .eq('job_id', jobId)
    .order('date', { ascending: false })

  if (error) throw error
  return data
}

// Creates a new activity log entry and returns the inserted row.
export async function createActivity(data: ActivityInsert): Promise<Activity> {
  const { data: row, error } = await supabase
    .from('activities')
    .insert(data)
    .select()
    .single()

  if (error) throw error
  return row
}

// Updates an activity and returns the updated row.
export async function updateActivity(id: string, data: ActivityUpdate): Promise<Activity> {
  const { data: row, error } = await supabase
    .from('activities')
    .update(data)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return row
}

// Deletes an activity by id.
export async function deleteActivity(id: string): Promise<void> {
  const { error } = await supabase
    .from('activities')
    .delete()
    .eq('id', id)

  if (error) throw error
}
