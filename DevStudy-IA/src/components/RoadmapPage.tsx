import { useState } from 'react';
import { Link } from 'react-router-dom';

// ==================== SIDEBAR COMPONENT ====================
function Sidebar() {
  const [activeItem, setActiveItem] = useState('roadmaps');

  const menuItems = [
    { id: 'dashboard', icon: 'dashboard', label: 'Dashboard', href: '/dashboard' },
    { id: 'roadmaps', icon: 'map', label: 'My Roadmaps', href: '#' },
    { id: 'sessions', icon: 'history_edu', label: 'Study Sessions', href: '#' },
    { id: 'community', icon: 'groups', label: 'Community', href: '#' },
    { id: 'about', icon: 'info', label: 'About', href: '/about' },
    { id: 'settings', icon: 'settings', label: 'Settings', href: '/profile' },
  ];

  return (
    <aside className="w-64 border-r border-slate-800 flex flex-col shrink-0 bg-[#0b1120]">
      <div className="p-6 flex items-center gap-2">
        <div className="w-8 h-8 bg-primary rounded-twelve flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
          </svg>
        </div>
        <span className="font-bold text-xl tracking-tight text-white">
          DevStudy <span className="text-primary">AI</span>
        </span>
      </div>
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
    </aside>
  );
}

