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
  const [activeItem, setActiveItem] = useState('settings');
  const { t } = useLanguage();

  const menuItems = [
    { id: 'dashboard', icon: 'dashboard', label: 'Dashboard', href: '/dashboard' },
    { id: 'roadmaps', icon: 'alt_route', label: t('sidebar.roadmaps'), href: '/roadmaps' },
    { id: 'sessions', icon: 'menu_book', label: t('sidebar.studySessions'), href: '#' },
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
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
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

// ==================== TOP BAR COMPONENT ====================
function TopBar() {
  const { t, language, setLanguage } = useLanguage();

  return (
    <header className="h-16 border-b border-white/5 glass-effect flex items-center justify-between px-8 shrink-0 z-10">
      <div className="flex items-center gap-4">
        <h2 className="text-white text-lg font-bold">{t('topbar.accountSettings')}</h2>
      </div>
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
    </header>
  );
}

// ==================== ROADMAP ITEM COMPONENT ====================
function RoadmapItem({ icon, title, progress, dateLabel, color, borderColor, onDelete }: { icon: string; title: string; progress: string; dateLabel: string; color: string; borderColor: string; onDelete: () => void }) {
  const { t } = useLanguage();
  return (
    <div className={`glass-card rounded-2xl p-5 flex items-center justify-between group hover:border-primary/60 transition-all border ${borderColor} shadow-lg`}>
      <div className="flex items-center gap-4">
        <div className={`h-12 w-12 rounded-xl ${color} flex items-center justify-center border ${borderColor}`}>
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        <div>
          <h5 className="font-bold text-white group-hover:text-primary transition-colors">{title}</h5>
          <p className="text-sm text-slate-400">{t('profile.progress')}: {progress} • {t('profile.updated')} {dateLabel}</p>
        </div>
      </div>
      <button onClick={onDelete} className="h-10 w-10 flex items-center justify-center rounded-xl text-slate-500 hover:bg-red-500/20 hover:text-red-500 transition-all cursor-pointer">
        <span className="material-symbols-outlined">delete</span>
      </button>
    </div>
  );
}

// ==================== CONFIRM MODAL COMPONENT ====================
function ConfirmModal({ open, title, message, confirmLabel, cancelLabel = 'profile.cancel', onConfirm, onCancel, variant = 'danger' }: {
  open: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: 'danger' | 'warning';
}) {
  const { t } = useLanguage();

  if (!open) return null;

  const btnClass = variant === 'danger'
    ? 'bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/25'
    : 'bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-500/25';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onCancel}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-sm" />

      {/* Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative glass-card rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-white/20 bg-slate-800/50 animate-[fadeIn_0.2s_ease-out]"
      >
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className={`w-14 h-14 rounded-full flex items-center justify-center ${variant === 'danger' ? 'bg-red-500/10' : 'bg-orange-500/10'}`}>
            <span className="material-symbols-outlined text-3xl text-red-400">
              {variant === 'danger' ? 'delete_forever' : 'warning'}
            </span>
          </div>
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold text-white text-center mb-2">{title}</h3>
        <p className="text-sm text-slate-400 text-center mb-8 leading-relaxed">{message}</p>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 rounded-2xl border border-slate-700 px-6 py-3 font-bold text-slate-400 transition hover:bg-slate-800 cursor-pointer"
          >
            {t(cancelLabel)}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 rounded-2xl px-6 py-3 font-bold text-white transition hover:scale-[1.02] active:scale-95 cursor-pointer ${btnClass}`}
          >
            {t(confirmLabel)}
          </button>
        </div>
      </div>
    </div>
  );
}

// ==================== MAIN PROFILE PAGE ====================
export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Modal states
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const [showDeleteRoadmapModal, setShowDeleteRoadmapModal] = useState(false);
  const [pendingRoadmapTitle, setPendingRoadmapTitle] = useState<string | null>(null);

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    }
    getUser();
  }, []);

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

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate('/');
  }

  function handleDeleteRoadmap(title: string) {
    setPendingRoadmapTitle(title);
    setShowDeleteRoadmapModal(true);
  }

  function confirmDeleteRoadmap() {
    setShowDeleteRoadmapModal(false);
    setPendingRoadmapTitle(null);
    // Aqui vai a lógica real de exclusão
  }

  const roadmaps = [
    { id: 1, iconKey: 'terminal', titleKey: 'profile.fullstackTitle', progress: '65%', dateKey: 'profile.daysAgo', dateValue: 2, color: 'bg-primary/30', borderColor: 'border-primary/40' },
    { id: 2, iconKey: 'psychology', titleKey: 'profile.aiArchTitle', progress: '12%', dateKey: 'profile.weekAgo', dateValue: 1, color: 'bg-purple-500/30', borderColor: 'border-purple-500/40' },
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
              <h3 className="text-3xl font-black text-white tracking-tight">{t('profile.preferences')}</h3>
              <p className="text-slate-400">{t('profile.preferencesDesc')}</p>
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
                  <button onClick={() => setShowLogoutModal(true)} className="flex items-center gap-2 rounded-2xl bg-red-500/10 px-6 py-3 font-bold text-red-400 transition hover:bg-red-500/20 border border-red-500/20 cursor-pointer">
                    <span className="material-symbols-outlined !text-xl">logout</span>
                    <span>{t('profile.logout')}</span>
                  </button>
                  <button onClick={() => setShowDeleteAccountModal(true)} className="flex items-center gap-2 rounded-2xl bg-red-500/10 px-4 py-3 font-bold text-red-400 transition hover:bg-red-500/20 border border-red-500/20 cursor-pointer" title={t('profile.deleteAccount')}>
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
                  <h2 className="text-xl font-bold text-white">{t('profile.manageRoadmaps')}</h2>
                </div>
                <span className="rounded-full bg-primary/10 px-4 py-1 text-xs font-bold text-primary uppercase border border-primary/20 tracking-wider">
                  2 {t('profile.active')}
                </span>
              </div>
              <div className="grid gap-4">
                {roadmaps.map((roadmap) => (
                  <RoadmapItem
                    key={roadmap.id}
                    icon={roadmap.iconKey}
                    title={t(roadmap.titleKey)}
                    progress={roadmap.progress}
                    dateLabel={`${roadmap.dateValue} ${t(roadmap.dateKey)}`}
                    color={roadmap.color}
                    borderColor={roadmap.borderColor}
                    onDelete={() => handleDeleteRoadmap(t(roadmap.titleKey))}
                  />
                ))}
                {/* Create Action */}
                <Link
                  to="/roadmaps"
                  className="w-full flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-700 py-6 text-slate-400 transition hover:border-primary/50 hover:text-primary hover:bg-primary/5"
                >
                  <span className="material-symbols-outlined">add_circle</span>
                  <span className="font-bold">{t('profile.createNew')}</span>
                </Link>
              </div>
            </section>
          </div>
        </main>
      </div>

      {/* Confirm Modals */}
      <ConfirmModal
        open={showLogoutModal}
        title={t('profile.logoutTitle')}
        message={t('profile.logoutMsg')}
        confirmLabel={t('profile.confirmLogout')}
        onConfirm={handleLogout}
        onCancel={() => setShowLogoutModal(false)}
        variant="warning"
      />
      <ConfirmModal
        open={showDeleteAccountModal}
        title={t('profile.deleteAccountTitle')}
        message={t('profile.deleteAccountMsg')}
        confirmLabel={t('profile.confirmDelete')}
        onConfirm={() => { setShowDeleteAccountModal(false); /* lógica real de delete */ }}
        onCancel={() => setShowDeleteAccountModal(false)}
        variant="danger"
      />
      <ConfirmModal
        open={showDeleteRoadmapModal}
        title={t('profile.deleteRoadmapConfirm')}
        message={t('profile.deleteRoadmapMsg')}
        confirmLabel={t('profile.confirmDelete')}
        onConfirm={confirmDeleteRoadmap}
        onCancel={() => { setShowDeleteRoadmapModal(false); setPendingRoadmapTitle(null); }}
        variant="danger"
      />

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
