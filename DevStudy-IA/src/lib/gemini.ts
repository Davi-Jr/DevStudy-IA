import { GoogleGenerativeAI } from '@google/generative-ai';

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

export const initializeGemini = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) throw new Error('Gemini API key não configurada');
  const genAI = new GoogleGenerativeAI(apiKey);
  return genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
};

export const generateRoadmap = async (payload: {
  projectDescription: string;
  technologies: string[];
  repoUrl?: string;
}) => {
  const model = initializeGemini();

  const prompt = BASE_PROMPT
    .replace('{projectDescription}', payload.projectDescription)
    .replace('{technologies}', payload.technologies.join(', '))
    .replace('{repoUrl}', payload.repoUrl ?? 'Não disponível');

  const result = await model.generateContent(prompt);
  const text = result.response?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('Resposta vazia da Gemini');
  return text;
};
