// Hand-authored to match supabase/migrations/*.sql. Once the project is linked, regenerate
// with `npx supabase gen types typescript --linked > src/app/lib/database.types.ts` and diff
// against this file instead of trusting it blindly.
//
// Shape follows what @supabase/supabase-js's generics require (Row/Insert/Update/Relationships
// per table, plus Functions for .rpc()) — omitting any of these collapses query types to `never`.

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          role: "student" | "offerer";
          name: string;
          avatar: string | null;
          onboarding_completed: boolean;
          created_at: string;
        };
        Insert: never;
        Update: Partial<{
          name: string;
          avatar: string | null;
          onboarding_completed: boolean;
        }>;
        Relationships: [];
      };
      student_profiles: {
        Row: {
          user_id: string;
          cpf: string;
          phone: string | null;
          birth_date: string | null;
          photo: string | null;
          university: string | null;
          course: string | null;
          semester: string | null;
          cr: number | null;
          registration: string | null;
          skills: string[];
          languages: { language: string; level: string }[];
          bio: string | null;
          linkedin: string | null;
          is_scholarship_holder: boolean;
          scholarship_type: string | null;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["student_profiles"]["Row"], "updated_at"> & {
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["student_profiles"]["Insert"]>;
        Relationships: [];
      };
      experiences: {
        Row: {
          id: string;
          student_user_id: string;
          title: string;
          location: string | null;
          start_date: string | null;
          end_date: string | null;
          description: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["experiences"]["Row"], "id" | "created_at"> & {
          id?: string;
        };
        Update: Partial<Database["public"]["Tables"]["experiences"]["Insert"]>;
        Relationships: [];
      };
      offerer_profiles: {
        Row: {
          user_id: string;
          role_title: string;
          university: string | null;
          department: string | null;
          siape: string | null;
          unit_name: string | null;
          unit_logo: string | null;
          unit_description: string | null;
          contact_email: string | null;
          contact_phone: string | null;
          department_url: string | null;
          area_of_expertise: string | null;
          bio: string | null;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["offerer_profiles"]["Row"], "updated_at"> & {
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["offerer_profiles"]["Insert"]>;
        Relationships: [];
      };
      opportunities: {
        Row: {
          id: string;
          title: string;
          knowledge_area: string;
          category: string;
          image: string | null;
          description: string | null;
          workload: string | null;
          pay_rate: number;
          pay_type: "hour" | "month";
          start_date: string | null;
          application_deadline: string | null;
          required_skills: { skill: string; mandatory: boolean }[];
          min_cr: number | null;
          required_course: string | null;
          required_semester: string | null;
          other_notes: string | null;
          status: "active" | "draft" | "closed";
          is_new: boolean;
          is_urgent: boolean;
          offerer_id: string;
          offerer_name: string;
          university: string;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["opportunities"]["Row"], "id" | "created_at"> & {
          id?: string;
        };
        Update: Partial<Database["public"]["Tables"]["opportunities"]["Insert"]>;
        Relationships: [
          {
            foreignKeyName: "opportunities_offerer_id_fkey";
            columns: ["offerer_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      applications: {
        Row: {
          id: string;
          opportunity_id: string;
          student_id: string;
          status: "pending" | "approved" | "rejected";
          applied_at: string;
          timeline: { status: "pending" | "approved" | "rejected" | "submitted"; date: string; note?: string }[];
        };
        Insert: Omit<Database["public"]["Tables"]["applications"]["Row"], "id" | "applied_at"> & {
          id?: string;
          applied_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["applications"]["Insert"]>;
        Relationships: [
          {
            foreignKeyName: "applications_opportunity_id_fkey";
            columns: ["opportunity_id"];
            isOneToOne: false;
            referencedRelation: "opportunities";
            referencedColumns: ["id"];
          }
        ];
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          message: string;
          read: boolean;
          created_at: string;
          link: string | null;
        };
        Insert: never;
        Update: Partial<{ read: boolean }>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      is_cpf_taken: {
        Args: { check_cpf: string; exclude_user: string | null };
        Returns: boolean;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
