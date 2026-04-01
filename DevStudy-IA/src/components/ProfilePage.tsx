import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  const [activeItem, setActiveItem] = useState('settings');

  const menuItems = [
    { id: 'dashboard', icon: 'dashboard', label: 'Dashboard', href: '/dashboard' },
    { id: 'sessions', icon: 'auto_stories', label: 'Study Sessions', href: '/study-sessions' },
    { id: 'roadmaps', icon: 'map', label: 'Roadmaps', href: '/roadmaps' },
    { id: 'about', icon: 'info', label: 'About', href: '/about' },
    { id: 'settings', icon: 'settings', label: 'Settings', href: '/profile', active: true },
  ];

  return (
    <aside className="w-64 border-r border-slate-800 flex flex-col bg-[#0b1120] h-full shrink-0 hidden lg:flex">
      <div className="p-6 flex flex-col gap-6 h-full justify-between">
        <div className="flex flex-col gap-8">
          {/* Brand Logo */}
          <Link to="/" className="flex gap-3 items-center transition-opacity hover:opacity-90 cursor-pointer">
            <div className="bg-primary rounded-lg p-2 text-white shadow-lg shadow-primary/20">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
            </div>
            <div className="flex flex-col">
              <h1 className="text-white text-base font-extrabold leading-tight tracking-tight">
                DevStudy <span className="text-primary">AI</span>
              </h1>
            </div>
          </Link>
          <nav className="flex flex-col gap-1.5">
            {menuItems.map((item) => (
              <Link
                key={item.id}
                to={item.href}
                onClick={() => setActiveItem(item.id)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                  activeItem === item.id
                    ? 'bg-primary text-white shadow-lg shadow-primary/25'
                    : 'text-slate-400 hover:bg-slate-800'
                }`}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <span className="text-sm font-semibold">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
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
    <header className="h-16 border-b border-slate-800 bg-[#0f172a]/80 backdrop-blur-md flex items-center justify-between px-8 shrink-0 z-10">
      <div className="flex items-center gap-4">
        <h2 className="text-white text-lg font-bold">{t('topbar.accountSettings')}</h2>
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
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full border-2 border-primary/30 p-0.5">
            <UserAvatar user={user} size="w-full h-full" />
          </div>
        </div>
      </div>
    </header>
  );
}

// ==================== ROADMAP ITEM COMPONENT ====================
function RoadmapItem({ icon, title, progress, date, color, borderColor }: { icon: string; title: string; progress: string; date: string; color: string; borderColor: string }) {
  return (
    <div className={`glass-card rounded-2xl p-5 flex items-center justify-between group hover:border-primary/60 transition-all border ${borderColor} shadow-lg`}>
      <div className="flex items-center gap-4">
        <div className={`h-12 w-12 rounded-xl ${color} flex items-center justify-center border ${borderColor}`}>
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        <div>
          <h5 className="font-bold text-white group-hover:text-primary transition-colors">{title}</h5>
          <p className="text-sm text-slate-400">Progress: {progress} • Updated {date}</p>
        </div>
      </div>
      <button className="h-10 w-10 flex items-center justify-center rounded-xl text-slate-500 hover:bg-red-500/20 hover:text-red-500 transition-all">
        <span className="material-symbols-outlined">delete</span>
      </button>
    </div>
  );
}

// ==================== MAIN PROFILE PAGE ====================
export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    }
    getUser();
  }, []);

  const roadmaps = [
    { icon: 'terminal', title: 'Fullstack React Engineer', progress: '65%', date: '2 days ago', color: 'bg-primary/30', borderColor: 'border-primary/40' },
    { icon: 'psychology', title: 'AI Architecture', progress: '12%', date: '1 week ago', color: 'bg-purple-500/30', borderColor: 'border-purple-500/40' },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-[#0f172a]">
      <Sidebar />
      {/* Main Workspace */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        {/* Scrollable Body */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-4xl mx-auto space-y-10">
            {/* Section Header */}
            <div>
              <h3 className="text-3xl font-black text-white tracking-tight">Preferences</h3>
              <p className="text-slate-400">Manage your profile and learning roadmap configurations.</p>
            </div>
            {/* Account Settings Card */}
            <section className="glass-card rounded-3xl p-8 shadow-2xl overflow-hidden relative border border-white/10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <div className="relative group">
                    <UserAvatar user={user} size="h-24 w-24 rounded-2xl" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-extrabold text-white tracking-tight">{user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}</h4>
                    <p className="text-slate-400">{user?.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 self-start md:self-center">
                  <button className="flex items-center gap-2 rounded-2xl bg-red-500/10 px-6 py-3 font-bold text-red-400 transition hover:bg-red-500/20 border border-red-500/20">
                    <span className="material-symbols-outlined !text-xl">logout</span>
                    <span>Logout</span>
                  </button>
                  <button className="flex items-center gap-2 rounded-2xl bg-red-500/10 px-4 py-3 font-bold text-red-400 transition hover:bg-red-500/20 border border-red-500/20" title="Delete Account">
                    <span className="material-symbols-outlined !text-xl">delete</span>
                  </button>
                </div>
              </div>
            </section>
            {/* Roadmaps Management */}
            <section className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">map</span>
                  <h2 className="text-xl font-bold text-white">Manage Roadmaps</h2>
                </div>
                <span className="rounded-full bg-primary/10 px-4 py-1 text-xs font-bold text-primary uppercase border border-primary/20 tracking-wider">
                  2 Active
                </span>
              </div>
              <div className="grid gap-4">
                {roadmaps.map((roadmap, index) => (
                  <RoadmapItem key={index} {...roadmap} />
                ))}
                {/* Create Action */}
                <Link
                  to="/roadmaps"
                  className="w-full flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-700 py-6 text-slate-400 transition hover:border-primary/50 hover:text-primary hover:bg-primary/5"
                >
                  <span className="material-symbols-outlined">add_circle</span>
                  <span className="font-bold">Create New Roadmap</span>
                </Link>
              </div>
            </section>
            {/* Footer Actions */}
            <div className="flex items-center justify-end gap-4 pt-4 pb-20">
              <button className="rounded-2xl border border-slate-700 px-8 py-3.5 font-bold text-slate-400 transition hover:bg-slate-800">
                Cancel
              </button>
              <button className="bg-primary hover:bg-primary/90 rounded-2xl px-12 py-3.5 font-bold text-white shadow-xl shadow-primary/20 transition hover:scale-[1.02] hover:shadow-primary/30 active:scale-95">
                Save Changes
              </button>
            </div>
          </div>
        </main>
      </div>
      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1 rounded-3xl glass-card px-2 py-2 shadow-2xl lg:hidden z-50">
        <Link to="/dashboard" className="flex h-12 w-12 items-center justify-center rounded-2xl text-slate-400 transition hover:text-white">
          <span className="material-symbols-outlined">home</span>
        </Link>
        <Link to="/roadmaps" className="flex h-12 w-12 items-center justify-center rounded-2xl text-slate-400 transition hover:text-white">
          <span className="material-symbols-outlined">map</span>
        </Link>
        <Link to="/profile" className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-lg">
          <span className="material-symbols-outlined">settings</span>
        </Link>
      </nav>
    </div>
  );
}
