import { supabase } from "../supabase";
import type {
  Job,
  JobInsert,
  JobUpdate,
  JobStatus,
  DashboardStats,
} from "../../types";

export interface JobFilters {
  status?: JobStatus;
  search?: string;
}

// Returns all jobs for the authenticated user, newest first.
// Optionally filter by status or search company/title.
export async function getJobs(filters?: JobFilters): Promise<Job[]> {
  let query = supabase
    .from("jobs")
    .select("*")
    .order("created_at", { ascending: false });

  if (filters?.status) {
    query = query.eq("status", filters.status);
  }

  if (filters?.search) {
    const term = `%${filters.search}%`;
    query = query.or(`company.ilike.${term},title.ilike.${term}`);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

// Returns a single job by id.
export async function getJob(id: string): Promise<Job | null> {
  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data;
}

// Creates a new job and returns the inserted row.
export async function createJob(data: JobInsert): Promise<Job> {
  const { data: row, error } = await supabase
    .from("jobs")
    .insert(data)
    .select()
    .single();

  if (error) throw error;
  return row;
}

// Updates an existing job and returns the updated row.
export async function updateJob(id: string, data: JobUpdate): Promise<Job> {
  const { data: row, error } = await supabase
    .from("jobs")
    .update(data)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return row;
}

// Deletes a job by id.
export async function deleteJob(id: string): Promise<void> {
  const { error } = await supabase.from("jobs").delete().eq("id", id);

  if (error) throw error;
}

// Returns aggregate counts for the dashboard.
export async function getDashboardStats(): Promise<DashboardStats> {
  const { data, error } = await supabase.from("jobs").select("status");

  if (error) throw error;

  const rows = data as { status: JobStatus }[];

  return {
    total: rows.length,
    wishlist: rows.filter((r) => r.status === "wishlist").length,
    applied: rows.filter((r) => r.status === "applied").length,
    interviewing: rows.filter(
      (r) => r.status === "phone_screen" || r.status === "interview",
    ).length,
    offers: rows.filter((r) => r.status === "offer").length,
    rejected: rows.filter((r) => r.status === "rejected").length,
  };
}
