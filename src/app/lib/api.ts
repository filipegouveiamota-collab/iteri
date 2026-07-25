import { supabase } from "./supabaseClient";
import type { Database } from "./database.types";
import type {
  Application,
  ApplicationStatus,
  Experience,
  Notification,
  OffererProfile,
  Opportunity,
  StudentProfile,
  User,
} from "./types";

type Row<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Row"];

const CPF_ALREADY_REGISTERED = "Este CPF já está cadastrado em outra conta.";

function isUniqueViolation(error: unknown): boolean {
  return typeof error === "object" && error !== null && (error as { code?: string }).code === "23505";
}

function throwFriendly(error: unknown): never {
  if (isUniqueViolation(error)) throw new Error(CPF_ALREADY_REGISTERED);
  throw error instanceof Error ? error : new Error(String(error));
}

// ----- Profiles (auth.users mirror) -----

function mapProfile(row: Row<"profiles">): User {
  return {
    id: row.id,
    email: row.email,
    role: row.role,
    name: row.name,
    avatar: row.avatar ?? "",
    onboardingCompleted: row.onboarding_completed,
  };
}

export async function getUserById(id: string): Promise<User | undefined> {
  const { data, error } = await supabase.from("profiles").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data ? mapProfile(data) : undefined;
}

export async function completeOnboarding(userId: string): Promise<void> {
  const { error } = await supabase
    .from("profiles")
    .update({ onboarding_completed: true })
    .eq("id", userId);
  if (error) throw error;
}

export async function updateProfile(userId: string, patch: Partial<Pick<User, "name" | "avatar">>): Promise<void> {
  const { error } = await supabase.from("profiles").update(patch).eq("id", userId);
  if (error) throw error;
}

// ----- Student profile -----

function mapStudentProfile(row: Row<"student_profiles">, experiences: Experience[]): StudentProfile {
  return {
    userId: row.user_id,
    cpf: row.cpf,
    phone: row.phone ?? "",
    birthDate: row.birth_date ?? "",
    photo: row.photo ?? "",
    university: row.university ?? "",
    course: row.course ?? "",
    semester: row.semester ?? "",
    cr: row.cr ?? 0,
    registration: row.registration ?? "",
    skills: row.skills,
    languages: row.languages,
    bio: row.bio ?? "",
    linkedin: row.linkedin ?? undefined,
    experiences,
    isScholarshipHolder: row.is_scholarship_holder,
    scholarshipType: row.scholarship_type ?? undefined,
  };
}

function mapExperience(row: Row<"experiences">): Experience {
  return {
    id: row.id,
    title: row.title,
    location: row.location ?? "",
    startDate: row.start_date ?? "",
    endDate: row.end_date ?? undefined,
    description: row.description ?? "",
  };
}

export async function getStudentProfile(userId: string): Promise<StudentProfile | undefined> {
  const [{ data: profile, error: profileError }, { data: experiences, error: expError }] = await Promise.all([
    supabase.from("student_profiles").select("*").eq("user_id", userId).maybeSingle(),
    supabase.from("experiences").select("*").eq("student_user_id", userId).order("start_date", { ascending: false }),
  ]);
  if (profileError) throw profileError;
  if (expError) throw expError;
  if (!profile) return undefined;
  return mapStudentProfile(profile, (experiences ?? []).map(mapExperience));
}

export async function upsertStudentProfile(profile: StudentProfile): Promise<StudentProfile> {
  const { experiences, userId, ...rest } = profile;

  const { error: upsertError } = await supabase.from("student_profiles").upsert({
    user_id: userId,
    cpf: rest.cpf,
    phone: rest.phone,
    birth_date: rest.birthDate || null,
    photo: rest.photo,
    university: rest.university,
    course: rest.course,
    semester: rest.semester,
    cr: rest.cr,
    registration: rest.registration,
    skills: rest.skills,
    languages: rest.languages,
    bio: rest.bio,
    linkedin: rest.linkedin ?? null,
    is_scholarship_holder: rest.isScholarshipHolder,
    scholarship_type: rest.scholarshipType ?? null,
    updated_at: new Date().toISOString(),
  });
  if (upsertError) throwFriendly(upsertError);

  const { error: deleteError } = await supabase.from("experiences").delete().eq("student_user_id", userId);
  if (deleteError) throw deleteError;

  if (experiences.length > 0) {
    const { error: insertError } = await supabase.from("experiences").insert(
      experiences.map((exp) => ({
        student_user_id: userId,
        title: exp.title,
        location: exp.location,
        start_date: exp.startDate || null,
        end_date: exp.endDate || null,
        description: exp.description,
      }))
    );
    if (insertError) throw insertError;
  }

  return profile;
}

