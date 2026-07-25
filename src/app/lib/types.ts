export type UserRole = "student" | "offerer";

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  avatar: string;
  onboardingCompleted: boolean;
}

export interface Experience {
  id: string;
  title: string;
  location: string;
  startDate: string;
  endDate?: string;
  description: string;
}

export interface StudentProfile {
  userId: string;
  cpf: string;
  phone: string;
  birthDate: string;
  photo: string;
  university: string;
  course: string;
  semester: string;
  cr: number;
  registration: string;
  skills: string[];
  languages: { language: string; level: string }[];
  bio: string;
  linkedin?: string;
  experiences: Experience[];
  isScholarshipHolder: boolean;
  scholarshipType?: string;
}

export type OffererRoleTitle =
  | "Professor"
  | "Coordenador"
  | "Pesquisador"
  | "Técnico Administrativo";

export interface OffererProfile {
  userId: string;
  roleTitle: OffererRoleTitle;
  university: string;
  department: string;
  siape: string;
  unitName: string;
  unitLogo?: string;
  unitDescription: string;
  contactEmail: string;
  contactPhone: string;
  departmentUrl?: string;
  areaOfExpertise?: string;
  bio?: string;
}

export type OpportunityCategory =
  | "Monitoria"
  | "Iniciação Científica"
  | "Eventos"
  | "Laboratórios";

export type KnowledgeArea = "Ciências Exatas" | "Ciências Humanas" | "Biológicas & Saúde";

export type OpportunityStatus = "active" | "draft" | "closed";

export type PayType = "hour" | "month";

export interface SkillRequirement {
  skill: string;
  mandatory: boolean;
}

export interface Opportunity {
  id: string;
  title: string;
  knowledgeArea: KnowledgeArea;
  category: OpportunityCategory;
  image: string;
  description: string;
  workload: string;
  payRate: number;
  payType: PayType;
  startDate: string;
  applicationDeadline: string;
  requiredSkills: SkillRequirement[];
  minCR?: number;
  requiredCourse?: string;
  requiredSemester?: string;
  otherNotes?: string;
  status: OpportunityStatus;
  isNew: boolean;
  isUrgent: boolean;
  offererId: string;
  offererName: string;
  university: string;
  createdAt: string;
}

export type ApplicationStatus = "pending" | "approved" | "rejected";

export interface ApplicationTimelineEntry {
  status: ApplicationStatus | "submitted";
  date: string;
  note?: string;
}

export interface Application {
  id: string;
  opportunityId: string;
  studentId: string;
  status: ApplicationStatus;
  appliedAt: string;
  timeline: ApplicationTimelineEntry[];
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  link?: string;
}
