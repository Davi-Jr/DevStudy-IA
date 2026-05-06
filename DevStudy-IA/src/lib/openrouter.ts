const BASE_PROMPT = `
Voce e um especialista em criacao de roadmaps tecnicos.
Recebe as seguintes informacoes:
- Descricao do projeto: {projectDescription}
- Tecnologias: {technologies}
- URL do repositorio: {repoUrl}
Crie um roadmap estruturado em fases (basico, intermediario, avancado) com:
1. Titulo da fase
2. 3-5 tarefas especificas
3. Nivel de dificuldade
4. Tempo estimado por tarefa
`;

const DEFAULT_MODEL = 'qwen/qwen3-coder:free';

export interface OpenRouterFreeModel {
  id: string;
  name: string;
  contextLength: number;
}

const getOpenRouterApiKey = () => {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY?.trim();

  if (!apiKey) {
    throw new Error(
      'VITE_OPENROUTER_API_KEY nao encontrada. Defina essa variavel em DevStudy-IA/.env e reinicie o servidor Vite.'
    );
  }

  return apiKey;
};

export const generateRoadmapOpenRouter = async (payload: {
  projectDescription: string;
  technologies: string[];
  repoUrl?: string;
  model?: string;
}) => {
  const apiKey = getOpenRouterApiKey();
  const model = payload.model || import.meta.env.VITE_OPENROUTER_MODEL || DEFAULT_MODEL;

  const prompt = BASE_PROMPT
    .replace('{projectDescription}', payload.projectDescription)
    .replace('{technologies}', payload.technologies.join(', '))
    .replace('{repoUrl}', payload.repoUrl ?? 'Nao disponivel');

  const resp = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
      'HTTP-Referer': window.location.origin,
      'X-Title': 'DevStudy IA',
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    }),
  });

  const data = await resp.json();
  if (!resp.ok) {
    const apiMessage =
      data?.error?.metadata?.raw ||
      data?.error?.message ||
      `HTTP ${resp.status}`;
    throw new Error(`OpenRouter API error: ${apiMessage}`);
  }

  const text = data?.choices?.[0]?.message?.content;
  if (!text) {
    throw new Error('Resposta vazia da OpenRouter.');
  }

  return text;
};

const isFreePrice = (value: string | undefined) => {
  if (!value) return false;
  const numeric = Number(value);
  return Number.isFinite(numeric) && numeric === 0;
};

export const listFreeOpenRouterModels = async () => {
  const apiKey = getOpenRouterApiKey();

  const resp = await fetch('https://openrouter.ai/api/v1/models', {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  const data = await resp.json();
  if (!resp.ok) {
    const apiMessage =
      data?.error?.metadata?.raw ||
      data?.error?.message ||
      `HTTP ${resp.status}`;
    throw new Error(`OpenRouter models API error: ${apiMessage}`);
  }

  const models = Array.isArray(data?.data) ? data.data : [];
  const freeModels: OpenRouterFreeModel[] = models
    .filter((model: any) => {
      const pricing = model?.pricing || {};
      const promptFree = isFreePrice(pricing.prompt);
      const completionFree = isFreePrice(pricing.completion);
      const requestFree = isFreePrice(pricing.request || '0');
      return promptFree && completionFree && requestFree;
    })
    .map((model: any) => ({
      id: String(model.id),
      name: String(model.name || model.id),
      contextLength: Number(model.context_length || 0),
    }))
    .sort((a: OpenRouterFreeModel, b: OpenRouterFreeModel) => a.name.localeCompare(b.name));

  if (freeModels.length === 0) {
    throw new Error('Nenhum modelo free encontrado na OpenRouter agora.');
  }

  return freeModels;
};

export const isOpenRouterModelAvailable = async (modelId: string) => {
  const apiKey = getOpenRouterApiKey();

  const resp = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
      'HTTP-Referer': window.location.origin,
      'X-Title': 'DevStudy IA',
    },
    body: JSON.stringify({
      model: modelId,
      messages: [{ role: 'user', content: 'ping' }],
      max_tokens: 1,
      temperature: 0,
    }),
  });

  if (resp.ok) return true;

  const data = await resp.json().catch(() => ({}));
  const message = String(data?.error?.metadata?.raw || data?.error?.message || '');

  // Models temporarily blocked/limited upstream should be hidden from selection.
  if (
    message.toLowerCase().includes('temporarily rate-limited') ||
    message.toLowerCase().includes('rate-limited upstream') ||
    message.toLowerCase().includes('provider returned error')
  ) {
    return false;
  }

  // If provider rejects this model now for any other hard reason, hide as well.
  if (!resp.ok) return false;
  return true;
};

export const listCurrentlyAvailableFreeOpenRouterModels = async () => {
  const freeModels = await listFreeOpenRouterModels();

  // Validate current availability in small batches.
  const chunkSize = 5;
  const available: OpenRouterFreeModel[] = [];

  for (let i = 0; i < freeModels.length; i += chunkSize) {
    const chunk = freeModels.slice(i, i + chunkSize);
    const checks = await Promise.all(
      chunk.map(async (model) => ({
        model,
        ok: await isOpenRouterModelAvailable(model.id),
      }))
    );

    checks.forEach((item) => {
      if (item.ok) available.push(item.model);
    });
  }

  if (available.length === 0) {
    throw new Error('Nenhum modelo free disponivel agora na OpenRouter.');
  }

  return available;
};
