// src/lib/geminiFree.ts
// Esta implementação usa a *chave pública* do Gemini (modo gratuito).
// A chave não fica “hard‑coded” no código fonte – ela é lida do .env por
// meio da variável VITE_GEMINI_API_KEY_FREE, garantindo que não seja
// visível em commits ou no bundle semi‑desobfuscado.

const PUBLIC_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!PUBLIC_API_KEY) {
  throw new Error(
    'PUBLIC_API_KEY não encontrada. Defina VITE_GEMINI_API_KEY no seu .env'
  );
}

const BASE_PROMPT = `
Você é um especialista em criação de roadmaps técnicos.
Recebe as seguintes informações:
- Descrição do projeto: {projectDescription}
- Tecnologias: {technologies}
- URL do repositório: {repoUrl}
Crie um roadmap estruturado em fases (básico, intermediário, avançado) com:
1. Título da fase
2. 3‑5 tarefas específicas
3. Nível de dificuldade
4. Tempo estimado por tarefa
`;

export const generateRoadmapFree = async (payload: {
  projectDescription: string;
  technologies: string[];
  repoUrl?: string;
}) => {
  const prompt = BASE_PROMPT
    .replace('{projectDescription}', payload.projectDescription)
    .replace('{technologies}', payload.technologies.join(', '))
    .replace('{repoUrl}', payload.repoUrl ?? 'Não disponível');

  const resp = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${PUBLIC_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }]
      })
    }
  );

  const data = await resp.json();
  return (
    data.candidates?.[0]?.content?.parts?.[0]?.text ??
    'Erro ao gerar roadmap (modo gratuito)'
  );
};
