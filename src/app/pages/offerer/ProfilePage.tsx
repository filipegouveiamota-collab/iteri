import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useAuth } from "../../contexts/AuthContext";
import * as api from "../../lib/api";
import { UNIVERSITIES } from "../../lib/constants";
import type { OffererProfile } from "../../lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";

type ProfileDraft = Omit<OffererProfile, "userId">;

const EMPTY_PROFILE: ProfileDraft = {
  roleTitle: "Professor",
  university: "",
  department: "",
  siape: "",
  unitName: "",
  unitLogo: "",
  unitDescription: "",
  contactEmail: "",
  contactPhone: "",
  departmentUrl: "",
  areaOfExpertise: "",
  bio: "",
};

export default function OffererProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileDraft>(EMPTY_PROFILE);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    api.getOffererProfile(user.id).then((existing) => {
      if (existing) {
        const { userId, ...rest } = existing;
        setProfile({ ...EMPTY_PROFILE, ...rest });
      }
      setLoading(false);
    });
  }, [user]);

  const set = <K extends keyof ProfileDraft>(key: K, value: ProfileDraft[K]) =>
    setProfile((prev) => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      await api.upsertOffererProfile({ ...profile, userId: user.id });
      toast.success("Perfil atualizado com sucesso!");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="max-w-2xl mx-auto px-6 py-10 text-[#6b7280]">Carregando perfil...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-10 flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <Avatar className="size-16">
          <AvatarImage src={user?.avatar} alt={user?.name} />
          <AvatarFallback>{user?.name?.[0] ?? "U"}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h1 className="text-[#111827]">{user?.name}</h1>
          <p className="text-[#6b7280]">{profile.roleTitle} · {profile.university}</p>
        </div>
        <Button
          variant="outline"
          onClick={() => {
            logout();
            navigate("/");
          }}
        >
          Sair
        </Button>
      </div>

      <section className="rounded-2xl border border-[#e5e7eb] bg-white p-6 flex flex-col gap-5">
        <h3 className="text-[#1f2937]">Perfil Institucional</h3>
        <div className="flex flex-col gap-2">
          <Label>Universidade</Label>
          <Select value={profile.university} onValueChange={(v) => set("university", v)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              {UNIVERSITIES.map((u) => (
                <SelectItem key={u} value={u}>
                  {u}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="department">Nome da unidade/departamento</Label>
          <Input id="department" value={profile.department} onChange={(e) => set("department", e.target.value)} />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="areaOfExpertise">Área de atuação</Label>
          <Input
            id="areaOfExpertise"
            value={profile.areaOfExpertise ?? ""}
            onChange={(e) => set("areaOfExpertise", e.target.value)}
            placeholder="Ex: Inteligência Artificial, Bioquímica..."
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="bio">Bio (opcional)</Label>
          <Textarea id="bio" rows={4} value={profile.bio ?? ""} onChange={(e) => set("bio", e.target.value)} />
        </div>
      </section>

      <section className="rounded-2xl border border-[#e5e7eb] bg-white p-6 flex flex-col gap-5">
        <h3 className="text-[#1f2937]">Contato</h3>
        <div className="flex flex-col gap-2">
          <Label htmlFor="contactEmail">E-mail de contato</Label>
          <Input id="contactEmail" type="email" value={profile.contactEmail} onChange={(e) => set("contactEmail", e.target.value)} />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="contactPhone">Telefone</Label>
          <Input id="contactPhone" value={profile.contactPhone} onChange={(e) => set("contactPhone", e.target.value)} />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="departmentUrl">URL do departamento (opcional)</Label>
          <Input id="departmentUrl" value={profile.departmentUrl ?? ""} onChange={(e) => set("departmentUrl", e.target.value)} />
        </div>
      </section>

      <div className="flex justify-end">
        <Button size="lg" onClick={handleSave} disabled={saving}>
          {saving ? "Salvando..." : "Salvar alterações"}
        </Button>
      </div>
    </div>
  );
}
