const BASE_PROMPT = `
Voce e um mentor senior de desenvolvimento de software, especialista em criar roadmaps tecnicos personalizados e acionaveis.

Contexto do projeto:
- Descricao: {projectDescription}
- Tecnologias: {technologies}
- Repositorio: {repoUrl}

Tarefa:
Crie um roadmap tecnico em 3 fases progressivas, realista, pratico e estritamente alinhado ao stack informado.

Formato obrigatorio da resposta:
- Responda somente em texto puro (sem JSON, sem markdown code block).
- Use exatamente os titulos abaixo:
Titulo do Roadmap: <titulo curto e objetivo>
Objetivo Final: <objetivo mensuravel>

Fase 1: Fundacao
- <tarefa 1 com acao concreta + tecnologia + resultado esperado>
- <tarefa 2 ...>

Fase 2: Desenvolvimento
- <tarefa 1 ...>
- <tarefa 2 ...>

Fase 3: Consolidacao
- <tarefa 1 ...>
- <tarefa 2 ...>

Dicas Gerais:
- <dica 1>
- <dica 2>

Proximos Passos:
- <passo 1>
- <passo 2>

Regras de qualidade:
- Cada fase deve ter entre 4 e 6 tarefas.
- Cada tarefa deve comecar com verbo de acao.
- Cada tarefa deve mencionar pelo menos uma tecnologia do stack informado.
- Evite generalidades; seja especifico para este projeto.
- Inclua quick wins na Fase 1.
- Foque em entregas verificaveis e evolucao progressiva de dificuldade.
- Ajuste a linguagem e profundidade ao nivel de aprendizagem: {learningComplexity}
`;

// ============================================================
// TIPOS
// ============================================================

export interface OpenRouterFreeModel {
  id: string;
  name: string;
  contextLength: number;
}

export interface RoadmapPayload {
  projectDescription: string;
  technologies: string[];
  repoUrl?: string;
  model?: string;
  learnerLevel?: 0 | 1 | 2;
}

// Tipagem da resposta parseada — adapte conforme sua UI crescer
export interface RoadmapTarefa {
  id: string;
  titulo: string;
  descricao: string;
  tecnologias_envolvidas: string[];
  dificuldade: 'Fácil' | 'Média' | 'Difícil';
  tempo_estimado: string;
  criterios_de_conclusao: string[];
  recursos_sugeridos: string[];
}

export interface RoadmapFase {
  id: number;
  nome: string;
  descricao: string;
  nivel: string;
  duracao_estimada: string;
  prerequisitos: string[];
  tarefas: RoadmapTarefa[];
  entregavel_da_fase: string;
}

export interface Roadmap {
  titulo: string;
  objetivo_final: string;
  fases: RoadmapFase[];
  dicas_gerais: string[];
  proximos_passos_apos_roadmap: string[];
}

// ============================================================
// CONSTANTES
// ============================================================

const DEFAULT_MODEL = 'qwen/qwen3-coder:free';
const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1';
const AVAILABILITY_CHECK_CHUNK_SIZE = 5;

// ============================================================
// HELPERS INTERNOS
// ============================================================

const getOpenRouterApiKey = (): string => {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY?.trim();

  if (!apiKey) {
    throw new Error(
      'VITE_OPENROUTER_API_KEY não encontrada. Defina essa variável em DevStudy-IA/.env e reinicie o servidor Vite.'
    );
  }

  return apiKey;
};

