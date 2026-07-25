import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { KeyRound, Mail } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { passwordsMatch } from "../../lib/validators";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

interface RequestForm {
  email: string;
}

interface ResetForm {
  code: string;
  newPassword: string;
  confirmNewPassword: string;
}

export default function ForgotPasswordPage() {
  const { requestPasswordReset, confirmPasswordReset } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState<"request" | "reset">("request");
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);
  const [resending, setResending] = useState(false);

  const requestForm = useForm<RequestForm>();
  const resetForm = useForm<ResetForm>();

  const onRequestSubmit = async (data: RequestForm) => {
    try {
      await requestPasswordReset(data.email);
      setPendingEmail(data.email);
      setStep("reset");
      toast.info("Se este e-mail estiver cadastrado, enviamos um código de redefinição.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Não foi possível enviar o código.");
    }
  };

  const onResetSubmit = async (data: ResetForm) => {
    if (!pendingEmail) return;
    try {
      await confirmPasswordReset(pendingEmail, data.code.trim(), data.newPassword);
      toast.success("Senha redefinida com sucesso!");
      navigate("/");
    } catch (err) {
      resetForm.setError("code", {
        message: err instanceof Error ? err.message : "Não foi possível redefinir sua senha.",
      });
    }
  };

  const handleResend = async () => {
    if (!pendingEmail) return;
    setResending(true);
    try {
      await requestPasswordReset(pendingEmail);
      toast.info("Reenviamos o código de redefinição.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Não foi possível reenviar o código.");
    } finally {
      setResending(false);
    }
  };

  if (step === "reset" && pendingEmail) {
    return (
      <div className="max-w-md mx-auto px-6 py-24 flex flex-col items-center gap-4">
        <div className="flex items-center justify-center size-16 rounded-full bg-teal-50 text-teal-500">
          <KeyRound className="size-8" strokeWidth={2} />
        </div>
        <h1 className="text-[#111827] text-center">Redefinir senha</h1>
        <p className="text-[#6b7280] text-center">
          Enviamos um código de redefinição para <strong>{pendingEmail}</strong>. Digite-o abaixo
          junto com sua nova senha.
        </p>

        <form onSubmit={resetForm.handleSubmit(onResetSubmit)} className="w-full flex flex-col gap-5">
          <div className="flex flex-col gap-2 text-left">
            <Label htmlFor="code">Código de redefinição</Label>
            <Input
              id="code"
              inputMode="numeric"
              maxLength={10}
              placeholder="00000000"
              className="text-center text-lg tracking-[0.3em]"
              {...resetForm.register("code", { required: "Informe o código" })}
            />
            {resetForm.formState.errors.code && (
              <p className="text-sm text-destructive">{resetForm.formState.errors.code.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2 text-left">
            <Label htmlFor="newPassword">Nova senha</Label>
            <Input
              id="newPassword"
              type="password"
              {...resetForm.register("newPassword", { required: "Informe uma nova senha" })}
            />
            {resetForm.formState.errors.newPassword && (
              <p className="text-sm text-destructive">{resetForm.formState.errors.newPassword.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2 text-left">
            <Label htmlFor="confirmNewPassword">Confirmar nova senha</Label>
            <Input
              id="confirmNewPassword"
              type="password"
              {...resetForm.register("confirmNewPassword", {
                required: "Confirme sua nova senha",
                validate: (v, formValues) =>
                  passwordsMatch(formValues.newPassword, v) || "As senhas não coincidem (mín. 8 caracteres)",
              })}
            />
            {resetForm.formState.errors.confirmNewPassword && (
              <p className="text-sm text-destructive">{resetForm.formState.errors.confirmNewPassword.message}</p>
            )}
          </div>

          <Button size="lg" className="w-full" type="submit" disabled={resetForm.formState.isSubmitting}>
            {resetForm.formState.isSubmitting ? "Redefinindo..." : "Redefinir senha"}
          </Button>
        </form>

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
    <div className="max-w-md mx-auto px-6 py-24 flex flex-col items-center gap-4">
      <div className="flex items-center justify-center size-16 rounded-full bg-teal-50 text-teal-500">
        <Mail className="size-8" strokeWidth={2} />
      </div>
      <h1 className="text-[#111827] text-center">Esqueceu sua senha?</h1>
      <p className="text-[#6b7280] text-center">
        Informe seu e-mail institucional e enviaremos um código para redefinir sua senha.
      </p>

      <form onSubmit={requestForm.handleSubmit(onRequestSubmit)} className="w-full flex flex-col gap-5">
        <div className="flex flex-col gap-2 text-left">
          <Label htmlFor="email">E-mail institucional</Label>
          <Input
            id="email"
            type="email"
            placeholder="voce@aluno.puc-rio.br"
            {...requestForm.register("email", { required: "Informe seu e-mail" })}
          />
          {requestForm.formState.errors.email && (
            <p className="text-sm text-destructive">{requestForm.formState.errors.email.message}</p>
          )}
        </div>

        <Button size="lg" className="w-full" type="submit" disabled={requestForm.formState.isSubmitting}>
          {requestForm.formState.isSubmitting ? "Enviando..." : "Enviar código"}
        </Button>
      </form>

      <p className="text-sm text-[#6b7280]">
        Lembrou sua senha?{" "}
        <Link to="/login" className="text-teal-500 font-medium hover:underline">
          Entrar
        </Link>
      </p>
    </div>
  );
}
