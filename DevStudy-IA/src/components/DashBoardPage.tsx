import { useState } from 'react';
import { Link } from 'react-router-dom';

// ==================== SIDEBAR COMPONENT ====================
function Sidebar() {
  const [activeItem, setActiveItem] = useState('dashboard');
  
  const menuItems = [
    { id: 'dashboard', icon: 'dashboard', label: 'Dashboard', href: '#' },
    { id: 'roadmaps', icon: 'alt_route', label: 'My Roadmaps', href: '/roadmaps' },
    { id: 'sessions', icon: 'menu_book', label: 'Study Sessions', href: '#' },
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
        <Link to="/roadmaps" className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white rounded-xl py-3 px-4 transition-all shadow-lg shadow-primary/20">
          <span className="material-symbols-outlined text-sm">add_circle</span>
          <span className="text-sm font-bold">New Roadmap</span>
        </Link>
      </div>
    </aside>
  );
}

// ==================== TOP BAR COMPONENT ====================
function TopBar() {
  const [language, setLanguage] = useState<'PT' | 'EN'>('PT');
  
  return (
    <header className="h-16 flex items-center justify-between px-8 bg-transparent border-b border-white/5">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-full max-w-md">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg leading-none">
            search
          </span>
          <input
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/50 text-white placeholder:text-slate-500"
            placeholder="Search roadmap topics..."
            type="text"
          />
        </div>
      </div>
      <div className="flex items-center gap-6">
        {/* Language Selector */}
        <div className="flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/10">
          <span className="material-symbols-outlined text-sm text-slate-400 ml-1">language</span>
          <button
            onClick={() => setLanguage('PT')}
            className={`px-2 py-1 text-[10px] font-bold rounded-full transition-all cursor-pointer ${
              language === 'PT' ? 'bg-primary text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            PT
          </button>
          <button
            onClick={() => setLanguage('EN')}
            className={`px-2 py-1 text-[10px] font-bold rounded-full transition-all cursor-pointer ${
              language === 'EN' ? 'bg-primary text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            EN
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg relative">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2 right-2 size-2 bg-primary rounded-full"></span>
          </button>
        </div>
        <div className="h-8 w-px bg-white/10"></div>
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="text-right">
            <p className="text-sm font-bold text-white leading-none">Alex Johnson</p>
            <p className="text-xs text-slate-400 mt-1">alex.j@gmail.com</p>
          </div>
          <div className="size-10 rounded-full border-2 border-primary/20 p-0.5 group-hover:border-primary transition-colors">
            <img
              alt="User Profile"
              className="w-full h-full rounded-full bg-slate-200"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBiYCiBM8jwtThWARAOXL40c_-j2CXzF_QQbZ-8XLerBJCvsV2SAKyF1tKaC_TRcY2v7klvn4lhZejGuqnSDTfmd4u7NVV0RFZPKu1_W_7imFIGCKiaJoQHKf4xEjaitNl_KfQVcjFMJbv_6QPlUv533JbaoOB5GS-kjgmL1qvqLPnSsCaInUDjuoJZrlqQ_7nnjYqHlhISegGUtVBBhaJruaX5xptw_eq6jd-3669Dpk4tlOQmnT20EWqCHViTy2HHjUlkC5ieIUQ"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

// ==================== STUDY STATS COMPONENT ====================
function StudyStats() {
  const stats = [
    { icon: 'timer', value: '128.5', label: 'Hours Studied', color: 'accent-blue' },
    { icon: 'task_alt', value: '24', label: 'Projects Completed', color: 'accent-purple' },
  ];

  const weeklyData = [30, 45, 80, 60, 90, 55, 70];
  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  return (
    <div className="glass-effect rounded-xl p-6 shadow-sm">
      <h4 className="text-lg font-bold text-white mb-6">Study Stats</h4>
      <div className="space-y-6">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className={`size-12 rounded-xl bg-${stat.color}/10 text-${stat.color} flex items-center justify-center`}>
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
        <p className="text-sm font-bold text-slate-300 mb-4">Weekly Activity</p>
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
function NextTasks() {
  const tasks = [
    { icon: 'data_object', title: 'Master Redux Toolkit', time: '2.5 hours', level: 'Advanced', locked: false },
    { icon: 'security', title: 'Implement JWT Authentication', time: '4 hours', level: 'Intermediate', locked: false },
    { icon: 'cloud_upload', title: 'CI/CD Pipeline with GitHub Actions', time: '3 hours', level: 'Devops', locked: true },
    { icon: 'code', title: 'Learn React Basics', time: '2 hours', level: 'Beginner', locked: false },
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-400/20 text-green-400 border-green-400/30';
      case 'Intermediate':
        return 'bg-blue-400/20 text-blue-400 border-blue-400/30';
      case 'Advanced':
        return 'bg-red-400/20 text-red-400 border-red-400/30';
      case 'Devops':
        return 'bg-purple-400/20 text-purple-400 border-purple-400/30';
      default:
        return 'bg-slate-400/20 text-slate-400 border-slate-400/30';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-bold text-white">Next Tasks</h4>
        <a className="text-primary text-sm font-semibold hover:underline" href="#">View All</a>
      </div>
      <div className="grid grid-cols-1 gap-3">
        {tasks.map((task, index) => (
          <div key={index} className="glass-effect p-4 rounded-xl flex items-center justify-between hover:border-primary/50 transition-colors group">
            <div className="flex items-center gap-4">
              <div className="size-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-500 group-hover:text-primary transition-colors">
                <span className="material-symbols-outlined">{task.icon}</span>
              </div>
              <div>
                <p className="text-sm font-bold text-white">{task.title}</p>
                <p className="text-xs text-slate-400">Estimated: {task.time}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* Level Badge */}
              <span className={`text-[10px] font-bold px-2 py-1 rounded-lg border ${getLevelColor(task.level)}`}>
                {task.level}
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
function RecentActivity() {
  const activities = [
    { title: 'Completed: React Hooks deep dive', time: '2 hours ago' },
    { title: 'Earned Badge: Redux Beginner', time: 'Yesterday' },
    { title: 'Updated Roadmap Goals', time: '3 days ago' },
  ];

  return (
    <div className="glass-effect rounded-xl p-6 shadow-sm">
      <h4 className="text-lg font-bold text-white mb-6">Recent Activity</h4>
      <div className="space-y-5">
        {activities.map((activity, index) => (
          <div key={index} className={`flex gap-3 relative ${index < activities.length - 1 ? '' : ''}`}>
            {index < activities.length - 1 && (
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
  return (
    <div className="flex h-screen overflow-hidden bg-[#0f172a]">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {/* Welcome Header */}
          <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-extrabold text-white tracking-tight">
                Welcome back, Alex! 👋
              </h2>
              <p className="text-slate-400 mt-1">You're making great progress. Keep the momentum going!</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-slate-800 rounded-xl px-4 py-2 flex items-center gap-3 border border-slate-800">
                <div className="size-8 bg-orange-500/20 text-orange-500 rounded-lg flex items-center justify-center">
                  <span className="material-symbols-outlined text-lg">local_fire_department</span>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-wider leading-none">Streak</p>
                  <p className="text-sm font-bold text-white">12 Days</p>
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
                      <span className="text-3xl font-black text-white">75%</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Done</span>
                    </div>
                  </div>
                  {/* Roadmap Info */}
                  <div className="flex-1 text-center md:text-left">
                    <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Current Roadmap</span>
                    <h3 className="text-2xl font-bold text-white mt-2">Fullstack React Engineer</h3>
                    <p className="text-slate-400 mt-2 text-sm leading-relaxed">Mastering modern web development from UI components to scalable backend architectures.</p>
                    <div className="mt-6 flex flex-wrap gap-4 justify-center md:justify-start">
                      <button className="bg-white/5 text-slate-300 text-sm font-bold px-6 py-2.5 rounded-xl hover:bg-white/10 transition-colors border border-white/10">View Details</button>
                    </div>
                  </div>
                </div>
              </div>
              <NextTasks />
            </div>

            {/* Sidebar Stats */}
            <div className="space-y-8">
              <StudyStats />
              <RecentActivity />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
