import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { Mail, ShieldCheck } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { isStudentEmail, passwordsMatch } from "../../lib/validators";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterStudentPage() {
  const { registerStudent, verifyOtp, resendCode } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState<"form" | "verify">("form");
  const [serverError, setServerError] = useState<string | null>(null);
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);
  const [codeInput, setCodeInput] = useState("");
  const [codeError, setCodeError] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>();

  const onSubmit = async (data: RegisterForm) => {
    setServerError(null);
    try {
      await registerStudent({ email: data.email, name: data.name, password: data.password });
      toast.info("Enviamos um código de confirmação para o seu e-mail.");
      setPendingEmail(data.email);
      setCodeInput("");
      setCodeError(null);
      setStep("verify");
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Não foi possível criar a conta.");
    }
  };

  const handleVerify = async () => {
    if (!pendingEmail) return;
    setVerifying(true);
    try {
      await verifyOtp(pendingEmail, codeInput.trim());
      toast.success("E-mail confirmado! Bem-vindo(a) à ITERI.");
      navigate("/student/onboarding");
    } catch (err) {
      setCodeError(err instanceof Error ? err.message : "Não foi possível confirmar sua conta.");
    } finally {
      setVerifying(false);
    }
  };

  const handleResend = async () => {
    if (!pendingEmail) return;
    setResending(true);
    try {
      await resendCode(pendingEmail);
      toast.info("Reenviamos o código de confirmação.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Não foi possível reenviar o código.");
    } finally {
      setResending(false);
    }
  };

  if (step === "verify" && pendingEmail) {
    return (
      <div className="max-w-md mx-auto px-6 py-24 text-center flex flex-col items-center gap-4">
        <div className="flex items-center justify-center size-16 rounded-full bg-teal-50 text-teal-500">
          <Mail className="size-8" strokeWidth={2} />
        </div>
        <h1 className="text-[#111827]">Confirme seu e-mail</h1>
        <p className="text-[#6b7280]">
          Enviamos um código de confirmação para <strong>{pendingEmail}</strong>. Digite-o abaixo
          para ativar sua conta.
        </p>
        <div className="w-full flex flex-col gap-2 text-left">
          <Label htmlFor="code">Código de confirmação</Label>
          <Input
            id="code"
            inputMode="numeric"
            maxLength={10}
            placeholder="00000000"
            value={codeInput}
            onChange={(e) => {
              setCodeInput(e.target.value);
              setCodeError(null);
            }}
            className="text-center text-lg tracking-[0.3em]"
          />
          {codeError && <p className="text-sm text-destructive">{codeError}</p>}
        </div>
        <Button size="lg" className="w-full" onClick={handleVerify} disabled={verifying || codeInput.trim().length === 0}>
          <ShieldCheck className="size-4" />
          {verifying ? "Confirmando..." : "Confirmar código"}
        </Button>
        <button
          type="button"
          onClick={handleResend}
          disabled={resending}
          className="text-sm text-teal-500 hover:underline disabled:opacity-50"
        >
          {resending ? "Reenviando..." : "Reenviar código"}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-6 py-16">
      <h1 className="text-[#111827] mb-2">Criar conta de estudante</h1>
      <p className="text-[#6b7280] mb-8">
        Fase piloto: cadastro disponível apenas para alunos da PUC-Rio, com e-mail @aluno.puc-rio.br.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Nome completo</Label>
          <Input id="name" {...register("name", { required: "Informe seu nome" })} />
          {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="email">E-mail institucional</Label>
          <Input
            id="email"
            type="email"
            placeholder="voce@aluno.puc-rio.br"
            {...register("email", {
              required: "Informe seu e-mail",
              validate: (v) => isStudentEmail(v) || "Use seu e-mail institucional @aluno.puc-rio.br",
            })}
          />
          {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Senha</Label>
          <Input id="password" type="password" {...register("password", { required: "Informe uma senha" })} />
          {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="confirmPassword">Confirmar senha</Label>
          <Input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword", {
              required: "Confirme sua senha",
              validate: (v, formValues) =>
                passwordsMatch(formValues.password, v) || "As senhas não coincidem (mín. 8 caracteres)",
            })}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
          )}
        </div>

        {serverError && <p className="text-sm text-destructive">{serverError}</p>}

        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? "Enviando código..." : "Criar conta"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-[#6b7280]">
        Já tem conta?{" "}
        <Link to="/login" className="text-teal-500 font-medium hover:underline">
          Entrar
        </Link>
      </p>
    </div>
  );
}
