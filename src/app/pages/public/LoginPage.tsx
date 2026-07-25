import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [serverError, setServerError] = useState<string | null>(null);
  const redirect = searchParams.get("redirect");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    setServerError(null);
    try {
      const user = await login(data.email, data.password);
      toast.success(`Bem-vindo(a) de volta, ${user.name}!`);
      if (redirect) {
        navigate(redirect);
      } else if (!user.onboardingCompleted) {
        navigate(user.role === "student" ? "/student/onboarding" : "/offerer/onboarding");
      } else {
        navigate(user.role === "student" ? "/student/feed" : "/offerer/dashboard");
      }
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Não foi possível entrar.");
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-16">
      <h1 className="text-[#111827] mb-2">Entrar</h1>
      <p className="text-[#6b7280] mb-8">Acesse sua conta ITERI.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">E-mail institucional</Label>
          <Input
            id="email"
            type="email"
            placeholder="voce@universidade.edu.br"
            {...register("email", { required: "Informe seu e-mail" })}
          />
          {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Senha</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            {...register("password", { required: "Informe sua senha" })}
          />
          {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
        </div>

        {serverError && <p className="text-sm text-destructive">{serverError}</p>}

        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? "Entrando..." : "Entrar"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-[#6b7280]">
        Ainda não tem conta?{" "}
        <Link to="/register" className="text-teal-500 font-medium hover:underline">
          Criar conta
        </Link>
      </p>
    </div>
  );
}