const buildHeaders = (apiKey: string): HeadersInit => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${apiKey}`,
  'HTTP-Referer': window.location.origin,
  'X-Title': 'DevStudy IA',
});

const extractApiErrorMessage = (data: any, status: number): string =>
  data?.error?.metadata?.raw ||
  data?.error?.message ||
  `HTTP ${status}`;

const isFreePrice = (value: string | undefined): boolean => {
  if (!value) return false;
  const numeric = Number(value);
  return Number.isFinite(numeric) && numeric === 0;
};

const stripMarkdownCodeBlock = (text: string): string =>
  text.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '').trim();

const getLearningComplexity = (level: 0 | 1 | 2): string => {
  if (level === 2) {
    return 'Avancado: linguagem tecnica, trade-offs de arquitetura, otimizacoes e boas praticas de escala.';
  }
  if (level === 1) {
    return 'Intermediario: linguagem clara com termos tecnicos, exemplos praticos e justificativas curtas.';
  }
  return 'Iniciante: linguagem simples, passos curtos, explicacao objetiva e sem jargoes desnecessarios.';
};

/**
 * Gera um roadmap via OpenRouter e retorna texto estruturado.
 */
export const generateRoadmapOpenRouter = async (
  payload: RoadmapPayload
): Promise<string> => {
  const apiKey = getOpenRouterApiKey();
  const model =
    payload.model ||
    import.meta.env.VITE_OPENROUTER_MODEL ||
    DEFAULT_MODEL;

  const prompt = BASE_PROMPT
    .replace('{projectDescription}', payload.projectDescription)
    .replace('{technologies}', payload.technologies.join(', '))
    .replace('{repoUrl}', payload.repoUrl ?? 'Nao disponivel')
    .replace('{learningComplexity}', getLearningComplexity(payload.learnerLevel ?? 0));

  const resp = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: buildHeaders(apiKey),
    body: JSON.stringify({
      model,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    }),
  });

  const data = await resp.json();

  if (!resp.ok) {
    throw new Error(`OpenRouter API error: ${extractApiErrorMessage(data, resp.status)}`);
  }

  const raw = data?.choices?.[0]?.message?.content;
  if (!raw) throw new Error('Resposta vazia da OpenRouter.');
  return stripMarkdownCodeBlock(raw);
};

// ============================================================
// LISTAGEM DE MODELOS
// ============================================================

/**
 * Busca todos os modelos gratuitos disponíveis na OpenRouter.
 */
export const listFreeOpenRouterModels = async (): Promise<OpenRouterFreeModel[]> => {
  const apiKey = getOpenRouterApiKey();

  const resp = await fetch(`${OPENROUTER_BASE_URL}/models`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });

  const data = await resp.json();

  if (!resp.ok) {
    throw new Error(
      `OpenRouter models API error: ${extractApiErrorMessage(data, resp.status)}`
    );
  }

  const models: any[] = Array.isArray(data?.data) ? data.data : [];

  const freeModels: OpenRouterFreeModel[] = models
    .filter((model) => {
      const { prompt, completion, request = '0' } = model?.pricing ?? {};
      return isFreePrice(prompt) && isFreePrice(completion) && isFreePrice(request);
    })
    .map((model) => ({
      id: String(model.id),
      name: String(model.name || model.id),
      contextLength: Number(model.context_length ?? 0),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  if (freeModels.length === 0) {
    throw new Error('Nenhum modelo free encontrado na OpenRouter agora.');
  }

  return freeModels;
};

// ============================================================
// VERIFICAÇÃO DE DISPONIBILIDADE
// ============================================================

/**
 * Verifica se um modelo específico está respondendo no momento.
 * Usa uma chamada mínima (1 token) para não gastar cota.
 */
export const isOpenRouterModelAvailable = async (modelId: string): Promise<boolean> => {
  const apiKey = getOpenRouterApiKey();

  const resp = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: buildHeaders(apiKey),
    body: JSON.stringify({
      model: modelId,
      messages: [{ role: 'user', content: 'ping' }],
      max_tokens: 1,
      temperature: 0,
    }),
  });

  if (resp.ok) return true;

  const data = await resp.json().catch(() => ({}));
  const message = String(
    data?.error?.metadata?.raw ?? data?.error?.message ?? ''
  ).toLowerCase();

  const isTemporarilyUnavailable =
    message.includes('temporarily rate-limited') ||
    message.includes('rate-limited upstream') ||
    message.includes('provider returned error');

  return !isTemporarilyUnavailable && resp.ok;
};

/**
 * Combina listagem + verificação de disponibilidade real,
 * processando em chunks para não sobrecarregar a API.
 */
export const listCurrentlyAvailableFreeOpenRouterModels =
  async (): Promise<OpenRouterFreeModel[]> => {
    const freeModels = await listFreeOpenRouterModels();

    const available: OpenRouterFreeModel[] = [];

    for (let i = 0; i < freeModels.length; i += AVAILABILITY_CHECK_CHUNK_SIZE) {
      const chunk = freeModels.slice(i, i + AVAILABILITY_CHECK_CHUNK_SIZE);

      const results = await Promise.all(
        chunk.map(async (model) => ({
          model,
          ok: await isOpenRouterModelAvailable(model.id),
        }))
      );

      results.forEach(({ model, ok }) => {
        if (ok) available.push(model);
      });
    }

    if (available.length === 0) {
      throw new Error('Nenhum modelo free disponível agora na OpenRouter.');
    }

    return available;
  };




