export const analyzeRepository = async (repoUrl: string) => {
  const res = await fetch(`https://api.gitingest.com/analyze?url=${encodeURIComponent(repoUrl)}`);
  if (!res.ok) throw new Error('Falha ao analisar repositório com gitingest');
  const data = await res.json();
  return {
    technologies: data.languages ?? [],
    complexity: data.complexity,
    recentActivity: data.recentCommits
  };
};
