import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/lib/i18n';

// ==================== SIDEBAR COMPONENT ====================
function Sidebar() {
  const location = useLocation();
  
  const navItems = [
    { icon: 'dashboard', label: 'Dashboard', path: '/dashboard' },
    { icon: 'menu_book', label: 'Study Sessions', path: '/study' },
    { icon: 'alt_route', label: 'Roadmaps', path: '/roadmaps' },
    { icon: 'layers', label: 'Flashcards', path: '#' },
    { icon: 'group', label: 'Community', path: '#' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="w-[280px] h-screen fixed left-0 top-0 bg-darkBg border-r border-white/5 flex flex-col z-40">
      <div className="px-8 py-10">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-3xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
          <span className="text-2xl font-bold bg-gradient-to-br from-primary to-orange-600 bg-clip-text text-transparent">
            DevStudy AI
          </span>
        </div>
        <p className="text-slate-500 text-[10px] mt-1 ml-11 tracking-widest uppercase">The Neon Observatory</p>
      </div>
      
      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-6 py-4 text-slate-400 hover:text-white hover:bg-surface-container/50 transition-all rounded-xl ${
              isActive(item.path) ? 'text-primary bg-surface-container border-l-4 border-primary' : ''
            }`}
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span className="font-medium text-sm tracking-wide">{item.label}</span>
          </Link>
        ))}
        <Link
          to="/settings"
          className={`flex items-center gap-3 px-6 py-4 text-slate-400 hover:text-white hover:bg-surface-container/50 transition-all rounded-xl ${
            isActive('/settings') ? 'text-primary bg-surface-container border-l-4 border-primary' : ''
          }`}
        >
          <span className="material-symbols-outlined">settings</span>
          <span className="font-medium text-sm tracking-wide">Settings</span>
        </Link>
      </nav>
      
      <div className="p-6 mt-auto">
        <button className="flex items-center gap-3 px-6 py-4 text-slate-400 hover:text-white hover:bg-surface-container/50 transition-all rounded-xl w-full">
          <span className="material-symbols-outlined">logout</span>
          <span className="font-medium text-sm tracking-wide">Logout</span>
        </button>
      </div>
    </aside>
  );
}

// ==================== HEADER COMPONENT ====================
function Header() {
  const { t, language, setLanguage } = useLanguage();
  
  return (
    <header className="fixed top-0 right-0 w-[calc(100%-280px)] z-30 bg-darkBg/80 backdrop-blur-md flex justify-between items-center px-12 h-20">
      <h1 className="font-bold text-white text-xl">{t('about.title')}</h1>
      
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-high cursor-pointer hover:opacity-80 transition-opacity">
          <span className="material-symbols-outlined text-primary text-xl">language</span>
          <span className="text-[10px] font-bold text-white uppercase tracking-tighter">
            {language === 'PT' ? 'PT-BR' : 'EN'}
          </span>
        </div>
        
        <button className="text-slate-300 hover:opacity-80 transition-opacity relative">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-4 border-l border-white/10">
          <div className="text-right">
            <p className="text-sm font-bold text-white">Alex Johnson</p>
            <p className="text-[10px] text-primary uppercase tracking-widest font-bold">Pro Member</p>
          </div>
          <img 
            alt="User Profile Picture" 
            className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqW6fdQGCZgOlosf7WOMv8CrHvpubwuSXqgVUN2DferjSUukfJw1aTdU-tKHDS29g3BBcd9hvi8XM6GDkEk4VDQ0iCjjCaAvAGKrr6xQibH_iFcO1Pil0mR758umfGh12wsfDMZxXsTlghubMiQHcITQAE-fYRzKQhmVNcwIdwIUWfyogyMAjjqjIcAZu_DRNvnTeMhXr7Np_Q7hfXYTHPF-fMlWGCQbmfMBCrHPA85wwj0JmEBFuW-5JjeC0YxJASNH6w-7Kv_Qo"
          />
        </div>
      </div>
    </header>
  );
}

// ==================== PURPOSE SECTION ====================
function PurposeSection() {
  const { t } = useLanguage();
  
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      <div className="lg:col-span-7 space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
          <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300">{t('about.mission')}</span>
        </div>
        
        <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-[1.1] text-white">
          {t('about.purposeTitle')} <span className="bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent">{t('about.purposeHighlight')}</span>
        </h2>
        
        <p className="text-lg text-slate-400 leading-relaxed max-w-2xl">
          {t('about.purposeDescription')}
        </p>
        
        <div className="grid grid-cols-2 gap-6 pt-4">
          <div className="glass-card p-6 rounded-2xl">
            <h4 className="text-primary font-bold text-lg mb-2">{t('about.zeroToPro')}</h4>
            <p className="text-xs text-slate-400 leading-relaxed">{t('about.zeroToProDesc')}</p>
          </div>
          <div className="glass-card p-6 rounded-2xl">
            <h4 className="text-primary font-bold text-lg mb-2">{t('about.fullFocus')}</h4>
            <p className="text-xs text-slate-400 leading-relaxed">{t('about.fullFocusDesc')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==================== DEVELOPER SECTION ====================
function DeveloperSection() {
  const { t } = useLanguage();
  
  return (
    <section className="glass-card rounded-[2.5rem] p-12 relative overflow-hidden bg-surface-container/30">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 relative z-10">
        <div className="md:col-span-4 flex flex-col items-center text-center space-y-8">
          <div className="relative">
            <div className="w-56 h-56 rounded-full overflow-hidden ring-4 ring-primary/20 p-1 bg-gradient-to-br from-primary/30 to-transparent">
              <img 
                alt="Developer Portrait" 
                className="w-full h-full object-cover rounded-full" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlvZ-tk9L444wrnyVNjvpBGTQz2midjV1h1IY8zk8xPOdx8Akn9jiYjxsfA_Z2wAZNhmITwYaFNXxn8klwTI3a18dtox1-RO-SQKQg9JUgAIdHgPEUIukq7aXQw06rFO2XttShxyoX4hLAgxmQ0iLJT6w8BP7gYMmzb6jcIF5U3x0ErPskol1v-xtcBmEsXP1O7V2waJUEClE0juh1g0qR2QDPtsERpIbKFl_eQuEGmpCWmueFtMLwBm9wGgz5T7Gk1XdfZThPfU4"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-primary w-14 h-14 rounded-full flex items-center justify-center border-4 border-surface-container shadow-xl">
              <span className="material-symbols-outlined text-2xl font-bold" style={{ color: '#4a1c00' }}>code</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-3xl font-bold text-white">Alex Johnson</h3>
            <p className="text-primary font-bold tracking-[0.2em] text-[10px] uppercase mt-2">{t('about.devTitle')}</p>
          </div>
          
          <div className="flex gap-4">
            <button className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-slate-300 hover:text-primary hover:border-primary/50 transition-all">
              <span className="material-symbols-outlined">link</span>
            </button>
            <button className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-slate-300 hover:text-primary hover:border-primary/50 transition-all">
              <span className="material-symbols-outlined">terminal</span>
            </button>
            <button className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-slate-300 hover:text-primary hover:border-primary/50 transition-all">
              <span className="material-symbols-outlined">share</span>
            </button>
          </div>
        </div>
        
        <div className="md:col-span-8 flex flex-col justify-center space-y-6">
          <h4 className="text-2xl font-bold text-white">{t('about.helloDev')}</h4>
          
          <div className="space-y-4 text-slate-400 text-lg leading-relaxed">
            <p>{t('about.devJourney1')}</p>
            <p>{t('about.devJourney2')}</p>
          </div>
          
          <div className="pt-6 flex flex-wrap gap-3">
            <div className="px-5 py-2.5 rounded-full bg-surface-container text-xs font-bold border border-white/5 flex items-center gap-2 text-slate-200">
              <span className="material-symbols-outlined text-primary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              Python / TypeScript
            </div>
            <div className="px-5 py-2.5 rounded-full bg-surface-container text-xs font-bold border border-white/5 flex items-center gap-2 text-slate-200">
              <span className="material-symbols-outlined text-primary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              LLM Integration
            </div>
            <div className="px-5 py-2.5 rounded-full bg-surface-container text-xs font-bold border border-white/5 flex items-center gap-2 text-slate-200">
              <span className="material-symbols-outlined text-primary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              System Design
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==================== TECH STACK SECTION ====================
function TechStackSection() {
  const { t } = useLanguage();
  
  const features = [
    { icon: 'query_stats', title: t('about.algorithmPrecision'), desc: t('about.algorithmPrecisionDesc') },
    { icon: 'psychology', title: t('about.adaptiveLearning'), desc: t('about.adaptiveLearningDesc') },
    { icon: 'hub', title: t('about.globalCommunity'), desc: t('about.globalCommunityDesc') },
  ];
  
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <div 
          key={index}
          className="glass-card p-8 rounded-2xl flex flex-col justify-between group hover:border-primary/30 transition-all"
        >
          <span className="material-symbols-outlined text-4xl text-primary mb-6">{feature.icon}</span>
          <div>
            <h5 className="text-white font-bold text-lg mb-2">{feature.title}</h5>
            <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

// ==================== CTA SECTION ====================
function CTASection() {
  const { t } = useLanguage();
  
  return (
    <section className="text-center py-20">
      <h3 className="text-4xl md:text-5xl font-black text-white mb-10 tracking-tight">{t('about.ctaTitle')}</h3>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button className="px-10 py-4 bg-gradient-to-br from-primary to-orange-600 text-[#341100] font-black rounded-xl text-sm uppercase tracking-widest hover:shadow-[0_0_30px_rgba(236,106,6,0.3)] hover:scale-[1.02] transition-all">
          {t('about.startNow')}
        </button>
        <button className="px-10 py-4 glass-card border border-white/10 text-white font-black rounded-xl text-sm uppercase tracking-widest hover:bg-white/5 transition-all">
          {t('about.viewRoadmaps')}
        </button>
      </div>
    </section>
  );
}

// ==================== FOOTER COMPONENT ====================
function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className="ml-[280px] px-12 py-10 border-t border-white/5">
      <p className="text-slate-500 text-[10px] uppercase tracking-[0.3em] text-center">
        {t('about.copyright')}
      </p>
    </footer>
  );
}

// ==================== MAIN ABOUT PAGE ====================
export default function AboutPage() {
  return (
    <div className="bg-darkBg text-slate-100 min-h-screen">
      <Sidebar />
      <Header />
      
      <main className="ml-[280px] pt-32 px-12 pb-20 min-h-screen relative">
        <div className="max-w-6xl mx-auto space-y-20">
          <PurposeSection />
          <DeveloperSection />
          <TechStackSection />
          <CTASection />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
