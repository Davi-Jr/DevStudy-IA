import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useLanguage } from '@/lib/i18n';

function UserAvatar({ user, size = 'size-10' }: { user: any; size?: string }) {
  const { t } = useLanguage();
  const avatarUrl = user?.user_metadata?.avatar_url || user?.user_metadata?.picture;
  const fullName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || t('code.userFallback');
  const initials = fullName
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  if (avatarUrl) {
    return <img alt={fullName} className={`${size} rounded-full object-cover bg-slate-200`} src={avatarUrl} />;
  }

  return (
    <div className={`${size} rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold`}>
      <span className="text-sm">{initials}</span>
    </div>
  );
}

function Sidebar() {
  const location = useLocation();
  const { t } = useLanguage();

  const menuItems = [
    { id: 'dashboard', icon: 'dashboard', label: t('topbar.pages'), href: '/dashboard' },
    { id: 'roadmaps', icon: 'alt_route', label: t('sidebar.roadmaps'), href: '/roadmaps' },
    { id: 'sessions', icon: 'menu_book', label: t('sidebar.studySessions'), href: '/study-session' },
    { id: 'about', icon: 'info', label: t('sidebar.about'), href: '/about' },
    { id: 'settings', icon: 'settings', label: t('sidebar.settings'), href: '/profile' },
  ];

  return (
    <aside className="w-64 border-r border-slate-800 flex flex-col bg-[#0b1120] h-full shrink-0">
      <div className="p-6 flex flex-col gap-6 h-full justify-between">
        <div className="flex flex-col gap-8">
          <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-90 cursor-pointer">
            <div className="w-8 h-8 bg-primary rounded-twelve flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
            </div>
            <span className="font-bold text-xl tracking-tight text-white">
              DevStudy <span className="text-primary">AI</span>
            </span>
          </Link>
          <nav className="flex flex-col gap-1.5">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.id}
                  to={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <span className="material-symbols-outlined">{item.icon}</span>
                  <span className="text-sm font-semibold">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-2 mt-auto">
          <Link
            to="/roadmaps"
            className="relative w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl py-3 px-4 cursor-pointer overflow-hidden font-bold bg-[length:200%_100%] transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/30"
          >
            <span className="absolute inset-0 pointer-events-none bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-[length:150%_100%] opacity-80 animate-[gradient-wave_4s_ease-in-out_infinite]"></span>
            <span className="absolute inset-0 pointer-events-none rounded-xl ring-1 ring-white/10"></span>
            <span className="relative z-10 flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">add_circle</span>
              <span>{t('sidebar.newRoadmap')}</span>
            </span>
          </Link>
        </div>
      </div>
    </aside>
  );
}