export async function isCpfRegistered(cpf: string, excludeUserId?: string): Promise<boolean> {
  const { data, error } = await supabase.rpc("is_cpf_taken", {
    check_cpf: cpf,
    exclude_user: excludeUserId ?? null,
  });
  if (error) throw error;
  return Boolean(data);
}

// ----- Offerer profile -----

function mapOffererProfile(row: Row<"offerer_profiles">): OffererProfile {
  return {
    userId: row.user_id,
    roleTitle: row.role_title as OffererProfile["roleTitle"],
    university: row.university ?? "",
    department: row.department ?? "",
    siape: row.siape ?? "",
    unitName: row.unit_name ?? "",
    unitLogo: row.unit_logo ?? undefined,
    unitDescription: row.unit_description ?? "",
    contactEmail: row.contact_email ?? "",
    contactPhone: row.contact_phone ?? "",
    departmentUrl: row.department_url ?? undefined,
    areaOfExpertise: row.area_of_expertise ?? undefined,
    bio: row.bio ?? undefined,
  };
}

export async function getOffererProfile(userId: string): Promise<OffererProfile | undefined> {
  const { data, error } = await supabase.from("offerer_profiles").select("*").eq("user_id", userId).maybeSingle();
  if (error) throw error;
  return data ? mapOffererProfile(data) : undefined;
}

export async function upsertOffererProfile(profile: OffererProfile): Promise<OffererProfile> {
  const { userId, ...rest } = profile;
  const { error } = await supabase.from("offerer_profiles").upsert({
    user_id: userId,
    role_title: rest.roleTitle,
    university: rest.university,
    department: rest.department,
    siape: rest.siape,
    unit_name: rest.unitName,
    unit_logo: rest.unitLogo ?? null,
    unit_description: rest.unitDescription,
    contact_email: rest.contactEmail,
    contact_phone: rest.contactPhone,
    department_url: rest.departmentUrl ?? null,
    area_of_expertise: rest.areaOfExpertise ?? null,
    bio: rest.bio ?? null,
    updated_at: new Date().toISOString(),
  });
  if (error) throw error;
  return profile;
}

// ----- Opportunities -----
//
// FUTURE REQUIREMENT (not implemented — pilot phase is PUC-Rio only):
// getOpportunities should eventually filter by the requesting student's university,
// so PUC-Rio vagas only show to PUC-Rio students, UFRJ vagas only to UFRJ students, etc.

export interface OpportunityFilters {
  search?: string;
  category?: string;
  university?: string;
  minPay?: number;
  knowledgeAreas?: string[];
  sort?: "recent" | "pay-desc" | "deadline";
}

function mapOpportunity(row: Row<"opportunities">): Opportunity {
  return {
    id: row.id,
    title: row.title,
    knowledgeArea: row.knowledge_area as Opportunity["knowledgeArea"],
    category: row.category as Opportunity["category"],
    image: row.image ?? "",
    description: row.description ?? "",
    workload: row.workload ?? "",
    payRate: Number(row.pay_rate),
    payType: row.pay_type,
    startDate: row.start_date ?? "",
    applicationDeadline: row.application_deadline ?? "",
    requiredSkills: row.required_skills,
    minCR: row.min_cr ?? undefined,
    requiredCourse: row.required_course ?? undefined,
    requiredSemester: row.required_semester ?? undefined,
    otherNotes: row.other_notes ?? undefined,
    status: row.status,
    isNew: row.is_new,
    isUrgent: row.is_urgent,
    offererId: row.offerer_id,
    offererName: row.offerer_name,
    university: row.university,
    createdAt: row.created_at,
  };
}

