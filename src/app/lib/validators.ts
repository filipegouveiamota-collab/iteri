const STUDENT_EMAIL_REGEX = /^[^\s@]+@aluno\.puc-rio\.br$/i;
const OFFERER_EMAIL_REGEX = /^[^\s@]+@(?:[a-z0-9-]+\.)?puc-rio\.br$/i;

// Pilot phase: PUC-Rio only. Students must use the @aluno.puc-rio.br subdomain;
// offerers (faculty/staff) use @puc-rio.br or a department subdomain (@inf.puc-rio.br, @iag.puc-rio.br, ...),
// explicitly excluding the student subdomain.
export function isStudentEmail(email: string): boolean {
  return STUDENT_EMAIL_REGEX.test(email.trim());
}

export function isOffererEmail(email: string): boolean {
  const lower = email.trim().toLowerCase();
  if (lower.endsWith("@aluno.puc-rio.br")) return false;
  return OFFERER_EMAIL_REGEX.test(lower);
}

export function isValidCR(value: number): boolean {
  return value >= 0 && value <= 10;
}

export function isValidCPF(value: string): boolean {
  return /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/.test(value.trim());
}

export function passwordsMatch(password: string, confirmation: string): boolean {
  return password.length >= 8 && password === confirmation;
}
