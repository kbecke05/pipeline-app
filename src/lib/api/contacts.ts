import { supabase } from '../supabase'
import type { Contact, ContactInsert, ContactUpdate } from '../../types'

// Returns all contacts for a given job, oldest first.
export async function getContactsByJob(jobId: string): Promise<Contact[]> {
  const { data, error } = await supabase
    .from('contacts')
    .select('*')
    .eq('job_id', jobId)
    .order('created_at', { ascending: true })

  if (error) throw error
  return data
}

// Creates a new contact and returns the inserted row.
export async function createContact(data: ContactInsert): Promise<Contact> {
  const { data: row, error } = await supabase
    .from('contacts')
    .insert(data)
    .select()
    .single()

  if (error) throw error
  return row
}

// Updates an existing contact and returns the updated row.
export async function updateContact(id: string, data: ContactUpdate): Promise<Contact> {
  const { data: row, error } = await supabase
    .from('contacts')
    .update(data)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return row
}

// Deletes a contact by id.
export async function deleteContact(id: string): Promise<void> {
  const { error } = await supabase
    .from('contacts')
    .delete()
    .eq('id', id)

  if (error) throw error
}
