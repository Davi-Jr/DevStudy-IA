import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useLanguage } from '@/lib/i18n';

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

// ==================== SIDEBAR COMPONENT ====================
function Sidebar() {
  const [activeItem, setActiveItem] = useState('dashboard');
  const { t } = useLanguage();
  
  const menuItems = [
    { id: 'dashboard', icon: 'dashboard', label: 'Dashboard', href: '/dashboard' },
    { id: 'roadmaps', icon: 'map', label: t('sidebar.roadmaps'), href: '/roadmaps' },
    { id: 'sessions', icon: 'auto_stories', label: t('sidebar.studySessions'), href: '#' },
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
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors group ${
              activeItem === item.id
                ? 'bg-primary/10 text-primary'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span className="text-sm font-semibold">{item.label}</span>
          </Link>
        ))}
      </nav>
      <div className="p-4 mt-auto">
<Link to="/roadmaps" className="relative w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl py-3 px-4 cursor-pointer overflow-hidden font-bold bg-[length:200%_100%]">
            {/* Onda suave - apenas azul */}
            <span className="absolute inset-0 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-[length:150%_100%] opacity-80 animate-[gradient-wave_4s_ease-in-out_infinite]"></span>
            {/* Borda suave */}
            <span className="absolute inset-0 rounded-xl ring-1 ring-white/10"></span>
            {/* Conteúdo */}
            <span className="relative z-10 flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">add_circle</span>
              <span>{t('sidebar.newRoadmap')}</span>
            </span>
          </Link>
      </div>
    </aside>
  );
}

// ==================== TOP BAR COMPONENT ====================
function TopBar({ user }: { user: any }) {
  const { t, language, setLanguage } = useLanguage();
  
  return (
    <header className="grid h-16 grid-cols-[1fr_auto_1fr] items-center px-8 bg-transparent border-b border-white/5 gap-4">
      <div></div>
      <div className="flex justify-center">
        <div className="relative w-full max-w-[130rem] min-w-[24rem]">

          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg leading-none">
            search
          </span>
          <input
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-1 focus:ring-primary/30 focus:border-primary/30 text-white placeholder:text-slate-500 outline-none transition-colors"
            placeholder={t('dashboard.searchPlaceholder')}
            type="text"
          />
        </div>
      </div>
      <div className="flex items-center justify-end gap-6">
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
        <div className="h-8 w-px bg-white/10"></div>
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="text-right">
            <p className="text-sm font-bold text-white leading-none">{user?.user_metadata?.full_name || 'User'}</p>
            <p className="text-xs text-slate-400 mt-1">{user?.email}</p>
          </div>
          <div className="size-10 rounded-full border-2 border-primary/20 p-0.5 group-hover:border-primary transition-colors">
            <UserAvatar user={user} size="w-full h-full" />
          </div>
        </div>
      </div>
    </header>
  );
}

