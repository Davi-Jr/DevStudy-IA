import React from 'react';

// Base URL do skillicons.dev
const SKILL_ICONS_BASE = 'https://skillicons.dev/icons?';

// Mapeamento de tecnologias para os parâmetros do skillicons.dev
const TECH_SKILL_PARAMS: Record<string, string> = {
  // Frontend
  react: 'react',
  vue: 'vue',
  angular: 'angular',
  svelte: 'svelte',
  nextjs: 'nextjs',
  next: 'nextjs',
  nuxt: 'nuxt',
  
  // Backend
  nodejs: 'nodejs',
  node: 'nodejs',
  express: 'express',
  django: 'django',
  flask: 'flask',
  fastapi: 'fastapi',
  spring: 'spring',
  rails: 'rails',
  laravel: 'laravel',
  
  // Languages
  javascript: 'javascript',
  js: 'javascript',
  typescript: 'typescript',
  ts: 'typescript',
  python: 'python',
  java: 'java',
  csharp: 'csharp',
  'c#': 'csharp',
  ruby: 'ruby',
  go: 'go',
  golang: 'go',
  rust: 'rust',
  php: 'php',
  swift: 'swift',
  kotlin: 'kotlin',
  
  // Databases
  postgresql: 'postgresql',
  postgres: 'postgresql',
  mysql: 'mysql',
  mongodb: 'mongodb',
  mongo: 'mongodb',
  redis: 'redis',
  firebase: 'firebase',
  sqlite: 'sqlite',
  supabase: 'supabase',
  
  // DevOps & Cloud
  docker: 'docker',
  kubernetes: 'kubernetes',
  k8s: 'kubernetes',
  aws: 'aws',
  azure: 'azure',
  gcp: 'gcp',
  terraform: 'terraform',
  jenkins: 'jenkins',
  circleci: 'circleci',
  githubactions: 'githubactions',
  
  // Tools
  git: 'git',
  github: 'github',
  gitlab: 'gitlab',
  linux: 'linux',
  apache: 'apache',
  postman: 'postman',
  figma: 'figma',
  bash: 'bash',
  
  // Mobile
  reactnative: 'reactnative',
  'react native': 'reactnative',
  flutter: 'flutter',
  expo: 'expo',
  
  // AI/ML
  tensorflow: 'tensorflow',
  pytorch: 'pytorch',
  openai: 'openai',
  langchain: 'langchain',
  huggingface: 'huggingface',
  
  // Testing
  jest: 'jest',
  cypress: 'cypress',
  selenium: 'selenium',
  playwright: 'playwright',
  
  // Build tools
  webpack: 'webpack',
  vite: 'vite',
  esbuild: 'esbuild',
  gulp: 'gulp',
  
  // Package managers
  npm: 'npm',
  yarn: 'yarn',
  pnpm: 'pnpm',
  
  // CSS & HTML
  html: 'html',
  css: 'css',
  sass: 'sass',
  tailwind: 'tailwind',
  bootstrap: 'bootstrap',
  materialui: 'mui',
  
  // Others
  graphql: 'graphql',
  rest: 'rest',
  websockets: 'websockets',
  stripe: 'stripe',
  redux: 'redux',
  rxjs: 'rxjs',
  rabbitmq: 'rabbitmq',
  kafka: 'kafka',
  elasticsearch: 'elasticsearch',
  prometheus: 'prometheus',
  grafana: 'grafana',
  sentry: 'sentry',
  datadog: 'datadog',
  vercel: 'vercel',
  netlify: 'netlify',
  heroku: 'heroku',
  digitalocean: 'digitalocean',
  vultr: 'vultr',
  cloudflare: 'cloudflare',
};