function TopBar() {
  const [user, setUser] = useState<any>(null);
  const { t, language, setLanguage } = useLanguage();

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
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
            <div className="relative">
              <input
                className="w-64 bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/50 text-white placeholder:text-slate-500"
                placeholder={t('dashboard.searchPlaceholder')}
                type="text"
              />
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg leading-none">search</span>
            </div>
            <div className="relative group">
              <div className="flex items-center gap-3 cursor-pointer">
                <div className="text-right">
                  <p className="text-sm font-bold text-white leading-none">{user?.user_metadata?.full_name || t('code.userFallback')}</p>
                  <p className="text-xs text-slate-400 mt-1">{user?.email}</p>
                </div>
                <div className="size-10 rounded-full border-2 border-primary/20 p-0.5 group-hover:border-primary transition-colors">
                  <UserAvatar user={user} size="w-full h-full" />
                </div>
              </div>
              <div className="absolute right-0 top-full mt-2 w-44 glass-effect rounded-twelve overflow-hidden border border-white/5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 shadow-xl">
                <Link to="/profile" className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-primary/20 transition-colors cursor-pointer text-slate-300 hover:text-white">
                  <span className="material-symbols-outlined text-lg">settings</span>
                  {t('topbar.accountSettings')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function RoadmapCard({
  status,
  statusLabel,
  title,
  description,
  progress,
  note,
  action,
  progressLabel,
}: {
  status: 'In Progress' | 'Planned' | 'Paused';
  statusLabel: string;
  title: string;
  description: string;
  progress: number;
  note: string;
  action: string;
  progressLabel: string;
}) {
  const statusClasses = {
    'In Progress': 'bg-green-500/10 text-green-400 border-green-500/20',
    Planned: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    Paused: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  };

  return (
    <div className="glass-effect rounded-3xl overflow-hidden hover:border-primary/50 transition-all group border border-white/5">
      <div className="p-6 flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-56 h-36 rounded-2xl shrink-0 overflow-hidden relative shadow-lg bg-gradient-to-br from-blue-900/60 to-purple-900/60">
          <img
            className="w-full h-full object-cover grayscale brightness-75 group-hover:scale-105 transition-transform duration-500"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD89WlZH9Ib30gRZSNs45rCimtVoTsRp4SkAJOkpJ1R3MvPizeP0kocukebyeAnR-fDUXAO7t2DTzM6pGbuC4l54zWtVvY-KUoK43IgS5RngdVEFfQOnoFc0970EBbyn0jl6cDZ7OQGUtszTg_UBheM1MAxwCieTUSmC0AKpjxQL9GhzAXcOWndpxywP4c1v67foj9PwSw_jnv2DZuuD3LS8k7zrDp48V7wG-o-BQ3-LMGxzC5kqKM27DTj7i6gSkTQqT27HTUSWf8"
            alt={title}
          />
        </div>

        <div className="flex-1 flex flex-col justify-between py-1">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded-full border ${statusClasses[status]}`}>
                {statusLabel}
              </span>
              <span className="text-slate-500 text-xs font-medium">• {note}</span>
            </div>
            <h4 className="text-2xl font-extrabold text-white mb-1.5 tracking-tight">{title}</h4>
            <p className="text-slate-400 text-sm max-w-lg leading-relaxed">{description}</p>
          </div>

            <div className="mt-6 flex flex-col gap-3">
            <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
              <span className="text-slate-400">{progressLabel}</span>
              <span className="text-primary">{progress}%</span>
            </div>
            <div className="h-2.5 w-full bg-slate-800/50 rounded-full overflow-hidden border border-white/5">
              <div className="h-full bg-gradient-to-r from-primary to-purple-500 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="flex justify-end mt-2">
              <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-xl text-sm font-bold transition-all">
                {action}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StudySessionPage() {
  const { t } = useLanguage();

  return (
    <div className="flex h-screen overflow-hidden bg-[#0f172a]">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden pt-16">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-8 bg-gradient-to-br from-[#0f172a] to-[#0b1120]">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex justify-between items-end">
              <div className="space-y-1">
                <h3 className="text-3xl font-black text-white tracking-tight">{t('sidebar.roadmaps')}</h3>
                <p className="text-slate-400">
                  {t('code.description')}
                </p>
              </div>
              <Link to="/roadmaps" className="bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-xl shadow-primary/30 transform hover:-translate-y-0.5">
                <span className="material-symbols-outlined">add</span>
                {t('sidebar.newRoadmap')}
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <RoadmapCard
                status="In Progress"
                statusLabel={t('code.status.inProgress')}
                title={t('code.card1.title')}
                description={t('code.card1.description')}
                progress={68}
                note={t('code.card1.note')}
                action={t('code.card1.action')}
                progressLabel={t('code.overallProgress')}
              />
              <RoadmapCard
                status="Planned"
                statusLabel={t('code.status.planned')}
                title={t('code.card2.title')}
                description={t('code.card2.description')}
                progress={2}
                note={t('code.card2.note')}
                action={t('code.card2.action')}
                progressLabel={t('code.overallProgress')}
              />
              <RoadmapCard
                status="Paused"
                statusLabel={t('code.status.paused')}
                title={t('code.card3.title')}
                description={t('code.card3.description')}
                progress={32}
                note={t('code.card3.note')}
                action={t('code.card3.action')}
                progressLabel={t('code.overallProgress')}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
