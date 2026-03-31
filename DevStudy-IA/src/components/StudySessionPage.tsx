import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useLanguage } from '@/lib/i18n';

// ==================== SIDEBAR COMPONENT ====================
function Sidebar() {
  const [activeItem, setActiveItem] = useState('sessions');

  const menuItems = [
    { id: 'dashboard', icon: 'dashboard', label: 'Dashboard', href: '/dashboard' },
    { id: 'roadmaps', icon: 'map', label: 'My Roadmaps', href: '/roadmaps' },
    { id: 'sessions', icon: 'auto_stories', label: 'Study Sessions', href: '/study-sessions' },
    { id: 'about', icon: 'info', label: 'About', href: '/about' },
    { id: 'settings', icon: 'settings', label: 'Settings', href: '/profile' },
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
      <nav className="flex-1 px-4 mt-4 space-y-1">
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
      <div className="p-4 mt-auto border-t border-slate-800">
        <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors w-full">
          <span className="material-symbols-outlined">logout</span>
          <span className="text-sm font-semibold">Logout</span>
        </button>
      </div>
    </aside>
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
    <header className="h-16 flex items-center justify-between px-8 border-b border-white/5 bg-[#0f172a]/50 backdrop-blur-md sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <h2 className="text-white text-lg font-bold">{t('topbar.studySessions')}</h2>
      </div>
      <div className="flex items-center gap-6">
        <div className="relative group">
          <button className="flex items-center gap-1 hover:text-primary transition-colors text-sm font-medium mr-4 py-2 cursor-pointer">
            <span className="material-symbols-outlined text-lg">language</span>
            {language === 'PT' ? 'PT-BR' : 'English'}
            <svg className="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
            </svg>
          </button>
          <div className="absolute right-0 top-full mt-2 w-32 glass-effect rounded-twelve overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
            <button onClick={() => setLanguage('PT')} className={`block w-full text-left px-4 py-2 text-sm hover:bg-primary/20 transition-colors cursor-pointer ${language === 'PT' ? 'text-primary' : ''}`}>PT-BR</button>
            <button onClick={() => setLanguage('EN')} className={`block w-full text-left px-4 py-2 text-sm hover:bg-primary/20 transition-colors cursor-pointer ${language === 'EN' ? 'text-primary' : ''}`}>English (EN)</button>
          </div>
        </div>
        <div className="relative">
          <input 
            className="w-64 bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/50 text-white placeholder:text-slate-500" 
            placeholder={t('dashboard.searchPlaceholder')} 
            type="text"
          />
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg leading-none">
            search
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl relative">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full ring-2 ring-[#0f172a]"></span>
          </button>
          <div className="h-10 w-10 rounded-full border-2 border-primary/30 p-0.5">
            <img 
              className="w-full h-full rounded-full object-cover" 
              data-alt="User profile picture" 
              src={user?.user_metadata?.avatar_url || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpPO_A7DY3J-kZIJtEae52F7A5kWa-IqMg4d76yopXmjWZixfxsAtAstibGw0-Np67gFZZhEqVn6Tk5d95Aq653UZaWaxNpVphbBi1YjkMMw8YH9DjwqDaimnCX9GV7qdwuM-X3Ufds0H53jBQdds4LyUP8OOt3-H3DGx5w2hChd_XhaVQykeLKPSkRO-QmSlMUJA4FBal4PPleegjD-HTxJmYg7szhK9EiEtxn-LlQEn7vbSxQFiU2k-1o2L2Kh4TUhUP0mOMPtc'} 
              alt="User profile"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

// ==================== ROADMAP CARD COMPONENTS ====================
interface RoadmapCardProps {
  status: 'in-progress' | 'planned' | 'paused';
  title: string;
  description: string;
  progress: number;
  nextTask?: string;
  timeInfo: string;
  technologies?: string[];
}

function RoadmapCard({ 
  status, 
  title, 
  description, 
  progress, 
  nextTask, 
  timeInfo,
  technologies = []
}: RoadmapCardProps) {
  const statusConfig = {
    'in-progress': {
      badge: 'In Progress',
      badgeClass: 'bg-green-500/10 text-green-400 border-green-500/20',
      progressGradient: 'bg-gradient-to-r from-primary to-purple-500',
      buttonText: 'Resume Study',
      buttonIcon: 'arrow_forward',
      buttonClass: 'bg-primary hover:bg-primary/90',
    },
    'planned': {
      badge: 'Planned',
      badgeClass: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      progressGradient: 'bg-slate-600',
      buttonText: 'Start Session',
      buttonIcon: 'play_arrow',
      buttonClass: 'bg-slate-700 hover:bg-slate-600',
    },
    'paused': {
      badge: 'Paused',
      badgeClass: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
      progressGradient: 'bg-primary/40',
      buttonText: 'Resume Session',
      buttonIcon: 'replay',
      buttonClass: 'bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20',
    }
  };

  const config = statusConfig[status];

  const getStatusIcon = () => {
    switch(status) {
      case 'in-progress': return 'play_circle';
      case 'planned': return 'history_edu';
      case 'paused': return 'pause_circle';
    }
  };

  return (
    <div className="glass-effect rounded-3xl overflow-hidden hover:border-primary/50 transition-all group">
      <div className="p-6 flex flex-col md:flex-row gap-6">
        {/* Image Section */}
        <div className="w-full md:w-56 h-36 rounded-2xl shrink-0 overflow-hidden relative shadow-lg">
          <div className={`absolute inset-0 ${
            status === 'in-progress' 
              ? 'bg-gradient-to-br from-blue-600/40 via-purple-600/40 to-transparent'
              : status === 'planned'
              ? 'bg-gradient-to-tr from-indigo-900/60 to-purple-900/60'
              : 'bg-gradient-to-br from-cyan-900/60 to-blue-900/60'
          } z-10`}></div>
          <div className={`absolute inset-0 ${
            status === 'in-progress' 
              ? "bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 z-10"
              : ''
          }`}></div>
          <img 
            className="w-full h-full object-cover grayscale brightness-75 group-hover:scale-105 transition-transform duration-500" 
            data-alt="Tech pattern" 
            src={
              status === 'in-progress'
                ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuD89WlZH9Ib30gRZSNs45rCimtVoTsRp4SkAJOkpJ1R3MvPizeP0kocukebyeAnR-fDUXAO7t2DTzM6pGbuC4l54zWtVvY-KUoK43IgS5RngdVEFfQOnoFc0970EBbyn0jl6cDZ7OQGUtszTg_UBheM1MAxwCieTUSmC0AKpjxQL9GhzAXcOWndpxywP4c1v67foj9PwSw_jnv2DZuuD3LS8k7zrDp48V7wG-o-BQ3-LMGxzC5kqKM27DTj7i6gSkTQqT27HTUSWf8'
                : status === 'planned'
                ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZDIKO6W460_DxCpvloRhry_f5IcS1JrpWQkrsdCdfcJNSM8D6iSyK5YB3S2KiwtnNjyWUm2H10gxCyER_m-XeR2cxC7NkG6FWdrMdMu8BqFLOjNufXqoNQtznnbFJnSIu745K4obwaSZsgcgzOeaZQDqggbRBU78Yvt4IiXyKcPa7GWpGK5LbonIBxFoMEPHFttmD4wqWdqF4Mcj8dTVDBCK6NTUNQ4Ujll6_r39YlmUFkTddsdGqqw7b0c2_noOEuckvnrBr0fc'
                : 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvyeooO-6ydaV8NkYTHHpwOvoJ8vLZVyL75h3YIu6y3RtdW35l9vvfx50cZByrYaEV3in8gyzFbbDqMfAuPGUBbnMoENyXFUH8dPOJp4yOV-51GbymzieYrRQa_VQLr1mKoX1HGc3KnXTH-ZjNJgzURkguUY6QS8SnpVQHCMbpclirtVdFnyAXimpeTWEiI5uFuePU8wJY6RcGyqzWH4TNoRKhltZ-os-FqXYPjbufF2BW-juhWta94senTfhsq584S9SehFo1U5s'
            }
            alt={title}
          />
          <div className={`absolute z-20 ${
            status === 'in-progress' 
              ? 'bottom-3 right-3 bg-black/40 backdrop-blur-md rounded-lg p-1.5'
              : status === 'planned'
              ? 'inset-0 flex items-center justify-center'
              : 'bottom-3 left-3'
          }`}>
            <span className={`material-symbols-outlined ${
              status === 'in-progress' 
                ? 'text-white text-[20px]'
                : status === 'planned'
                ? 'text-white/50 text-5xl'
                : 'text-white/70 text-[24px]'
            }`}>
              {status === 'in-progress' ? 'code' : status === 'planned' ? 'psychology' : 'cloud_queue'}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 flex flex-col justify-between py-1">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded-full border ${config.badgeClass}`}>
                  {config.badge}
                </span>
                <span className="text-slate-500 text-xs font-medium">• {timeInfo}</span>
              </div>
              <h4 className="text-2xl font-extrabold text-white mb-1.5 tracking-tight">{title}</h4>
              <p className="text-slate-400 text-sm max-w-lg leading-relaxed">{description}</p>
            </div>
            <div className="flex gap-2">
              {technologies.length > 0 ? (
                technologies.map((tech, idx) => (
                  <div key={idx} className="w-10 h-10 flex items-center justify-center bg-slate-800/50 rounded-xl text-slate-300 border border-slate-700/50">
                    <span className="material-symbols-outlined text-[20px]">{tech}</span>
                  </div>
                ))
              ) : status === 'planned' ? (
                <div className="w-10 h-10 flex items-center justify-center bg-slate-800/50 rounded-xl text-slate-300 border border-slate-700/50">
                  <span className="material-symbols-outlined text-[20px]">smart_toy</span>
                </div>
              ) : (
                <div className="w-10 h-10 flex items-center justify-center bg-slate-800/50 rounded-xl text-slate-300 border border-slate-700/50">
                  <span className="material-symbols-outlined text-[20px]">terminal</span>
                </div>
              )}
            </div>
          </div>

          {/* Progress Section */}
          <div className="mt-6 flex flex-col gap-3">
            <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
              <span className="text-slate-400">Overall Progress</span>
              <span className={status === 'planned' ? 'text-slate-500' : 'text-primary'}>{progress}%</span>
            </div>
            <div className="h-2.5 w-full bg-slate-800/50 rounded-full overflow-hidden border border-white/5">
              <div 
                className={`h-full ${config.progressGradient} rounded-full ${status === 'in-progress' ? 'shadow-[0_0_12px_rgba(168,85,247,0.4)]' : ''}`} 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between items-center mt-3">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                <span className="material-symbols-outlined text-[16px] text-primary">{getStatusIcon()}</span>
                {status === 'in-progress' && nextTask && (
                  <>
                    Next: <span className="text-slate-200">{nextTask}</span>
                  </>
                )}
                {status === 'planned' && (
                  <>
                    Estimated time: <span className="text-slate-200">{timeInfo}</span>
                  </>
                )}
                {status === 'paused' && nextTask && (
                  <>
                    Paused at: <span className="text-slate-200">{nextTask}</span>
                  </>
                )}
              </div>
              <button className={`${config.buttonClass} text-white px-6 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-lg ${status === 'in-progress' ? 'shadow-primary/20' : 'shadow-black/20'}`}>
                {config.buttonText}
                <span className="material-symbols-outlined text-[18px]">{config.buttonIcon}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Expand Footer */}
      <div className="border-t border-slate-700/30 bg-slate-900/40 px-6 py-3.5 flex items-center justify-center cursor-pointer hover:bg-slate-900/60 transition-colors group/expand">
        <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest flex items-center gap-2 group-hover/expand:text-slate-400">
          {status === 'in-progress' ? 'Show 12 more sub-tasks' : status === 'planned' ? 'Show Curriculum' : 'View Completed Modules'}
          <span className="material-symbols-outlined text-[16px] group-hover/expand:translate-y-0.5 transition-transform">expand_more</span>
        </span>
      </div>
    </div>
  );
}

// ==================== MAIN CONTENT COMPONENT ====================
function MainContent() {
  const roadmaps = [
    {
      status: 'in-progress' as const,
      title: 'Fullstack React Engineer',
      description: 'Mastering modern frontend architecture, Node.js backend integration, and scalable deployment strategies.',
      progress: 68,
      nextTask: 'Advanced Hooks & Custom Patterns',
      timeInfo: 'Last active 2h ago',
      technologies: ['javascript', 'database'],
    },
    {
      status: 'planned' as const,
      title: 'AI Architecture with LLMs',
      description: 'Advanced prompt engineering, RAG pipelines, and fine-tuning open-source models for enterprise apps.',
      progress: 0,
      timeInfo: 'Created 3 days ago',
      technologies: [],
    },
    {
      status: 'paused' as const,
      title: 'Cloud Native & DevOps',
      description: 'Containers, Kubernetes orchestration, and CI/CD pipelines with GitHub Actions.',
      progress: 32,
      nextTask: 'K8s Pods & Services',
      timeInfo: 'Last active 2 weeks ago',
      technologies: [],
    },
  ];

  return (
    <main className="flex-1 overflow-y-auto bg-gradient-to-br from-[#0f172a] to-[#0b1120] p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Summary Row */}
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <h3 className="text-3xl font-black text-white tracking-tight">My Roadmaps</h3>
            <p className="text-slate-400">Track your learning journey and launch deep-dive AI study sessions.</p>
          </div>
          <button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-xl shadow-primary/30 transform hover:-translate-y-0.5">
            <span className="material-symbols-outlined">add</span>
            New Roadmap
          </button>
        </div>

        {/* Roadmap Cards Grid */}
        <div className="grid grid-cols-1 gap-6">
          {roadmaps.map((roadmap, index) => (
            <RoadmapCard key={index} {...roadmap} />
          ))}
        </div>
      </div>
    </main>
  );
}

// ==================== PAGE COMPONENT ====================
export default function StudySessionPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#0f172a]">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <MainContent />
      </div>
    </div>
  );
}