function opportunityToRow(input: Omit<Opportunity, "id" | "createdAt">): Database["public"]["Tables"]["opportunities"]["Insert"] {
  return {
    title: input.title,
    knowledge_area: input.knowledgeArea,
    category: input.category,
    image: input.image || null,
    description: input.description,
    workload: input.workload,
    pay_rate: input.payRate,
    pay_type: input.payType,
    start_date: input.startDate || null,
    application_deadline: input.applicationDeadline || null,
    required_skills: input.requiredSkills,
    min_cr: input.minCR ?? null,
    required_course: input.requiredCourse ?? null,
    required_semester: input.requiredSemester ?? null,
    other_notes: input.otherNotes ?? null,
    status: input.status,
    is_new: input.isNew,
    is_urgent: input.isUrgent,
    offerer_id: input.offererId,
    offerer_name: input.offererName,
    university: input.university,
  };
}

export async function getOpportunities(filters: OpportunityFilters = {}): Promise<Opportunity[]> {
  let query = supabase.from("opportunities").select("*").in("status", ["active", "closed"]);

  if (filters.search) query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
  if (filters.category) query = query.eq("category", filters.category);
  if (filters.university) query = query.eq("university", filters.university);
  if (filters.minPay) query = query.gte("pay_rate", filters.minPay);
  if (filters.knowledgeAreas?.length) query = query.in("knowledge_area", filters.knowledgeAreas);

  if (filters.sort === "pay-desc") query = query.order("pay_rate", { ascending: false });
  else if (filters.sort === "deadline") query = query.order("application_deadline", { ascending: true });
  else query = query.order("created_at", { ascending: false });

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []).map(mapOpportunity);
}

export async function getOpportunityById(id: string): Promise<Opportunity | undefined> {
  const { data, error } = await supabase.from("opportunities").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data ? mapOpportunity(data) : undefined;
}