// Cores para cada tecnologia
const TECH_COLORS: Record<string, { color: string; bgColor: string }> = {
  react: { color: 'text-cyan-400', bgColor: 'bg-cyan-500/10' },
  vue: { color: 'text-emerald-400', bgColor: 'bg-emerald-500/10' },
  angular: { color: 'text-red-400', bgColor: 'bg-red-500/10' },
  svelte: { color: 'text-orange-400', bgColor: 'bg-orange-500/10' },
  nextjs: { color: 'text-slate-300', bgColor: 'bg-slate-500/10' },
  nuxt: { color: 'text-emerald-400', bgColor: 'bg-emerald-500/10' },
  nodejs: { color: 'text-green-400', bgColor: 'bg-green-500/10' },
  express: { color: 'text-green-400', bgColor: 'bg-green-500/10' },
  django: { color: 'text-green-400', bgColor: 'bg-green-500/10' },
  flask: { color: 'text-slate-300', bgColor: 'bg-slate-500/10' },
  fastapi: { color: 'text-green-400', bgColor: 'bg-green-500/10' },
  spring: { color: 'text-green-400', bgColor: 'bg-green-500/10' },
  rails: { color: 'text-red-400', bgColor: 'bg-red-500/10' },
  laravel: { color: 'text-red-400', bgColor: 'bg-red-500/10' },
  javascript: { color: 'text-yellow-400', bgColor: 'bg-yellow-500/10' },
  typescript: { color: 'text-blue-400', bgColor: 'bg-blue-500/10' },
  python: { color: 'text-blue-400', bgColor: 'bg-blue-500/10' },
  java: { color: 'text-orange-400', bgColor: 'bg-orange-500/10' },
  csharp: { color: 'text-purple-400', bgColor: 'bg-purple-500/10' },
  ruby: { color: 'text-red-400', bgColor: 'bg-red-500/10' },
  go: { color: 'text-cyan-400', bgColor: 'bg-cyan-500/10' },
  rust: { color: 'text-orange-400', bgColor: 'bg-orange-500/10' },
  php: { color: 'text-indigo-400', bgColor: 'bg-indigo-500/10' },
  swift: { color: 'text-orange-400', bgColor: 'bg-orange-500/10' },
  kotlin: { color: 'text-purple-400', bgColor: 'bg-purple-500/10' },
  postgresql: { color: 'text-blue-400', bgColor: 'bg-blue-500/10' },
  mysql: { color: 'text-orange-400', bgColor: 'bg-orange-500/10' },
  mongodb: { color: 'text-green-400', bgColor: 'bg-green-500/10' },
  redis: { color: 'text-red-400', bgColor: 'bg-red-500/10' },
  firebase: { color: 'text-yellow-400', bgColor: 'bg-yellow-500/10' },
  supabase: { color: 'text-emerald-400', bgColor: 'bg-emerald-500/10' },
  docker: { color: 'text-blue-400', bgColor: 'bg-blue-500/10' },
  kubernetes: { color: 'text-blue-400', bgColor: 'bg-blue-500/10' },
  aws: { color: 'text-orange-400', bgColor: 'bg-orange-500/10' },
  azure: { color: 'text-blue-400', bgColor: 'bg-blue-500/10' },
  gcp: { color: 'text-red-400', bgColor: 'bg-red-500/10' },
  terraform: { color: 'text-purple-400', bgColor: 'bg-purple-500/10' },
  jenkins: { color: 'text-orange-400', bgColor: 'bg-orange-500/10' },
  circleci: { color: 'text-green-400', bgColor: 'bg-green-500/10' },
  githubactions: { color: 'text-slate-300', bgColor: 'bg-slate-500/10' },
  git: { color: 'text-orange-400', bgColor: 'bg-orange-500/10' },
  github: { color: 'text-slate-300', bgColor: 'bg-slate-500/10' },
  gitlab: { color: 'text-orange-400', bgColor: 'bg-orange-500/10' },
  linux: { color: 'text-slate-300', bgColor: 'bg-slate-500/10' },
  nginx: { color: 'text-green-400', bgColor: 'bg-green-500/10' },
  apache: { color: 'text-red-400', bgColor: 'bg-red-500/10' },
  postman: { color: 'text-orange-400', bgColor: 'bg-orange-500/10' },
  figma: { color: 'text-purple-400', bgColor: 'bg-purple-500/10' },
  bash: { color: 'text-green-400', bgColor: 'bg-green-500/10' },
  reactnative: { color: 'text-cyan-400', bgColor: 'bg-cyan-500/10' },
  flutter: { color: 'text-cyan-400', bgColor: 'bg-cyan-500/10' },
  expo: { color: 'text-slate-300', bgColor: 'bg-slate-500/10' },
  tensorflow: { color: 'text-orange-400', bgColor: 'bg-orange-500/10' },
  pytorch: { color: 'text-orange-400', bgColor: 'bg-orange-500/10' },
  openai: { color: 'text-green-400', bgColor: 'bg-green-500/10' },
  langchain: { color: 'text-slate-300', bgColor: 'bg-slate-500/10' },
  huggingface: { color: 'text-yellow-400', bgColor: 'bg-yellow-500/10' },
  jest: { color: 'text-green-400', bgColor: 'bg-green-500/10' },
  cypress: { color: 'text-slate-300', bgColor: 'bg-slate-500/10' },
  selenium: { color: 'text-green-400', bgColor: 'bg-green-500/10' },
  playwright: { color: 'text-purple-400', bgColor: 'bg-purple-500/10' },
  webpack: { color: 'text-blue-400', bgColor: 'bg-blue-500/10' },
  vite: { color: 'text-purple-400', bgColor: 'bg-purple-500/10' },
  npm: { color: 'text-red-400', bgColor: 'bg-red-500/10' },
  yarn: { color: 'text-blue-400', bgColor: 'bg-blue-500/10' },
  pnpm: { color: 'text-orange-400', bgColor: 'bg-orange-500/10' },
  html: { color: 'text-orange-400', bgColor: 'bg-orange-500/10' },
  css: { color: 'text-blue-400', bgColor: 'bg-blue-500/10' },
  sass: { color: 'text-pink-400', bgColor: 'bg-pink-500/10' },
  tailwind: { color: 'text-cyan-400', bgColor: 'bg-cyan-500/10' },
  bootstrap: { color: 'text-purple-400', bgColor: 'bg-purple-500/10' },
  mui: { color: 'text-blue-400', bgColor: 'bg-blue-500/10' },
  graphql: { color: 'text-pink-400', bgColor: 'bg-pink-500/10' },
  stripe: { color: 'text-purple-400', bgColor: 'bg-purple-500/10' },
  redux: { color: 'text-purple-400', bgColor: 'bg-purple-500/10' },
  vercel: { color: 'text-slate-300', bgColor: 'bg-slate-500/10' },
  netlify: { color: 'text-cyan-400', bgColor: 'bg-cyan-500/10' },
  heroku: { color: 'text-purple-400', bgColor: 'bg-purple-500/10' },
};