// ==================== TOP BAR COMPONENT ====================
function TopBar() {
  const [language, setLanguage] = useState<'PT' | 'EN'>('PT');

  return (
    <header className="h-16 flex items-center justify-between px-8 border-b border-white/5 bg-[#0f172a]/50 backdrop-blur-md sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <span className="text-slate-400 text-sm">Pages</span>
        <span className="text-slate-400 text-sm">/</span>
        <span className="text-sm font-medium">Meus Roadmaps</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/10">
          <button
            onClick={() => setLanguage('EN')}
            className={`px-3 py-1 text-[10px] font-bold rounded-full transition-all ${
              language === 'EN' ? 'bg-primary text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLanguage('PT')}
            className={`px-3 py-1 text-[10px] font-bold rounded-full transition-all ${
              language === 'PT' ? 'bg-primary text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            PT
          </button>
        </div>
        <button className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg relative">
          <span className="material-symbols-outlined text-xl">notifications</span>
          <span className="absolute top-2 right-2 size-2 bg-primary rounded-full"></span>
        </button>
        <div className="h-8 w-px bg-white/10"></div>
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-white leading-none">Alex Rivera</p>
            <p className="text-[10px] text-slate-400 mt-1">Free Tier</p>
          </div>
          <div className="size-9 rounded-full border-2 border-primary/20 p-0.5 group-hover:border-primary transition-colors">
            <img
              alt="User avatar"
              className="w-full h-full rounded-full"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOs0FPrt8NrXJjkcoF_owMSFGpSNPTjf_qjoBr4KFH8rXQkfkT5iAbKkn6nDJYXHD_H-lGvtViRek4pcYR41Iga6vqmIl0oEFg-Q7In-H7CqD2jnhMTkYU7m7r_NdV9JBmHV_G2NxNMseM5UFBgPPbAxdHmflfkhfIkQHitsLDvnMJyaVXQXUE7ALaPu_QozhONEu2RYJKImTjz826uHCD8mo0uvhUwhwQ2F0IZdoZE3aCl_YhvIBtMfcjKdlUTAr_VwfhNwU7zjs"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

// ==================== STACK CARD COMPONENT ====================
interface StackCardProps {
  icon: string;
  name: string;
  color: string;
  bgColor: string;
  checked: boolean;
  onChange: () => void;
  levels: string[];
  activeLevel: number;
  onLevelChange: (index: number) => void;
}

function StackCard({ icon, name, color, bgColor, checked, onChange, levels, activeLevel, onLevelChange }: StackCardProps) {
  return (
    <div className="relative group cursor-pointer">
      <input
        checked={checked}
        onChange={onChange}
        className="hidden peer"
        id={`stack-${name.toLowerCase().replace('.', '')}`}
        type="checkbox"
      />
      <label
        className="block p-4 rounded-2xl bg-white/5 border border-white/10 peer-checked:border-primary peer-checked:bg-primary/5 transition-all"
        htmlFor={`stack-${name.toLowerCase().replace('.', '')}`}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl ${bgColor} flex items-center justify-center ${color}`}>
              <span className="material-symbols-outlined">data_object</span>
            </div>
            <span className="font-bold">{name}</span>
          </div>
          <span className="material-symbols-outlined text-primary opacity-0 peer-checked:opacity-100 transition-opacity">
            check_circle
          </span>
        </div>
        <div className="space-y-2">
          <div className="text-[10px] font-bold uppercase text-slate-500 mb-2">Select Level</div>
          <div className="grid grid-cols-3 gap-2">
            {levels.map((level, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.preventDefault();
                  onLevelChange(index);
                }}
                className={`py-2 px-1 text-[10px] font-bold rounded-lg border transition-colors ${
                  activeLevel === index
                    ? 'border-primary bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg shadow-primary/20'
                    : 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10'
                }`}
                type="button"
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      </label>
    </div>
  );
}

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
  const [stackReact, setStackReact] = useState(true);
  const [stackNode, setStackNode] = useState(true);
  const [stackPython, setStackPython] = useState(false);
  const [reactLevel, setReactLevel] = useState(2);
  const [nodeLevel, setNodeLevel] = useState(0);
  const [pythonLevel, setPythonLevel] = useState(0);

  const levels = ['Iniciante', 'Intermediário', 'Avançado'];

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
      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        <TopBar />
        <div className="p-8 max-w-5xl mx-auto w-full">
          {/* Hero Section */}
          <div className="mb-10">
            <h2 className="text-4xl font-extrabold tracking-tight mb-2">
              Generate New <span className="gradient-text">Roadmap</span>
            </h2>
            <p className="text-slate-400 max-w-2xl">
              Leverage our AI to analyze your current skills or project repositories and build a personalized learning path to mastery.
            </p>
          </div>

          {/* Generation Form */}
          <div className="space-y-6">
            {/* Step 1: Stack Selection */}
            <section className="glass-card rounded-3xl p-6 sm:p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">1</div>
                <h3 className="text-xl font-bold">Stack & Proficiency</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <StackCard
                  icon="data_object"
                  name="React"
                  color="text-blue-400"
                  bgColor="bg-blue-500/10"
                  checked={stackReact}
                  onChange={() => setStackReact(!stackReact)}
                  levels={levels}
                  activeLevel={reactLevel}
                  onLevelChange={setReactLevel}
                />
                <StackCard
                  icon="terminal"
                  name="Node.js"
                  color="text-green-400"
                  bgColor="bg-green-500/10"
                  checked={stackNode}
                  onChange={() => setStackNode(!stackNode)}
                  levels={levels}
                  activeLevel={nodeLevel}
                  onLevelChange={setNodeLevel}
                />
                <StackCard
                  icon="code"
                  name="Python"
                  color="text-yellow-400"
                  bgColor="bg-yellow-500/10"
                  checked={stackPython}
                  onChange={() => setStackPython(!stackPython)}
                  levels={levels}
                  activeLevel={pythonLevel}
                  onLevelChange={setPythonLevel}
                />
                {/* Add More */}
                <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border border-dashed border-white/10 hover:border-primary/50 hover:bg-white/5 transition-all text-slate-500 hover:text-primary">
                  <span className="material-symbols-outlined text-3xl">add_circle</span>
                  <span className="font-bold text-sm">Add Technology</span>
                </button>
              </div>
            </section>

            {/* Step 2: AI Input */}
            <section className="glass-card rounded-3xl p-6 sm:p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">2</div>
                <h3 className="text-xl font-bold">AI Analysis Details</h3>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">Project or Skills Description</label>
                  <textarea
                    className="w-full bg-black/20 border border-white/10 rounded-2xl focus:ring-primary focus:border-primary placeholder:text-slate-600 transition-all text-white p-4"
                    placeholder="Tell the AI about your goals, what you already know, or a specific project you want to build..."
                    rows={4}
                  ></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">GitHub Repository URL</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                        <span className="material-symbols-outlined text-lg">link</span>
                      </div>
                      <input
                        className="w-full bg-black/20 border border-white/10 pl-10 rounded-xl focus:ring-primary focus:border-primary placeholder:text-slate-600 text-white p-3"
                        placeholder="https://github.com/user/repo"
                        type="text"
                      />
                    </div>
                    <p className="text-[10px] text-slate-500 mt-2 italic flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">info</span>
                      Analyze my repo to identify knowledge gaps.
                    </p>
                  </div>
                  <div className="flex items-end">
                    <div className="glass-card w-full rounded-xl p-3 bg-primary/5 border-primary/20 flex items-center gap-4">
                      <div className="p-2 bg-primary/20 rounded-lg text-primary">
                        <span className="material-symbols-outlined">psychology</span>
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-primary">AI AGENT ACTIVE</p>
                        <p className="text-[10px] text-slate-400">Deep learning model v4.2</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Submit Button */}
            <div className="flex flex-col items-center gap-6 pt-4">
              <button className="w-full max-w-md px-10 py-5 bg-gradient-to-r from-primary to-purple-600 hover:shadow-[0_0_40px_rgba(6,87,249,0.4)] text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1">
                <span className="material-symbols-outlined">rocket_launch</span>
                Generate AI Roadmap
              </button>
              <div className="flex items-center gap-4 text-slate-400">
                <span className="material-symbols-outlined text-primary">auto_awesome</span>
                <p className="text-sm italic">Estimated generation time: ~30 seconds</p>
              </div>
            </div>

            {/* Generated Result Section */}
            <section className="mt-12 space-y-6">
              <div className="mb-4">
                <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-widest">Roadmap Name</label>
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
                  <span className="px-3 py-1 bg-primary/20 text-primary text-[10px] font-bold rounded-full border border-primary/30 uppercase tracking-widest">Preview</span>
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
                {/* Add Category */}
                <div className="p-6 bg-white/5">
                  <button className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white transition-colors mx-auto">
                    <span className="material-symbols-outlined">add_circle</span>
                    Add New Phase
                  </button>
                </div>
              </div>

              {/* Final Action */}
              <div className="flex justify-center pt-4 pb-12">
                <button className="group relative px-12 py-4 bg-primary text-white rounded-2xl font-bold shadow-[0_0_30px_rgba(6,87,249,0.3)] hover:shadow-[0_0_50px_rgba(6,87,249,0.5)] transition-all overflow-hidden">
                  <span className="relative z-10 flex items-center gap-2">
                    <span className="material-symbols-outlined">save</span>
                    Save Roadmap to Profile
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