export async function getOpportunitiesByOfferer(offererId: string): Promise<Opportunity[]> {
  const { data, error } = await supabase
    .from("opportunities")
    .select("*")
    .eq("offerer_id", offererId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map(mapOpportunity);
}

export async function createOpportunity(input: Omit<Opportunity, "id" | "createdAt">): Promise<Opportunity> {
  const { data, error } = await supabase.from("opportunities").insert(opportunityToRow(input)).select().single();
  if (error) throw error;
  return mapOpportunity(data);
}

export async function updateOpportunity(id: string, patch: Partial<Opportunity>): Promise<Opportunity | undefined> {
  const row: Database["public"]["Tables"]["opportunities"]["Update"] = {};
  if (patch.title !== undefined) row.title = patch.title;
  if (patch.knowledgeArea !== undefined) row.knowledge_area = patch.knowledgeArea;
  if (patch.category !== undefined) row.category = patch.category;
  if (patch.image !== undefined) row.image = patch.image;
  if (patch.description !== undefined) row.description = patch.description;
  if (patch.workload !== undefined) row.workload = patch.workload;
  if (patch.payRate !== undefined) row.pay_rate = patch.payRate;
  if (patch.payType !== undefined) row.pay_type = patch.payType;
  if (patch.startDate !== undefined) row.start_date = patch.startDate;
  if (patch.applicationDeadline !== undefined) row.application_deadline = patch.applicationDeadline;
  if (patch.requiredSkills !== undefined) row.required_skills = patch.requiredSkills;
  if (patch.minCR !== undefined) row.min_cr = patch.minCR;
  if (patch.requiredCourse !== undefined) row.required_course = patch.requiredCourse;
  if (patch.requiredSemester !== undefined) row.required_semester = patch.requiredSemester;
  if (patch.otherNotes !== undefined) row.other_notes = patch.otherNotes;
  if (patch.status !== undefined) row.status = patch.status;
  if (patch.isNew !== undefined) row.is_new = patch.isNew;
  if (patch.isUrgent !== undefined) row.is_urgent = patch.isUrgent;

  const { data, error } = await supabase.from("opportunities").update(row).eq("id", id).select().maybeSingle();
  if (error) throw error;
  return data ? mapOpportunity(data) : undefined;
}

export async function setOpportunityStatus(id: string, status: Opportunity["status"]): Promise<void> {
  const { error } = await supabase.from("opportunities").update({ status }).eq("id", id);
  if (error) throw error;
}

export async function getApplicationCountsByOfferer(offererId: string): Promise<Record<string, number>> {
  const { data, error } = await supabase
    .from("applications")
    .select("opportunity_id, opportunities!inner(offerer_id)")
    .eq("opportunities.offerer_id", offererId);
  if (error) throw error;
  const counts: Record<string, number> = {};
  for (const row of data ?? []) {
    counts[row.opportunity_id] = (counts[row.opportunity_id] ?? 0) + 1;
  }
  return counts;
}

// ----- Applications -----

function mapApplication(row: Row<"applications">): Application {
  return {
    id: row.id,
    opportunityId: row.opportunity_id,
    studentId: row.student_id,
    status: row.status,
    appliedAt: row.applied_at,
    timeline: row.timeline,
  };
}

export async function getApplicationsByStudent(studentId: string): Promise<Application[]> {
  const { data, error } = await supabase
    .from("applications")
    .select("*")
    .eq("student_id", studentId)
    .order("applied_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map(mapApplication);
}

export async function getApplicationById(id: string): Promise<Application | undefined> {
  const { data, error } = await supabase.from("applications").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data ? mapApplication(data) : undefined;
}

export async function getApplicationForStudentAndOpportunity(
  studentId: string,
  opportunityId: string
): Promise<Application | undefined> {
  const { data, error } = await supabase
    .from("applications")
    .select("*")
    .eq("student_id", studentId)
    .eq("opportunity_id", opportunityId)
    .maybeSingle();
  if (error) throw error;
  return data ? mapApplication(data) : undefined;
}

export async function applyToOpportunity(opportunityId: string, studentId: string): Promise<Application> {
  const now = new Date().toISOString();
  const { data, error } = await supabase
    .from("applications")
    .insert({
      opportunity_id: opportunityId,
      student_id: studentId,
      status: "pending",
      applied_at: now,
      timeline: [{ status: "submitted", date: now }],
    })
    .select()
    .single();
  if (error) throw error;
  return mapApplication(data);
}

export async function getApplicationsForOpportunity(opportunityId: string): Promise<Application[]> {
  const { data, error } = await supabase.from("applications").select("*").eq("opportunity_id", opportunityId);
  if (error) throw error;
  return (data ?? []).map(mapApplication);
}

export async function getApplicationsForOfferer(offererId: string): Promise<Application[]> {
  const { data, error } = await supabase
    .from("applications")
    .select("*, opportunities!inner(offerer_id)")
    .eq("opportunities.offerer_id", offererId);
  if (error) throw error;
  return (data ?? []).map(mapApplication);
}

export async function updateApplicationStatus(
  applicationId: string,
  status: ApplicationStatus
): Promise<Application | undefined> {
  const { data: current, error: fetchError } = await supabase
    .from("applications")
    .select("timeline")
    .eq("id", applicationId)
    .maybeSingle();
  if (fetchError) throw fetchError;
  if (!current) return undefined;

  const timeline = [...current.timeline, { status, date: new Date().toISOString() }];
  const { data, error } = await supabase
    .from("applications")
    .update({ status, timeline })
    .eq("id", applicationId)
    .select()
    .maybeSingle();
  if (error) throw error;
  return data ? mapApplication(data) : undefined;
}

// ----- Notifications -----

function mapNotification(row: Row<"notifications">): Notification {
  return {
    id: row.id,
    userId: row.user_id,
    title: row.title,
    message: row.message,
    read: row.read,
    createdAt: row.created_at,
    link: row.link ?? undefined,
  };
}

export async function getNotifications(userId: string): Promise<Notification[]> {
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map(mapNotification);
}

export async function markNotificationRead(id: string): Promise<void> {
  const { error } = await supabase.from("notifications").update({ read: true }).eq("id", id);
  if (error) throw error;
}

export async function markAllNotificationsRead(userId: string): Promise<void> {
  const { error } = await supabase.from("notifications").update({ read: true }).eq("user_id", userId).eq("read", false);
  if (error) throw error;
}

// ----- Stats -----

export async function getOffererStats(offererId: string) {
  const [{ count: activeOpportunities }, applicationsResult] = await Promise.all([
    supabase
      .from("opportunities")
      .select("*", { count: "exact", head: true })
      .eq("offerer_id", offererId)
      .eq("status", "active"),
    supabase.from("applications").select("status, opportunities!inner(offerer_id)").eq("opportunities.offerer_id", offererId),
  ]);
  if (applicationsResult.error) throw applicationsResult.error;

  const apps = applicationsResult.data ?? [];
  return {
    activeOpportunities: activeOpportunities ?? 0,
    totalApplications: apps.length,
    pendingReview: apps.filter((a) => a.status === "pending").length,
    approved: apps.filter((a) => a.status === "approved").length,
  };
}