// Cores padrão
const DEFAULT_COLORS = { color: 'text-primary', bgColor: 'bg-primary/10' };

// Ícone padrão SVG
const DEFAULT_ICON_SVG = (
  <svg viewBox="0 0 128 128" className="w-6 h-6">
    <polygon points="32,32 96,32 96,96 32,96" fill="none" stroke="currentColor" strokeWidth="8" strokeLinejoin="round" />
    <line x1="64" y1="32" x2="64" y2="96" stroke="currentColor" strokeWidth="6" />
    <line x1="32" y1="64" x2="96" y2="64" stroke="currentColor" strokeWidth="6" />
  </svg>
);

// Função para normalizar o nome da tecnologia
function normalizeTechName(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace('.js', 'javascript')
    .replace('.ts', 'typescript')
    .replace('node.js', 'nodejs')
    .replace('reactjs', 'react')
    .replace('react.js', 'react')
    .replace('react native', 'reactnative')
    .replace('google cloud', 'gcp')
    .replace('material ui', 'mui');
}

// Função para obter ícone do skillicons.dev
export function getTechIcon(name: string): {
  url: string;
  color: string;
  bgColor: string;
  isSvgUrl: boolean;
} {
  const normalized = normalizeTechName(name);
  const skillParam = TECH_SKILL_PARAMS[normalized];
  
  if (skillParam) {
    return {
      url: `${SKILL_ICONS_BASE}i=${skillParam}&theme=dark`,
      color: TECH_COLORS[skillParam]?.color || DEFAULT_COLORS.color,
      bgColor: TECH_COLORS[skillParam]?.bgColor || DEFAULT_COLORS.bgColor,
      isSvgUrl: true
    };
  }
  
  return {
    url: '',
    color: DEFAULT_COLORS.color,
    bgColor: DEFAULT_COLORS.bgColor,
    isSvgUrl: false
  };
}

// Função para compatibilidade com código existente
export function getTechSvg(name: string): {
  svg: React.ReactNode;
  color: string;
  bgColor: string
} {
  const normalized = normalizeTechName(name);
  const skillParam = TECH_SKILL_PARAMS[normalized];
  
  if (skillParam) {
    return {
      svg: (
        <img
          src={`${SKILL_ICONS_BASE}i=${skillParam}&theme=dark`}
          alt={name}
          className="w-full h-full object-contain"
          style={{ imageRendering: 'auto' }}
        />
      ),
      color: TECH_COLORS[skillParam]?.color || DEFAULT_COLORS.color,
      bgColor: TECH_COLORS[skillParam]?.bgColor || DEFAULT_COLORS.bgColor
    };
  }
  
  return {
    svg: DEFAULT_ICON_SVG,
    color: DEFAULT_COLORS.color,
    bgColor: DEFAULT_COLORS.bgColor
  };
}

// Lista de todas as tecnologias disponíveis
export const AVAILABLE_TECHS = Object.keys(TECH_SKILL_PARAMS);
