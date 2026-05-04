// src/lib/geminiFree.ts
// Esta implementacao usa a chave publica do Gemini via VITE_GEMINI_API_KEY.

const getPublicApiKey = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY?.trim();

  if (!apiKey) {
    throw new Error(
      'VITE_GEMINI_API_KEY nao encontrada. Defina essa variavel em DevStudy-IA/.env e reinicie o servidor Vite.'
    );
  }

  return apiKey;
};
// MAIS APERFEIÇOAMENTO EM BREVE
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

export const generateRoadmapFree = async (payload: {
  projectDescription: string;
  technologies: string[];
  repoUrl?: string;
}) => {
  const publicApiKey = getPublicApiKey();
  const prompt = BASE_PROMPT
    .replace('{projectDescription}', payload.projectDescription)
    .replace('{technologies}', payload.technologies.join(', '))
    .replace('{repoUrl}', payload.repoUrl ?? 'Nao disponivel');

  const resp = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${publicApiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }]
      })
    }
  );

  const data = await resp.json();
  if (!resp.ok) {
    const apiMessage = data?.error?.message || `HTTP ${resp.status}`;
    throw new Error(`Gemini API error: ${apiMessage}`);
  }

  return (
    data.candidates?.[0]?.content?.parts?.[0]?.text ??
    'Erro ao gerar roadmap (modo gratuito)'
  );
};
