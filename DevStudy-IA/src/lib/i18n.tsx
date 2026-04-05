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
  
  // About Page
  'about.title': { PT: 'Sobre o Projeto', EN: 'About the Project' },
  'about.mission': { PT: 'Nossa Missão', EN: 'Our Mission' },
  'about.purposeTitle': { PT: 'O', EN: 'The' },
  'about.purposeHighlight': { PT: 'Propósito', EN: 'Purpose' },
  'about.purposeDescription': {
    PT: 'O DevStudy AI nasceu da frustração real de muitos desenvolvedores: horas perdidas sem saber o que estudar, por onde começar ou como evoluir de verdade. Em um ecossistema tech que cresce mais rápido do que qualquer pessoa consegue acompanhar, a sensação de estar perdido é paralisante. O propósito do DevStudy AI é transformar esse caos em um caminho claro, personalizado e mensurável — para que cada desenvolvedor possa focar no que realmente importa e crescer com consistência, sem desperdício de tempo ou energia.',

    EN: 'DevStudy AI was born from a frustration that many developers know too well: hours wasted not knowing what to study, where to start, or how to actually grow. In a tech ecosystem that evolves faster than anyone can keep up with, feeling lost is paralyzing. DevStudy AI\'s purpose is to turn that chaos into a clear, personalized, and measurable path — so every developer can focus on what truly matters and grow with consistency, without wasting time or energy.',
  },
  'about.zeroToProDesc': { PT: 'Roadmaps gerados dinamicamente para cada nível de experiência.', EN: 'Dynamically generated roadmaps for each experience level.' },
  'about.fullFocus': { PT: 'Foco Total', EN: 'Full Focus' },
  'about.fullFocusDesc': { PT: 'Elimine o ruído e foque no que realmente importa para sua carreira.', EN: 'Eliminate noise and focus on what really matters for your career.' },
  'about.generatedThisMonth': { PT: 'Gerados este mês', EN: 'Generated this month' },
  'about.devTitle': { PT: 'Desenvolvedor Junior & IA Estusiasta', EN: 'Junior Developer & AI Enthusiast' },
  'about.helloDev': { PT: 'Olá, eu sou o Davi.', EN: 'Hello, I am Davi.' },
  'about.devJourney1': { PT: 'Minha jornada na programação começou quando ingressei na Fatec Zona Sul no curso de Desenvolvimento de Software Multiplataformas (DSM) em 2022, onde me identifiquei com a programação e a paixão de criar algo inovador. Como muitos de vocês, passei noites em claro tentando entender por onde começar entre centenas de frameworks e linguagens.', EN: 'My programming journey began when I enrolled in the Multiplatform Software Development (DSM) course at Fatec Zona Sul in 2022, where I identified with programming and the passion for creating something innovative. Like many of you, I spent sleepless nights trying to understand where to start among hundreds of frameworks and languages.' },
  'about.zeroToPro': { PT: 'Zero ao Pro', EN: 'Zero to Pro' },
  'about.devJourney2': {
    PT: 'O DevStudy AI nasceu da frustração real que vivi — e que muitos devs ainda vivem: horas perdidas sem saber o que estudar, por onde começar ou como evoluir de verdade. Unindo minha paixão por arquitetura de software com as fronteiras da IA Generativa atuais, construí uma plataforma que age como um mentor digital, gerando roadmaps de estudo personalizados com base na sua stack e nível, recomendando fontes da comunidade dev de outros sites de roadmaps. Organizando seu aprendizado em etapas sequenciais com progresso mensurável. Mais do que gerar planos automáticos, o DevStudy AI transforma incerteza em clareza, guiando cada desenvolvedor pelo caminho mais eficiente rumo à sua próxima versão.',
    EN: 'DevStudy AI was born from the real frustration I experienced—and that many developers still experience: wasted hours not knowing what to study, where to start, or how to truly evolve. Combining my passion for software architecture with the current frontiers of Generative AI, I built a platform that acts as a digital mentor, generating personalized learning roadmaps based on your stack and level, recommending resources from the developer community and other roadmap websites. Organizing your learning into sequential steps with measurable progress. More than just generating automatic plans, DevStudy AI transforms uncertainty into clarity, guiding each developer along the most efficient path to their next version.',
  },
  'about.adaptiveLearning': { PT: 'Aprendizado Adaptativo', EN: 'Adaptive Learning' },
  'about.adaptiveLearningDesc': { PT: 'O sistema aprende com seu progresso e ajusta a dificuldade das sessões automaticamente.', EN: 'The system learns from your progress and automatically adjusts session difficulty.' },
  'about.personalizedRoadmaps': { PT: 'Roadmaps Personalizados', EN: 'Personalized Roadmaps' },
  'about.personalizedRoadmapsDesc': { PT: 'Roadmaps gerados dinamicamente para cada nível de experiência e área de interesse.', EN: 'Roadmaps dynamically generated for each experience level and area of interest.' },
  'about.community': { PT: 'Comunidade Global', EN: 'Global Community' },
  'about.communityDesc': { PT: 'Conecte-se com outros alunos seguindo o mesmo roadmap que você.', EN: 'Connect with other students following the same roadmap as you.' },

  // Dashboard translations
  'dashboard.loading': { PT: 'Carregando...', EN: 'Loading...' },
  'dashboard.welcome': { PT: 'Bem-vindo de volta!', EN: 'Welcome back!' },
  'dashboard.welcomeMessage': { PT: 'Você está fazendo um ótimo progresso. Continue assim!', EN: "You're making great progress. Keep the momentum going!" },
  'dashboard.streak': { PT: 'Sequência', EN: 'Streak' },
  'dashboard.days': { PT: 'Dias', EN: 'Days' },
  'dashboard.done': { PT: 'Concluído', EN: 'Done' },
  'dashboard.currentRoadmap': { PT: 'Roadmap Atual', EN: 'Current Roadmap' },
  'dashboard.noRoadmap': { PT: 'Sem roadmap', EN: 'No roadmap' },
  'dashboard.noDescription': { PT: 'Sem descrição', EN: 'No description' },
  'dashboard.viewDetails': { PT: 'Ver Detalhes', EN: 'View Details' },
  'dashboard.searchPlaceholder': { PT: 'Buscar tópicos de roadmap...', EN: 'Search roadmap topics...' },
  'dashboard.empty.title': { PT: 'Nenhum Roadmap Encontrado', EN: 'No Roadmaps Found' },
  'dashboard.empty.subtitle': { PT: 'Comece sua jornada de aprendizado criando seu primeiro roadmap', EN: 'Start your learning journey by creating your first roadmap' },
  'dashboard.empty.howToStart': { PT: 'Como Criar Seu Roadmap', EN: 'How to Create Your Roadmap' },
  'dashboard.empty.step1Title': { PT: 'Acesse Roadmaps', EN: 'Go to Roadmaps' },
  'dashboard.empty.step1Desc': { PT: 'Clique no botão abaixo ou vá para a seção Roadmaps no menu lateral', EN: 'Click the button below or go to the Roadmaps section in the sidebar' },
  'dashboard.empty.step2Title': { PT: 'Escolha Sua Meta', EN: 'Choose Your Goal' },
  'dashboard.empty.step2Desc': { PT: 'Selecione seu objetivo profissional (Frontend, Backend, Fullstack, etc.)', EN: 'Select your career goal (Frontend, Backend, Fullstack, etc.)' },
  'dashboard.empty.step3Title': { PT: 'Receba Seu Roadmap', EN: 'Receive Your Roadmap' },
  'dashboard.empty.step3Desc': { PT: 'Nossa IA criará um plano de estudos personalizado para você', EN: 'Our AI will create a personalized study plan for you' },
  'dashboard.empty.createRoadmap': { PT: 'Criar Meu Primeiro Roadmap', EN: 'Create My First Roadmap' },
  'dashboard.empty.redirectToRoadmaps': { PT: 'Você será redirecionado para a página de criação de roadmaps', EN: 'You will be redirected to the roadmap creation page' },
  'dashboard.stats.title': { PT: 'Estatísticas de Estudo', EN: 'Study Stats' },
  'dashboard.stats.totalRoadmaps': { PT: 'Total de Roadmaps', EN: 'Total Roadmaps' },
  'dashboard.stats.inProgress': { PT: 'Em Progresso', EN: 'In Progress' },
  'dashboard.stats.completed': { PT: 'Concluídos', EN: 'Completed' },
  'dashboard.stats.weeklyActivity': { PT: 'Atividade Semanal', EN: 'Weekly Activity' },
  'dashboard.tasks.title': { PT: 'Próximas Tarefas', EN: 'Next Tasks' },
  'dashboard.tasks.viewAll': { PT: 'Ver Todos', EN: 'View All' },
  'dashboard.tasks.estimated': { PT: 'Estimado', EN: 'Estimated' },
  'dashboard.tasks.defaultTask': { PT: 'Nenhuma tarefa disponível', EN: 'No task available' },
  'dashboard.activity.title': { PT: 'Atividade Recente', EN: 'Recent Activity' },
  'dashboard.activity.noActivity1': { PT: 'Nenhuma atividade recente', EN: 'No recent activity' },
  'dashboard.activity.noActivity2': { PT: 'Crie seu primeiro roadmap para começar', EN: 'Create your first roadmap to get started' },
  'sidebar.roadmaps': { PT: 'Meus Roadmaps', EN: 'My Roadmaps' },
  'sidebar.studySessions': { PT: 'Sessões de Estudo', EN: 'Study Sessions' },
  'sidebar.about': { PT: 'Sobre', EN: 'About' },
  'sidebar.settings': { PT: 'Configurações', EN: 'Settings' },
  'sidebar.newRoadmap': { PT: 'Novo Roadmap', EN: 'New Roadmap' },
  'topbar.pages': { PT: 'Dashboard', EN: 'Dashboard' },
  'topbar.myRoadmaps': { PT: 'Meus Roadmaps', EN: 'My Roadmaps' },
  'topbar.studySessions': { PT: 'Sessões de Estudo', EN: 'Study Sessions' },
  'topbar.accountSettings': { PT: 'Configurações da Conta', EN: 'Account Settings' },

  // Roadmap Page
  'roadmap.generateTitle': { PT: 'Gerar Novo', EN: 'Generate New' },
  'roadmap.generateSubtitle': { PT: 'Roadmap', EN: 'Roadmap' },
  'roadmap.heroDescription': { PT: 'Aproveite nossa IA para analisar suas habilidades atuais ou repositórios de projetos e crie um caminho de aprendizado personalizado para o domínio.', EN: 'Leverage our AI to analyze your current skills or project repositories and build a personalized learning path to mastery.' },
  'roadmap.step1': { PT: 'Stack & Proficiência', EN: 'Stack & Proficiency' },
  'roadmap.selectLevel': { PT: 'Selecionar Nível', EN: 'Select Level' },
  'roadmap.addTechnology': { PT: 'Adicionar Tecnologia', EN: 'Add Technology' },
  'roadmap.step2': { PT: 'Detalhes da Análise IA', EN: 'AI Analysis Details' },
  'roadmap.projectDescription': { PT: 'Descrição do Projeto ou Habilidades', EN: 'Project or Skills Description' },
  'roadmap.projectPlaceholder': { PT: 'Conte para a IA sobre seus objetivos, o que você já sabe, ou um projeto específico que deseja construir...', EN: 'Tell the AI about your goals, what you already know, or a specific project you want to build...' },
  'roadmap.githubUrl': { PT: 'URL do Repositório GitHub', EN: 'GitHub Repository URL' },
  'roadmap.githubPlaceholder': { PT: 'https://github.com/user/repo', EN: 'https://github.com/user/repo' },
  'roadmap.analyzeRepo': { PT: 'Analisar meu repo para identificar lacunas de conhecimento.', EN: 'Analyze my repo to identify knowledge gaps.' },
  'roadmap.aiActive': { PT: 'AGENTE IA ATIVO', EN: 'AI AGENT ACTIVE' },
  'roadmap.aiVersion': { PT: 'Modelo de deep learning v4.2', EN: 'Deep learning model v4.2' },
  'roadmap.generateButton': { PT: 'Gerar Roadmap com IA', EN: 'Generate AI Roadmap' },
  'roadmap.roadmapName': { PT: 'Nome do Roadmap', EN: 'Roadmap Name' },
  'roadmap.preview': { PT: 'Pré-visualização', EN: 'Preview' },
  'roadmap.addNewPhase': { PT: 'Adicionar Nova Fase', EN: 'Add New Phase' },
  'roadmap.saveRoadmap': { PT: 'Salvar Roadmap no Perfil', EN: 'Save Roadmap to Profile' },
  'roadmap.levels.beginner': { PT: 'Iniciante', EN: 'Beginner' },
  'roadmap.levels.intermediate': { PT: 'Intermediário', EN: 'Intermediate' },
  'roadmap.levels.advanced': { PT: 'Avançado', EN: 'Advanced' },

  // Profile Page
  'profile.preferences': { PT: 'Preferências', EN: 'Preferences' },
  'profile.preferencesDesc': { PT: 'Gerencie seu perfil e configurações de roadmap de aprendizado.', EN: 'Manage your profile and learning roadmap configurations.' },
  'profile.logout': { PT: 'Sair', EN: 'Logout' },
  'profile.deleteAccount': { PT: 'Excluir Conta', EN: 'Delete Account' },
  'profile.manageRoadmaps': { PT: 'Gerenciar Roadmaps', EN: 'Manage Roadmaps' },
  'profile.active': { PT: 'Ativos', EN: 'Active' },
  'profile.createNew': { PT: 'Criar Novo Roadmap', EN: 'Create New Roadmap' },
  'profile.cancel': { PT: 'Cancelar', EN: 'Cancel' },
  'profile.saveChanges': { PT: 'Salvar Alterações', EN: 'Save Changes' },
  'profile.progress': { PT: 'Progresso', EN: 'Progress' },
  'profile.updated': { PT: 'Atualizado', EN: 'Updated' },
  'profile.fullstackTitle': { PT: 'Engenheiro React Fullstack', EN: 'Fullstack React Engineer' },
  'profile.aiArchTitle': { PT: 'Arquitetura de IA', EN: 'AI Architecture' },
  'profile.daysAgo': { PT: 'dias atrás', EN: 'days ago' },
  'profile.weekAgo': { PT: 'semana atrás', EN: 'week ago' },
  'profile.noRoadmaps': { PT: 'Nenhum roadmap ainda', EN: 'No roadmaps yet' },
  'profile.justNow': { PT: 'agora', EN: 'just now' },
  'profile.deleteRoadmap': { PT: 'Excluir roadmap', EN: 'Delete roadmap' },
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