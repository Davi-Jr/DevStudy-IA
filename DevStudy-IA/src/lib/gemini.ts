import { GoogleGenerativeAI } from '@google/generative-ai';

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

const getGeminiApiKey = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY?.trim();

  if (!apiKey) {
    throw new Error(
      'VITE_GEMINI_API_KEY nao encontrada. Defina essa variavel em DevStudy-IA/.env e reinicie o servidor Vite.'
    );
  }

  return apiKey;
};

export const initializeGemini = () => {
  const genAI = new GoogleGenerativeAI(getGeminiApiKey());
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
    .replace('{repoUrl}', payload.repoUrl ?? 'Nao disponivel');

  const result = await model.generateContent(prompt);
  const text = result.response?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('Resposta vazia da Gemini');
  return text;
};
