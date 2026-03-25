'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

type Language = 'PT' | 'EN';

interface Translations {
  [key: string]: {
    PT: string;
    EN: string;
  };
}

const translations: Translations = {
  // Header
  'header.devStudy': { PT: 'DevStudy', EN: 'DevStudy' },
  'header.title': { PT: 'DevStudy AI', EN: 'DevStudy AI' },
  'header.howItWorks': { PT: 'Como Funciona', EN: 'How It Works' },
  'header.login': { PT: 'Login', EN: 'Login' },
  'header.about': { PT: 'Sobre', EN: 'About' },
  'header.dashboard': { PT: 'Dashboard', EN: 'Dashboard' },
  'header.language': { PT: 'PT-BR', EN: 'PT-BR' },
  'header.languageEN': { PT: 'English (EN)', EN: 'English (EN)' },
  
  // Hero Section
  'hero.title.pt': { PT: 'Roadmap Dev', EN: 'Dev Roadmap' },
  'hero.title.end': { PT: 'com IA', EN: 'with AI' },
  'hero.title': { PT: 'Seu', EN: 'Your' },
  'hero.subtitle': { PT: 'Crie planos personalizados e acompanhe sua evolução com nossa inteligência artificial feita para desenvolvedores.', EN: 'Create personalized plans and track your evolution with our AI made for developers.' },
  'hero.cta': { PT: 'Gerar Meu Roadmap', EN: 'Generate My Roadmap' },
  'hero.learnMore': { PT: 'Saiba Mais', EN: 'Learn More' },
  
  // Features Section
  'features.title': { PT: 'Você se sente perdido nos estudos?', EN: 'Do you feel lost in your studies?' },
  'features.personalized': { PT: 'Roadmaps Personalizados', EN: 'Personalized Roadmaps' },
  'features.personalizedDesc': { PT: 'Algoritmos inteligentes que mapeiam exatamente o que você precisa aprender para sua vaga dos sonhos.', EN: 'Intelligent algorithms that map exactly what you need to learn for your dream job.' },
  'features.progress': { PT: 'Progresso Mensurável', EN: 'Measurable Progress' },
  'features.progressDesc': { PT: 'Visualize sua evolução em tempo real com métricas detalhadas de cada tecnologia dominada.', EN: 'Visualize your evolution in real-time with detailed metrics of each mastered technology.' },
  'features.projects': { PT: 'Sugestão de Projetos', EN: 'Project Suggestions' },
  'features.projectsDesc': { PT: 'Aplique o conhecimento com projetos práticos sugeridos pela IA baseados no seu nível atual.', EN: 'Apply knowledge with practical projects suggested by AI based on your current level.' },
  
  // How It Works
  'howItWorks.title': { PT: 'Como funciona?', EN: 'How it works?' },
  'howItWorks.step1.title': { PT: 'Defina seu objetivo', EN: 'Define your goal' },
  'howItWorks.step1.desc': { PT: 'Frontend, Backend, Mobile? Diga-nos onde quer chegar.', EN: 'Frontend, Backend, Mobile? Tell us where you want to go.' },
  'howItWorks.step2.title': { PT: 'Receba seu roadmap', EN: 'Receive your roadmap' },
  'howItWorks.step2.desc': { PT: 'Nossa IA processa milhares de dados para criar seu plano ideal.', EN: 'Our AI processes thousands of data to create your ideal plan.' },
  'howItWorks.step3.title': { PT: 'Acompanhe e evolua', EN: 'Track and evolve' },
  'howItWorks.step3.desc': { PT: 'Marque seu progresso e suba de nível profissional.', EN: 'Mark your progress and level up professionally.' },
  
  // Product Showcase
  'showcase.goal': { PT: 'Sua Próxima Meta', EN: 'Your Next Goal' },
  'showcase.fullstack': { PT: 'Fullstack Developer (Node/React)', EN: 'Fullstack Developer (Node/React)' },
  'showcase.mobile': { PT: 'Mobile App Specialist', EN: 'Mobile App Specialist' },
  'showcase.build': { PT: 'Construir Roadmap', EN: 'Build Roadmap' },
  'showcase.processing': { PT: 'IA Processando Dados', EN: 'AI Processing Data' },
  'showcase.searching': { PT: 'Procurando os melhores recursos para você...', EN: 'Finding the best resources for you...' },
  'showcase.track': { PT: 'Sua Trilha: Fullstack Engineer', EN: 'Your Path: Fullstack Engineer' },
  'showcase.time': { PT: 'Tempo estimado: 6 meses', EN: 'Estimated time: 6 months' },
  'showcase.personalized': { PT: 'PERSONALIZADO', EN: 'PERSONALIZED' },
  'showcase.phase1': { PT: 'Fase 1: Fundamentos & Git Flow', EN: 'Phase 1: Fundamentals & Git Flow' },
  'showcase.beginner': { PT: 'Beginner', EN: 'Beginner' },
  'showcase.hours2': { PT: '2h', EN: '2h' },
  'showcase.phase2': { PT: 'Fase 2: React Advanced Patterns', EN: 'Phase 2: React Advanced Patterns' },
  'showcase.intermediate': { PT: 'Intermediate', EN: 'Intermediate' },
  'showcase.hours4': { PT: '4h', EN: '4h' },
  'showcase.phase3': { PT: 'Fase 3: Backend Scalability', EN: 'Phase 3: Backend Scalability' },
  'showcase.advanced': { PT: 'Advanced', EN: 'Advanced' },
  'showcase.hours6': { PT: '6h', EN: '6h' },
  
  // Final CTA
  'cta.title': { PT: 'Pronto para acelerar seus estudos?', EN: 'Ready to accelerate your studies?' },
  'cta.subtitle': { PT: 'Junte-se na plataforma de desenvolvedores DevStudy AI, que transformará seus estudos com o poder da inteligência artificial.', EN: 'Join the DevStudy AI developer platform that will transform your studies with the power of artificial intelligence.' },
  'cta.button': { PT: 'Começar Minha Jornada', EN: 'Start My Journey' },
  
  // Footer
  'footer.about': { PT: 'Sobre Nós', EN: 'About Us' },
  'footer.features': { PT: 'Funcionalidades', EN: 'Features' },
  'footer.description': { PT: 'Elevando o patamar do ensino de tecnologia através de inteligência artificial generativa e personalizada.', EN: 'Elevating the level of technology education through generative and personalized artificial intelligence.' },
  'footer.copyright': { PT: '© 2026 DevStudy AI. Todos os direitos reservados.', EN: '© 2026 DevStudy AI. All rights reserved.' },
  
  // Login Page specific
  'login.welcome': { PT: 'Bem-vindo ao', EN: 'Welcome to' },
  'login.subtitle': { PT: 'Acelere seus estudos com roadmaps inteligentes', EN: 'Accelerate your studies with intelligent roadmaps' },
  'login.ready': { PT: 'Pronto para começar?', EN: 'Ready to get started?' },
  'login.continue': { PT: 'Entre com sua conta Google para continuar', EN: 'Sign in with your Google account to continue' },
  'login.google': { PT: 'Login com Google', EN: 'Login with Google' },
  'login.new': { PT: 'Novo por aqui?', EN: 'New here?' },
  'login.learnMore': { PT: 'Saiba mais', EN: 'Learn more' },
  'login.or': { PT: 'ou', EN: 'or' },
  'login.errorGoogle': { PT: 'Erro ao fazer login com Google', EN: 'Error logging in with Google' },
  
  // Feature Cards
  'feature.personalized': { PT: 'Roadmaps Personalizados', EN: 'Personalized Roadmaps' },
  'feature.generative': { PT: 'IA Generativa', EN: 'Generative AI' },
  'feature.tracking': { PT: 'Track de Evolução', EN: 'Progress Tracking' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }): ReactNode {
  const [language, setLanguage] = useState<Language>('PT');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}