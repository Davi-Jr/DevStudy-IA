import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useLanguage } from '@/lib/i18n';

// ==================== SIDEBAR COMPONENT ====================
function Sidebar() {
  const { t } = useLanguage();
  const [activeItem, setActiveItem] = useState('roadmaps');

  const menuItems = [
    { id: 'dashboard', icon: 'dashboard', label: t('topbar.pages'), href: '/dashboard' },
    { id: 'roadmaps', icon: 'alt_route', label: t('topbar.myRoadmaps'), href: '/roadmaps' },
    { id: 'sessions', icon: 'menu_book', label: t('topbar.studySessions'), href: '#' },
    { id: 'about', icon: 'info', label: t('sidebar.about'), href: '/about' },
    { id: 'settings', icon: 'settings', label: t('sidebar.settings'), href: '/profile' },
  ];

  return (
    <aside className="w-64 border-r border-slate-800 flex flex-col shrink-0 bg-[#0b1120]">
      <Link to="/" className="p-6 flex items-center gap-2 transition-opacity hover:opacity-90 cursor-pointer">
        <div className="w-8 h-8 bg-primary rounded-twelve flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
          </svg>
        </div>
        <span className="font-bold text-xl tracking-tight text-white">
          DevStudy <span className="text-primary">AI</span>
        </span>
      </Link>
      <nav className="flex-1 px-4 space-y-1 mt-4">
        {menuItems.map((item) => (
          <Link
            key={item.id}
            to={item.href}
            onClick={() => setActiveItem(item.id)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              activeItem === item.id
                ? 'bg-primary/10 text-primary'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span className="text-sm font-semibold">{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}

// ==================== AVATAR COMPONENT ====================
function UserAvatar({ user, size = "size-10" }: { user: any; size?: string }) {
  const avatarUrl = user?.user_metadata?.avatar_url || user?.user_metadata?.picture;
  const fullName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
  const initials = fullName
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  if (avatarUrl) {
    return (
      <img
        alt={fullName}
        className={`${size} rounded-full object-cover bg-slate-200`}
        src={avatarUrl}
      />
    );
  }

  return (
    <div className={`${size} rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold`}>
      <span className="text-sm">{initials}</span>
    </div>
  );
}

// ==================== TOP BAR COMPONENT ====================
function TopBar() {
  const { t, language, setLanguage } = useLanguage();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    }
    getUser();
  }, []);

  return (
    <header className="fixed top-0 w-full z-50 glass-effect border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end h-16">
          <div className="flex items-center gap-6">
            <div className="relative group">
              <button className="flex items-center gap-1 hover:text-primary transition-colors text-sm font-medium mr-4 py-2 cursor-pointer">
                <span className="material-symbols-outlined text-lg">language</span>
                {language === 'PT' ? t('header.language') : t('header.languageEN')}
                <svg className="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                </svg>
              </button>
              <div className="absolute right-0 top-full mt-2 w-32 glass-effect rounded-twelve overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <button onClick={() => setLanguage('PT')} className={`block w-full text-left px-4 py-2 text-sm hover:bg-primary/20 transition-colors cursor-pointer ${language === 'PT' ? 'text-primary' : ''}`}>{t('header.language')}</button>
                <button onClick={() => setLanguage('EN')} className={`block w-full text-left px-4 py-2 text-sm hover:bg-primary/20 transition-colors cursor-pointer ${language === 'EN' ? 'text-primary' : ''}`}>{t('header.languageEN')}</button>
              </div>
            </div>
            <div className="h-8 w-px bg-white/10"></div>
            <div className="relative group">
              <div className="flex items-center gap-3 cursor-pointer">
                <div className="text-right">
                  <p className="text-sm font-bold text-white leading-none">{user?.user_metadata?.full_name || 'User'}</p>
                  <p className="text-xs text-slate-400 mt-1">{user?.email}</p>
                </div>
                <div className="size-10 rounded-full border-2 border-primary/20 p-0.5 group-hover:border-primary transition-colors">
                  <UserAvatar user={user} size="w-full h-full" />
                </div>
              </div>
              <div className="absolute right-0 top-full mt-2 w-44 glass-effect rounded-twelve overflow-hidden border border-white/5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 shadow-xl">
                <Link to="/profile" className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-primary/20 transition-colors cursor-pointer text-slate-300 hover:text-white">
                  <span className="material-symbols-outlined text-lg">settings</span>
                  Configurações
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

// ==================== IMPORTS ====================
import { getTechSvg } from './TechIcons';

// ==================== PHASE MODULE COMPONENT ====================
interface TaskItemProps {
  color: string;
  bgColor: string;
  level: string;
  levelColor: string;
  levelBg: string;
  content: string;
}

function TaskItem({ color, bgColor, level, levelColor, levelBg, content }: TaskItemProps) {
  return (
    <div className="group flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-transparent hover:border-white/10 transition-all">
      <div className={`w-6 h-6 rounded-md ${bgColor} flex items-center justify-center ${color}`}>
        <span className="material-symbols-outlined text-sm">drag_indicator</span>
      </div>
      <p className="flex-1 text-sm text-slate-200" contentEditable={true}>
        {content}
      </p>
      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${levelBg} ${levelColor} cursor-pointer hover:opacity-80`} contentEditable={true}>
        {level}
      </span>
      <button className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-400 transition-all">
        <span className="material-symbols-outlined text-sm">close</span>
      </button>
    </div>
  );
}

function PhaseModule({ title, color, tasks }: { title: string; color: string; tasks: TaskItemProps[] }) {
  return (
    <div className="border-b border-white/5 p-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className={`${color} font-bold text-sm uppercase tracking-wider`} contentEditable={true}>
          {title}
        </h4>
        <div className="flex gap-2">
          <button className="p-1 text-slate-500 hover:text-white transition-colors" title="Add task">
            <span className="material-symbols-outlined text-lg">add_circle</span>
          </button>
          <button className="p-1 text-slate-500 hover:text-red-400 transition-colors" title="Delete section">
            <span className="material-symbols-outlined text-lg">delete</span>
          </button>
        </div>
      </div>
      <div className="space-y-3">
        {tasks.map((task, index) => (
          <TaskItem key={index} {...task} />
        ))}
      </div>
    </div>
  );
}

// ==================== RECENT CREATION CARD ====================
function RecentCreation({ category, categoryColor, title, date, progress }: { category: string; categoryColor: string; title: string; date: string; progress: number }) {
  return (
    <div className="glass-card rounded-2xl p-4 hover:bg-white/5 transition-colors cursor-pointer group">
      <div className="flex items-center justify-between mb-2">
        <span className={`text-[10px] font-bold py-1 px-2 rounded ${categoryColor}`}>{category}</span>
        <span className="text-[10px] text-slate-500">{date}</span>
      </div>
      <h5 className="font-bold text-sm group-hover:text-primary transition-colors">{title}</h5>
      <div className="flex gap-1 mt-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={`w-1.5 h-1.5 rounded-full ${i <= progress ? 'bg-primary' : 'bg-primary/20'}`}></div>
        ))}
      </div>
    </div>
  );
}

// ==================== MAIN ROADMAP PAGE ====================
export default function RoadmapPage() {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const [roadmapGenerated, setRoadmapGenerated] = useState(false);
  const [technologies, setTechnologies] = useState<{ name: string; level: number; svg: React.ReactNode; color: string; bgColor: string }[]>([]);
  const [showAddTech, setShowAddTech] = useState(false);
  const [newTechName, setNewTechName] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleGenerateRoadmap = () => {
    setRoadmapGenerated(true);
    // Scroll para a seção do roadmap gerado
    setTimeout(() => {
      document.getElementById('generated-roadmap')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleAddTechnology = () => {
    if (newTechName.trim()) {
      const techInfo = getTechSvg(newTechName);
      setTechnologies([...technologies, {
        name: newTechName,
        level: 0,
        svg: techInfo.svg,
        color: techInfo.color,
        bgColor: techInfo.bgColor
      }]);
      setNewTechName('');
      setShowAddTech(false);
    }
  };

  const handleRemoveTechnology = (index: number) => {
    setTechnologies(technologies.filter((_, i) => i !== index));
  };

  const handleLevelChange = (index: number, level: number) => {
    const updated = [...technologies];
    updated[index].level = level;
    setTechnologies(updated);
  };

  const levels = [t('roadmap.levels.beginner'), t('roadmap.levels.intermediate'), t('roadmap.levels.advanced')];

  const phase1Tasks: TaskItemProps[] = [
    { color: 'text-primary', bgColor: 'bg-primary/20', level: 'Avançado', levelColor: 'text-blue-400', levelBg: 'border-blue-500/30 bg-blue-500/10', content: 'Master React Server Components and Suspense patterns' },
    { color: 'text-primary', bgColor: 'bg-primary/20', level: 'Intermediário', levelColor: 'text-purple-400', levelBg: 'border-purple-500/30 bg-purple-500/10', content: 'Implement complex state management with TanStack Query (React Query)' },
  ];

  const phase2Tasks: TaskItemProps[] = [
    { color: 'text-purple-400', bgColor: 'bg-purple-500/20', level: 'Intermediário', levelColor: 'text-purple-400', levelBg: 'border-purple-500/30 bg-purple-500/10', content: 'Deep dive into Prisma ORM with PostgreSQL relationship indexing' },
    { color: 'text-purple-400', bgColor: 'bg-purple-500/20', level: 'Avançado', levelColor: 'text-blue-400', levelBg: 'border-blue-500/30 bg-blue-500/10', content: 'Build high-performance tRPC endpoints for end-to-end type safety' },
    { color: 'text-purple-400', bgColor: 'bg-purple-500/20', level: 'Iniciante', levelColor: 'text-emerald-400', levelBg: 'border-emerald-500/30 bg-emerald-500/10', content: 'Setup basic Express routing with CORS' },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-[#0f172a]">
      <Sidebar />
      <main className="flex-1 flex flex-col h-screen overflow-y-auto pt-16">
        <TopBar />
        {isLoading ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-6">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-primary/20 rounded-full"></div>
              <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-white mb-1">{t('dashboard.loading')}</p>
            </div>
          </div>
        ) : (
          <div className="p-8 max-w-5xl mx-auto w-full">
            {/* Hero Section */}
            <div className="mb-10">
              <h2 className="text-4xl font-extrabold tracking-tight mb-2">
                {t('roadmap.generateTitle')} <span className="gradient-text">{t('roadmap.generateSubtitle')}</span>
              </h2>
              <p className="text-slate-400 max-w-2xl">
                {t('roadmap.heroDescription')}
              </p>
            </div>

            {/* Generation Form */}
            <div className="space-y-6">
              {/* Step 1: Stack Selection */}
              <section className="glass-card rounded-3xl p-6 sm:p-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">1</div>
                  <h3 className="text-xl font-bold">{t('roadmap.step1')}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Tecnologias adicionadas dinamicamente */}
                  {technologies.map((tech, index) => (
                    <div key={index} className="relative group cursor-pointer">
                      <div className="block p-5 rounded-2xl bg-white/5 border border-white/10 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-0.5">
                        <div className="flex items-center justify-between mb-5">
                          <div className="flex items-center gap-3">
                            <div className={`w-12 h-12 rounded-xl bg-slate-900/80 border border-white/10 flex items-center justify-center group-hover:border-white/20 transition-all p-2.5 ${tech.color}`}>
                              {tech.svg}
                            </div>
                            <span className="font-bold text-white">{tech.name}</span>
                          </div>
                          <button
                            onClick={() => handleRemoveTechnology(index)}
                            className="p-1 text-slate-500 hover:text-red-400 transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-sm">close</span>
                          </button>
                        </div>
                        <div className="space-y-2">
                          <div className="text-[10px] font-bold uppercase text-slate-500 mb-2">{t('roadmap.selectLevel')}</div>
                          <div className="grid grid-cols-3 gap-2">
                            {levels.map((level, levelIndex) => {
                              // Cores para cada nível: verde (iniciante), amarelo (intermediário), vermelho (avançado)
                              const levelColors = [
                                { active: 'border-emerald-500/50 bg-emerald-500/20 text-emerald-400', hover: 'hover:border-emerald-500/30 hover:bg-emerald-500/10' },
                                { active: 'border-yellow-500/50 bg-yellow-500/20 text-yellow-400', hover: 'hover:border-yellow-500/30 hover:bg-yellow-500/10' },
                                { active: 'border-red-500/50 bg-red-500/20 text-red-400', hover: 'hover:border-red-500/30 hover:bg-red-500/10' }
                              ];
                              return (
                                <button
                                  key={levelIndex}
                                  onClick={() => handleLevelChange(index, levelIndex)}
                                  className={`py-2 px-1 text-[10px] font-bold rounded-lg border transition-colors cursor-pointer ${
                                    tech.level === levelIndex
                                      ? levelColors[levelIndex].active
                                      : `border-white/10 bg-white/5 text-slate-400 ${levelColors[levelIndex].hover}`
                                  }`}
                                  type="button"
                                >
                                  {level}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Botão para adicionar tecnologia */}
                  {showAddTech ? (
                    <div className="flex flex-col gap-3 p-4 rounded-2xl border border-primary/50 bg-primary/5">
                      <input
                        type="text"
                        value={newTechName}
                        onChange={(e) => setNewTechName(e.target.value)}
                        placeholder="Nome da tecnologia"
                        className="w-full bg-black/20 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder:text-slate-500 outline-none focus:border-primary"
                        autoFocus
                        onKeyPress={(e) => e.key === 'Enter' && handleAddTechnology()}
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={handleAddTechnology}
                          className="flex-1 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary/80 transition-colors cursor-pointer"
                        >
                          Adicionar
                        </button>
                        <button
                          onClick={() => { setShowAddTech(false); setNewTechName(''); }}
                          className="px-4 py-2 text-slate-400 text-sm font-bold rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  ) : technologies.length >= 6 ? (
                    <div className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border border-primary/30 bg-primary/5 min-h-[140px]">
                      <span className="material-symbols-outlined text-2xl text-primary">info</span>
                      <span className="text-sm text-slate-400 text-center">Máximo de 6 tecnologias atingido</span>
                      <span className="text-xs text-slate-500 text-center">Avance para a próxima etapa para gerar seu roadmap</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowAddTech(true)}
                      className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border border-dashed border-white/10 hover:border-primary/50 hover:bg-white/5 transition-all text-slate-500 hover:text-primary min-h-[140px] cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-3xl">add_circle</span>
                      <span className="font-bold text-sm">{t('roadmap.addTechnology')}</span>
                    </button>
                  )}
                </div>
              </section>

              {/* Step 2: AI Input */}
              <section className="glass-card rounded-3xl p-6 sm:p-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">2</div>
                  <h3 className="text-xl font-bold">{t('roadmap.step2')}</h3>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">{t('roadmap.projectDescription')}</label>
                    <textarea
                      className="w-full bg-black/20 border border-white/10 rounded-2xl focus:ring-primary focus:border-primary placeholder:text-slate-600 transition-all text-white p-4"
                      placeholder={t('roadmap.projectPlaceholder')}
                      rows={4}
                    ></textarea>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-300 mb-2">{t('roadmap.githubUrl')}</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                          <span className="material-symbols-outlined text-lg">link</span>
                        </div>
                        <input
                          className="w-full bg-black/20 border border-white/10 pl-10 rounded-xl focus:ring-primary focus:border-primary placeholder:text-slate-600 text-white p-3"
                          placeholder={t('roadmap.githubPlaceholder')}
                          type="text"
                        />
                      </div>
                      <p className="text-[10px] text-slate-500 mt-2 italic flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">info</span>
                        {t('roadmap.analyzeRepo')}
                      </p>
                    </div>
                    <div className="flex items-end">
                      <div className="glass-card w-full rounded-xl p-3 bg-primary/5 border-primary/20 flex items-center gap-4">
                        <div className="p-2 bg-primary/20 rounded-lg text-primary">
                          <span className="material-symbols-outlined">psychology</span>
                        </div>
                        <div>
                          <p className="text-[11px] font-bold text-primary">{t('roadmap.aiActive')}</p>
                          <p className="text-[10px] text-slate-400">{t('roadmap.aiVersion')}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Submit Button */}
              <div className="flex flex-col items-center gap-6 pt-4">
                <button
                  onClick={handleGenerateRoadmap}
                  className="w-full max-w-md px-10 py-5 bg-gradient-to-r from-primary to-purple-600 hover:shadow-[0_0_40px_rgba(6,87,249,0.4)] text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1"
                >
                  <span className="material-symbols-outlined">rocket_launch</span>
                  {t('roadmap.generateButton')}
                </button>
              </div>

              {/* Generated Result Section - Oculto inicialmente */}
              {roadmapGenerated && (
                <section id="generated-roadmap" className="mt-12 space-y-6">
                <div className="mb-4">
                  <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-widest">{t('roadmap.roadmapName')}</label>
                  <div className="flex items-center gap-3 group">
                    <span className="material-symbols-outlined text-primary">edit_note</span>
                    <h3 className="text-3xl font-extrabold tracking-tight outline-none focus:bg-white/5 px-2 py-1 rounded-lg transition-all" contentEditable={true}>
                      Meu Roadmap de React Fullstack
                    </h3>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">fact_check</span>
                    <h3 className="text-2xl font-bold tracking-tight" contentEditable={true}>Fullstack React Mastery</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-primary/20 text-primary text-[10px] font-bold rounded-full border border-primary/30 uppercase tracking-widest">{t('roadmap.preview')}</span>
                  </div>
                </div>
                <div className="glass-card rounded-3xl overflow-hidden">
                  <PhaseModule
                    title="Phase 1: Advanced Frontend & State"
                    color="text-primary"
                    tasks={phase1Tasks}
                  />
                  <PhaseModule
                    title="Phase 2: Scalable Backend Architecture"
                    color="text-purple-400"
                    tasks={phase2Tasks}
                  />
                  <div className="p-6 bg-white/5">
                    <button className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white transition-colors mx-auto">
                      <span className="material-symbols-outlined">add_circle</span>
                      {t('roadmap.addNewPhase')}
                    </button>
                  </div>
                </div>

                {/* Final Action */}
                <div className="flex justify-center pt-4 pb-12">
                  <button className="group relative px-12 py-4 bg-primary text-white rounded-2xl font-bold shadow-[0_0_30px_rgba(6,87,249,0.3)] hover:shadow-[0_0_50px_rgba(6,87,249,0.5)] transition-all overflow-hidden">
                    <span className="relative z-10 flex items-center gap-2">
                      <span className="material-symbols-outlined">save</span>
                      {t('roadmap.saveRoadmap')}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </button>
                </div>
              </section>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