// ==================== EMPTY STATE COMPONENT ====================
function EmptyState() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  const steps = [
    { icon: 'edit_note', title: t('dashboard.empty.step1Title'), description: t('dashboard.empty.step1Desc') },
    { icon: 'auto_awesome', title: t('dashboard.empty.step2Title'), description: t('dashboard.empty.step2Desc') },
    { icon: 'school', title: t('dashboard.empty.step3Title'), description: t('dashboard.empty.step3Desc') },
  ];

  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="max-w-2xl w-full">
        {/* Icon and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
            <span className="material-symbols-outlined text-5xl text-primary">route</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-3">{t('dashboard.empty.title')}</h2>
          <p className="text-slate-400 text-lg">{t('dashboard.empty.subtitle')}</p>
        </div>

        {/* Steps to Create Roadmap */}
        <div className="glass-effect rounded-2xl p-8 border border-white/10">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">orbit</span>
            {t('dashboard.empty.howToStart')}
          </h3>
          
          <div className="space-y-6">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary">{step.icon}</span>
                </div>
                <div>
                  <h4 className="text-white font-bold text-base">{step.title}</h4>
                  <p className="text-slate-400 text-sm mt-1">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="absolute left-5 w-px h-8 bg-primary/30 ml-4"></div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <button
              onClick={() => navigate('/roadmaps')}
              className="relative w-full bg-gradient-to-r from-blue-500 via-blue-400 to-yellow-200 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3 cursor-pointer overflow-hidden bg-[length:200%_100%]"
            >
              {/* Onda suave - divisão clara entre azul e amarelo claro */}
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-blue-300 to-yellow-200 bg-[length:150%_100%] opacity-80 animate-[gradient-wave_4s_ease-in-out_infinite]"></span>
              {/* Borda suave */}
              <span className="absolute inset-0 rounded-xl ring-1 ring-white/10"></span>
              <span className="relative z-10 flex items-center gap-2">
                <span className="material-symbols-outlined">add_circle</span>
                {t('dashboard.empty.createRoadmap')}
              </span>
            </button>
            <p className="text-center text-slate-500 text-sm mt-4">
              {t('dashboard.empty.redirectToRoadmaps')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== STUDY STATS COMPONENT ====================
function StudyStats({ roadmaps }: { roadmaps: any[] }) {
  const { t } = useLanguage();
  
  const completedRoadmaps = roadmaps.filter(r => r.status === 'completed').length;
  const inProgressRoadmaps = roadmaps.filter(r => r.status === 'in_progress').length;
  
  const stats = [
    { icon: 'alt_route', value: roadmaps.length, label: t('dashboard.stats.totalRoadmaps'), color: 'accent-blue' },
    { icon: 'play_circle', value: inProgressRoadmaps, label: t('dashboard.stats.inProgress'), color: 'accent-purple' },
    { icon: 'check_circle', value: completedRoadmaps, label: t('dashboard.stats.completed'), color: 'accent-green' },
  ];

  const weeklyData = [30, 45, 80, 60, 90, 55, 70];
  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  return (
    <div className="glass-effect rounded-xl p-6 shadow-sm">
      <h4 className="text-lg font-bold text-white mb-6">{t('dashboard.stats.title')}</h4>
      <div className="space-y-6">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className="size-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined">{stat.icon}</span>
            </div>
            <div>
              <p className="text-2xl font-black text-white">{stat.value}</p>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 pt-6 border-t border-white/5">
        <p className="text-sm font-bold text-slate-300 mb-4">{t('dashboard.stats.weeklyActivity')}</p>
        <div className="flex items-end justify-between h-20 gap-1">
          {weeklyData.map((height, index) => (
            <div
              key={index}
              className={`w-full rounded-t-sm ${index === 3 ? 'bg-primary' : 'bg-primary/20'}`}
              style={{ height: `${height}%` }}
            ></div>
          ))}
        </div>
        <div className="flex justify-between mt-2">
          {days.map((day, index) => (
            <span key={index} className="text-[10px] text-slate-400 font-bold">{day}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==================== NEXT TASKS COMPONENT ====================
function NextTasks({ roadmap }: { roadmap: any }) {
  const { t } = useLanguage();
  
  // Get tasks from roadmap items if available
  const tasks = roadmap?.items?.slice(0, 4) || [
    { icon: 'code', title: t('dashboard.tasks.defaultTask'), time: '2 hours', level: 'Beginner', locked: false },
  ];

  const getLevelColor = (level: string) => {
    switch (level?.toLowerCase()) {
      case 'beginner':
        return 'bg-green-400/20 text-green-400 border-green-400/30';
      case 'intermediate':
        return 'bg-blue-400/20 text-blue-400 border-blue-400/30';
      case 'advanced':
        return 'bg-red-400/20 text-red-400 border-red-400/30';
      case 'devops':
        return 'bg-purple-400/20 text-purple-400 border-purple-400/30';
      default:
        return 'bg-slate-400/20 text-slate-400 border-slate-400/30';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-bold text-white">{t('dashboard.tasks.title')}</h4>
        <a className="text-primary text-sm font-semibold hover:underline" href="#">{t('dashboard.tasks.viewAll')}</a>
      </div>
      <div className="grid grid-cols-1 gap-3">
        {tasks.map((task: any, index: number) => (
          <div key={index} className="glass-effect p-4 rounded-xl flex items-center justify-between hover:border-primary/50 transition-colors group">
            <div className="flex items-center gap-4">
              <div className="size-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-500 group-hover:text-primary transition-colors">
                <span className="material-symbols-outlined">{task.icon || 'code'}</span>
              </div>
              <div>
                <p className="text-sm font-bold text-white">{task.title || task.name}</p>
                <p className="text-xs text-slate-400">{t('dashboard.tasks.estimated')}: {task.estimated_time || '2 hours'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* Level Badge */}
              <span className={`text-[10px] font-bold px-2 py-1 rounded-lg border ${getLevelColor(task.level)}`}>
                {task.level || 'Beginner'}
              </span>
              {task.locked ? (
                <span className="material-symbols-outlined text-slate-400">lock</span>
              ) : (
                <button className="size-8 rounded-full border border-slate-700 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all">
                  <span className="material-symbols-outlined text-sm">play_arrow</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==================== RECENT ACTIVITY COMPONENT ====================
function RecentActivity({ roadmaps }: { roadmaps: any[] }) {
  const { t } = useLanguage();
  
  const activities = roadmaps.slice(0, 3).map(r => ({
    title: r.title,
    time: new Date(r.created_at).toLocaleDateString(),
  }));

  // Default activities if no roadmaps
  const defaultActivities = [
    { title: t('dashboard.activity.noActivity1'), time: t('dashboard.activity.noActivityTime1') },
    { title: t('dashboard.activity.noActivity2'), time: t('dashboard.activity.noActivityTime2') },
  ];

  const displayActivities = activities.length > 0 ? activities : defaultActivities;

  return (
    <div className="glass-effect rounded-xl p-6 shadow-sm">
      <h4 className="text-lg font-bold text-white mb-6">{t('dashboard.activity.title')}</h4>
      <div className="space-y-5">
        {displayActivities.map((activity, index) => (
          <div key={index} className={`flex gap-3 relative ${index < displayActivities.length - 1 ? '' : ''}`}>
            {index < displayActivities.length - 1 && (
              <div className="absolute left-[7px] top-6 bottom-0 w-px bg-white/10"></div>
            )}
            <div className="size-4 rounded-full bg-primary mt-1 relative z-10"></div>
            <div>
              <p className="text-sm font-bold text-white">{activity.title}</p>
              <p className="text-xs text-slate-500 mt-0.5">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==================== MAIN DASHBOARD PAGE ====================
export default function DashBoardPage() {
  const [user, setUser] = useState<any>(null);
  const [roadmaps, setRoadmaps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    checkUserAndRoadmaps();
  }, []);

  async function checkUserAndRoadmaps() {
    try {
      // Get current user
      const { data: { user: currentUser }, error: userError } = await supabase.auth.getUser();
      
      if (userError) {
        console.error('Error getting user:', userError);
        setError(userError.message);
        // If not logged in, redirect to login
        navigate('/login');
        return;
      }

      if (!currentUser) {
        navigate('/login');
        return;
      }

      setUser(currentUser);

      // Get user's roadmaps
      const { data: roadmapsData, error: roadmapsError } = await supabase
        .from('roadmaps')
        .select('*')
        .eq('user_id', currentUser.id)
        .order('created_at', { ascending: false });

      if (roadmapsError) {
        console.error('Error fetching roadmaps:', roadmapsError);
        setError(roadmapsError.message);
      } else {
        setRoadmaps(roadmapsData || []);
      }
    } catch (err: any) {
      console.error('Unexpected error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Get the current active roadmap (most recent in_progress or first one)
  const currentRoadmap = roadmaps.find(r => r.status === 'in_progress') || roadmaps[0];

  if (loading) {
    return (
      <div className="flex h-screen overflow-hidden bg-[#0f172a]">
        <Sidebar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-400">{t('dashboard.loading')}</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#0f172a]">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <TopBar user={user} />
        
        {roadmaps.length === 0 ? (
          // Show empty state if no roadmaps
          <EmptyState />
        ) : (
          // Show dashboard with data
          <div className="flex-1 overflow-y-auto p-8 space-y-8">
            {/* Welcome Header */}
            <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-extrabold text-white tracking-tight">
                  {t('dashboard.welcome')} {user?.user_metadata?.full_name?.split(' ')[0] || 'User'}! 👋
                </h2>
                <p className="text-slate-400 mt-1">{t('dashboard.welcomeMessage')}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-slate-800 rounded-xl px-4 py-2 flex items-center gap-3 border border-slate-800">
                  <div className="size-8 bg-orange-500/20 text-orange-500 rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-lg">local_fire_department</span>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider leading-none">{t('dashboard.streak')}</p>
                    <p className="text-sm font-bold text-white">0 {t('dashboard.days')}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Progress Widget */}
              <div className="lg:col-span-2 space-y-8">
                {/* Progress Widget - Circular Progress with Roadmap */}
                <div className="glass-effect rounded-xl p-6 shadow-sm overflow-hidden relative group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                  <div className="relative flex flex-col md:flex-row items-center gap-8">
                    {/* Circular Progress */}
                    <div className="relative size-40 shrink-0">
                      <svg className="size-full" viewBox="0 0 100 100">
                        <circle className="text-white/10 stroke-current" cx="50" cy="50" fill="transparent" r="40" strokeWidth="8"></circle>
                        <circle className="text-primary stroke-current" cx="50" cy="50" fill="transparent" r="40" strokeDasharray="251.2" strokeDashoffset="62.8" strokeLinecap="round" strokeWidth="8"></circle>
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-black text-white">{currentRoadmap?.progress || 0}%</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('dashboard.done')}</span>
                      </div>
                    </div>
                    {/* Roadmap Info */}
                    <div className="flex-1 text-center md:text-left">
                      <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">{t('dashboard.currentRoadmap')}</span>
                      <h3 className="text-2xl font-bold text-white mt-2">{currentRoadmap?.title || t('dashboard.noRoadmap')}</h3>
                      <p className="text-slate-400 mt-2 text-sm leading-relaxed">{currentRoadmap?.description || t('dashboard.noDescription')}</p>
                      <div className="mt-6 flex flex-wrap gap-4 justify-center md:justify-start">
                        <button className="bg-white/5 text-slate-300 text-sm font-bold px-6 py-2.5 rounded-xl hover:bg-white/10 transition-colors border border-white/10">{t('dashboard.viewDetails')}</button>
                      </div>
                    </div>
                  </div>
                </div>
                <NextTasks roadmap={currentRoadmap} />
              </div>

              {/* Sidebar Stats */}
              <div className="space-y-8">
                <StudyStats roadmaps={roadmaps} />
                <RecentActivity roadmaps={roadmaps} />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
