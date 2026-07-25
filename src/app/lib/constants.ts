import type { KnowledgeArea, OffererRoleTitle, OpportunityCategory } from "./types";

export const OPPORTUNITY_CATEGORIES: OpportunityCategory[] = [
  "Monitoria",
  "Iniciação Científica",
  "Eventos",
  "Laboratórios",
];

export const KNOWLEDGE_AREAS: KnowledgeArea[] = [
  "Ciências Exatas",
  "Ciências Humanas",
  "Biológicas & Saúde",
];

export const DEFAULT_KNOWLEDGE_AREA_BY_CATEGORY: Record<OpportunityCategory, KnowledgeArea> = {
  Monitoria: "Ciências Exatas",
  "Iniciação Científica": "Ciências Exatas",
  Eventos: "Ciências Humanas",
  Laboratórios: "Ciências Exatas",
};

export const CATEGORY_STYLES: Record<
  OpportunityCategory,
  { bg: string; fg: string; border: string; label: string }
> = {
  Monitoria: { bg: "bg-teal-50", fg: "text-teal-700", border: "border-teal-300", label: "Monitoria" },
  "Iniciação Científica": {
    bg: "bg-coral-50",
    fg: "text-coral-700",
    border: "border-coral-300",
    label: "Iniciação Científica",
  },
  Eventos: { bg: "bg-amber-50", fg: "text-amber-700", border: "border-amber-300", label: "Eventos" },
  Laboratórios: { bg: "bg-purple-50", fg: "text-purple-500", border: "border-purple-500", label: "Laboratórios" },
};

export const OFFERER_ROLE_TITLES: OffererRoleTitle[] = [
  "Professor",
  "Coordenador",
  "Pesquisador",
  "Técnico Administrativo",
];

export const UNIVERSITIES = [
  "UNICAMP",
  "USP",
  "UFRJ",
  "UFMG",
  "UFRGS",
  "UFSC",
  "PUC-Rio",
  "UnB",
];

export const SKILLS = [
  "React",
  "Python",
  "Excel",
  "Estatística",
  "Redação Científica",
  "Design Gráfico",
  "Gestão de Projetos",
  "Atendimento ao Público",
  "Edição de Vídeo",
  "Inglês Técnico",
  "SQL",
  "Docência",
];

export const LANGUAGE_LEVELS = ["Básico", "Intermediário", "Avançado", "Fluente", "Nativo"];

export const SCHOLARSHIP_TYPES = ["CNPq", "CAPES", "FAPERJ", "PIBIC", "Outra"];

export const PAY_TYPE_LABELS: Record<string, string> = {
  hour: "R$/hora",
  month: "R$/mês",
};

export const CATEGORY_ACTIVITIES: Record<OpportunityCategory, string[]> = {
  Monitoria: [
    "Conduzir plantões de dúvida semanais",
    "Auxiliar na correção de provas e listas",
    "Preparar material de apoio",
    "Participar de reuniões com o orientador",
  ],
  "Iniciação Científica": [
    "Executar experimentos e coleta de dados",
    "Revisar literatura científica",
    "Auxiliar na redação de artigos",
    "Participar de reuniões de orientação",
  ],
  Eventos: [
    "Apoiar credenciamento e recepção",
    "Orientar participantes durante o evento",
    "Auxiliar na montagem e desmontagem da estrutura",
    "Dar suporte às palestras e oficinas",
  ],
  Laboratórios: [
    "Organizar e manter equipamentos",
    "Preparar materiais e amostras",
    "Apoiar usuários do laboratório",
    "Zelar pelas normas de segurança",
  ],
};

export const CATEGORY_BENEFITS: Record<OpportunityCategory, string[]> = {
  Monitoria: [
    "Certificado oficial de monitoria",
    "Horas complementares acadêmicas",
    "Experiência prática em ensino",
    "Carta de recomendação ao final",
  ],
  "Iniciação Científica": [
    "Certificado de iniciação científica",
    "Possibilidade de coautoria em publicações",
    "Horas complementares acadêmicas",
    "Carta de recomendação ao final",
  ],
  Eventos: [
    "Certificado de participação",
    "Horas complementares acadêmicas",
    "Networking com a comunidade acadêmica",
    "Experiência em organização de eventos",
  ],
  Laboratórios: [
    "Certificado oficial de atividade técnica",
    "Horas complementares acadêmicas",
    "Experiência prática em laboratório",
    "Carta de recomendação ao final",
  ],
};

export const APPLICATION_STATUS_LABELS: Record<string, string> = {
  pending: "Em Análise",
  approved: "Aprovado",
  rejected: "Rejeitado",
  submitted: "Enviada",
};
