import { Link } from 'react-router-dom';
import { useLanguage } from '@/lib/i18n';
import "../index.css";

// ==================== COMPONENTS ====================

// Navigation Component
function Navigation() {
  const { t, setLanguage, language } = useLanguage();
  
  return (
    <nav className="fixed top-0 w-full z-50 glass-effect border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-twelve flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
            </div>
            <span className="font-bold text-xl tracking-tight">{t('header.devStudy')} <span className="text-primary">AI</span></span>
          </div>
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <a className="hover:text-primary transition-colors" href="#how-it-works">{t('header.howItWorks')}</a>
            <Link to="/login" className="hover:text-primary transition-colors">{t('header.login')}</Link>
            <a className="hover:text-primary transition-colors" href="#about">{t('header.about')}</a>

            {<Link to="/dashboard" className="hover:text-primary transition-colors">{t('header.dashboard')}</Link>}
            
            <div className="relative group">
              <button className="flex items-center gap-1 hover:text-primary transition-colors text-sm font-medium mr-4 py-2">
                <span className="material-symbols-outlined text-lg">language</span>
                {language === 'PT' ? 'PT-BR' : 'English'}
                <svg className="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                </svg>
              </button>
              <div className="absolute right-0 top-full mt-2 w-32 glass-effect rounded-twelve overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <button onClick={() => setLanguage('PT')} className={`block w-full text-left px-4 py-2 text-sm hover:bg-primary/20 transition-colors ${language === 'PT' ? 'text-primary' : ''}`}>PT-BR</button>
                <button onClick={() => setLanguage('EN')} className={`block w-full text-left px-4 py-2 text-sm hover:bg-primary/20 transition-colors ${language === 'EN' ? 'text-primary' : ''}`}>English (EN)</button>
              </div>
            </div>
           <Link 
              to="/dashboard" 
              className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-primary to-blue-500 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all hover:scale-105"
            >
              <div className="w-11 h-11 rounded-full bg-slate-800 flex items-center justify-center border-2 border-white/20 group-hover:border-white/40 transition-all">
                <span className="material-symbols-outlined text-white text-xl">person</span>
              </div>
            </Link>
          </div>
          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button className="text-slate-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M4 6h16M4 12h16m-7 6h7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

// Hero Section Component
function HeroSection() {
  const { t } = useLanguage();
  
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[10%] right-[-10%] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px]"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight mb-6">
            <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">{t('hero.title.pt')}</span> {t('hero.title.end')}
          </h1>
          <p className="text-lg lg:text-xl text-slate-400 mb-10 max-w-xl mx-auto lg:mx-0">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link to="/dashboard" className="bg-gradient-to-r from-primary to-blue-600 hover:shadow-lg hover:shadow-primary/25 px-8 py-4 rounded-twelve font-bold text-lg transition-all">
            {t('hero.cta')}
            </Link>
            <button className="glass-effect hover:bg-white/10 px-8 py-4 rounded-twelve font-bold text-lg transition-all">
               {t('hero.learnMore')}
            </button>
          </div>
        </div>
        {/* Abstract Hero Illustration - Terminal Window */}
        <div className="relative flex justify-center items-center">
          <div className="relative w-full max-w-lg">
            {/* Outer Glow */}
            <div className="absolute -inset-4 bg-primary/20 rounded-[2rem] blur-2xl opacity-50 animate-pulse"></div>
            {/* Terminal Window */}
            <div className="relative glass-effect rounded-twelve border border-white/10 shadow-2xl overflow-hidden font-mono text-sm">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-slate-800/80 border-b border-white/5">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                </div>
                <div className="text-xs text-slate-500">bash — devstudy-ai</div>
                <div className="w-12"></div>
              </div>
              {/* Terminal Body */}
              <div className="p-6 space-y-3">
                <div className="space-y-4">
                  <div className="flex gap-2 text-xs">
                    <span className="text-green-400">$</span>
                    <span className="terminal-line-1 text-slate-100 border-r-2 border-primary pr-1">npm install devstudy-ai</span>
                  </div>
                  <div className="terminal-step-2 opacity-0 animate-[fadeIn_0.2s_forwards_2s]">
                    <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                      <span>Downloading packages...</span>
                      <span className="text-primary">100%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1 overflow-hidden">
                      <div className="bg-primary h-full w-full shadow-[0_0_8px_rgba(6,87,249,0.5)] transition-all"></div>
                    </div>
                  </div>
                  <div className="terminal-loop-logs pt-2 space-y-1.5 opacity-0 animate-[fadeIn_0.5s_forwards_2.5s]">
                    <div className="flex gap-2 text-[10px] animate-[pulse_2s_infinite]">
                      <span className="text-blue-400 font-bold">[INFO]</span>
                      <span className="text-slate-400">Generating roadmaps...</span>
                    </div>
                    <div className="flex gap-2 text-[10px] animate-[pulse_2s_infinite_0.5s]">
                      <span className="text-green-400 font-bold">[SUCCESS]</span>
                      <span className="text-slate-400">AI Engine active...</span>
                    </div>
                    <div className="flex gap-2 text-[10px] animate-[pulse_2s_infinite_1s]">
                      <span className="text-purple-400 font-bold">[MONITORING]</span>
                      <span className="text-slate-400">User progress...</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-purple-600/20 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Features Section Component
function FeaturesSection() {
  const { t } = useLanguage();
  
  const features = [
    {
      icon: (
        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
        </svg>
      ),
      title: t('features.personalized'),
      description: t('features.personalizedDesc')
    },
    {
      icon: (
        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
        </svg>
      ),
      title: t('features.progress'),
      description: t('features.progressDesc')
    },
    {
      icon: (
        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
        </svg>
      ),
      title: t('features.projects'),
      description: t('features.projectsDesc')
    }
  ]

  return (
    <section className="py-24 relative" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t('features.title')}</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="glass-effect p-8 rounded-twelve hover:border-primary/50 transition-all group">
              <div className="w-14 h-14 bg-primary/10 rounded-twelve flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-slate-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// How It Works Section Component
function HowItWorksSection() {
  const { t } = useLanguage();
  
  const steps = [
    {
      number: 1,
      title: t('howItWorks.step1.title'),
      description: t('howItWorks.step1.desc')
    },
    {
      number: 2,
      title: t('howItWorks.step2.title'),
      description: t('howItWorks.step2.desc')
    },
    {
      number: 3,
      title: t('howItWorks.step3.title'),
      description: t('howItWorks.step3.desc')
    }
  ]

  return (
    <section className="py-24 bg-slate-900/50" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold" >{t('howItWorks.title')}</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-y-1/2"></div>
          {steps.map((step, index) => (
            <div key={index} className="relative z-10 text-center">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-6 font-bold text-xl shadow-[0_0_20px_rgba(6,87,249,0.4)]">
                {step.number}
              </div>
              <h4 className="text-lg font-bold mb-2">{step.title}</h4>
              <p className="text-slate-400 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Product Showcase Section Component
function ProductShowcaseSection() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-effect rounded-[24px] p-4 lg:p-8 shadow-2xl relative overflow-hidden group max-w-5xl mx-auto">
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          {/* Dashboard Mockup Design */}
          <div className="rounded-twelve bg-slate-950 border border-white/10 overflow-hidden shadow-2xl h-[440px]">
            {/* Mockup Header */}
            <div className="h-10 border-b border-white/5 bg-slate-800/50 flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
              <div className="ml-4 text-[10px] text-slate-500 font-mono">app.devstudy.ai/generator</div>
            </div>
            {/* Animated Content Container */}
            <div className="h-[400px] overflow-hidden relative">
              <div className="animate-showcase-flow">
                {/* Stage 1: Selection */}
                <div className="h-[400px] flex flex-col items-center justify-center p-8">
                  <div className="glass-effect rounded-[24px] p-4 lg:p-8 shadow-2xl relative overflow-hidden group max-w-5xl mx-auto">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary">settings_input_component</span>
                      Sua Próxima Meta
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-primary/40">
                        <div className="w-4 h-4 rounded-full border-4 border-primary"></div>
                        <span className="text-sm font-medium">Fullstack Developer (Node/React)</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5 opacity-40">
                        <div className="w-4 h-4 rounded-full border-2 border-white/20"></div>
                        <span className="text-sm">Mobile App Specialist</span>
                      </div>
                    </div>
                    <button className="w-full mt-6 bg-primary py-3 rounded-xl font-bold text-sm transition-all hover:scale-[1.02]">Construir Roadmap</button>
                  </div>
                </div>
                {/* Stage 2: Processing */}
                <div className="h-[400px] flex flex-col items-center justify-center bg-slate-900/40 backdrop-blur-md">
                  <div className="text-center">
                    <div className="relative inline-block mb-6">
                      <div className="w-20 h-20 border-4 border-primary/10 border-t-primary rounded-full animate-spin"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="material-symbols-outlined text-3xl text-primary animate-bounce">psychology</span>
                      </div>
                    </div>
                    <p className="text-lg font-bold text-white">IA Processando Dados</p>
                    <p className="text-slate-400 text-xs mt-2">Procurando os melhores recursos para você...</p>
                  </div>
                </div>
                {/* Stage 3: Results (The App Interface) */}
                <div className="h-[400px] p-6 lg:p-8 flex flex-col">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-bold">Sua Trilha: Fullstack Engineer</h3>
                      <p className="text-[10px] text-slate-500">Tempo estimado: 6 meses</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center px-2 py-1 rounded bg-green-500/10 text-green-500 text-[10px] font-bold">PERSONALIZADO</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {/* Node 1 */}
                    <div className="node-anim" style={{ animationDelay: '6s' }}>
                      <div className="flex items-start gap-4 p-4 glass-effect rounded-xl border-l-4 border-l-primary bg-white/5">
                        <div className="mt-1">
                          <span className="material-symbols-outlined text-primary text-xl">terminal</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="text-sm font-bold text-white">Fase 1: Fundamentos & Git Flow</h4>
                            <div className="flex gap-2">
                              <span className="text-[8px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">Beginner</span>
                              <span className="text-[8px] text-slate-500">2h</span>
                            </div>
                          </div>
                          <p className="text-[10px] text-slate-400 mt-1">Advanced logic, semantic HTML, and Branching Strategies.</p>
                        </div>
                        <span className="material-symbols-outlined text-green-500">check_circle</span>
                      </div>
                    </div>
                    {/* Node 2 */}
                    <div className="node-anim" style={{ animationDelay: '6.4s' }}>
                      <div className="flex items-start gap-4 p-4 glass-effect rounded-xl bg-white/5">
                        <div className="mt-1">
                          <span className="material-symbols-outlined text-slate-400 text-xl">layers</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="text-sm font-bold text-white">Fase 2: React Advanced Patterns</h4>
                            <div className="flex gap-2">
                              <span className="text-[8px] px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">Intermediate</span>
                              <span className="text-[8px] text-slate-500">4h</span>
                            </div>
                          </div>
                          <p className="text-[10px] text-slate-400 mt-1">Hooks, Context API, and Performance Optimization (Memo/Callback).</p>
                        </div>
                        <span className="material-symbols-outlined text-slate-600">radio_button_unchecked</span>
                      </div>
                    </div>
                    {/* Node 3 */}
                    <div className="node-anim" style={{ animationDelay: '6.8s' }}>
                      <div className="flex items-start gap-4 p-4 glass-effect rounded-xl bg-white/5">
                        <div className="mt-1">
                          <span className="material-symbols-outlined text-slate-400 text-xl">database</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="text-sm font-bold text-white">Fase 3: Backend Scalability</h4>
                            <div className="flex gap-2">
                              <span className="text-[8px] px-1.5 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20">Advanced</span>
                              <span className="text-[8px] text-slate-500">6h</span>
                            </div>
                          </div>
                          <p className="text-[10px] text-slate-400 mt-1">APIs RESTful, NoSQL, and Redis Caching strategies.</p>
                        </div>
                        <span className="material-symbols-outlined text-slate-600">radio_button_unchecked</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Final CTA Section Component
function FinalCTASection() {
  const { t } = useLanguage();
  
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/10 -z-10 blur-3xl opacity-50"></div>
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-4xl lg:text-5xl font-bold mb-6">{t('cta.title')}</h2>
        <p className="text-lg text-slate-400 mb-10">{t('cta.subtitle')}</p>
        <button className="bg-primary hover:bg-blue-600 px-10 py-5 rounded-twelve text-xl font-bold shadow-2xl shadow-primary/20 transition-all hover:-translate-y-1">
          {t('cta.button')}
        </button>
      </div>
    </section>
  )
}

// Footer Component
function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className="pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                </svg>
              </div>
              <span className="font-bold text-lg">{t('header.title')}</span>
            </div>
            <p className="text-slate-400 max-w-sm">{t('footer.description')}</p>
          </div>
          <div>
            <h5 className="font-bold mb-6">Links</h5>
            <ul className="space-y-4 text-slate-400">
              <li><a className="hover:text-primary transition-colors" href="#">{t('footer.about')}</a></li>
              <li><a className="hover:text-primary transition-colors" href="#how-it-works">{t('footer.features')}</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-6">Social</h5>
            <div className="flex gap-4">
              <a className="w-10 h-10 glass-effect rounded-full flex items-center justify-center hover:text-primary transition-all" href="#">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.493-1.1-1.1s.493-1.1 1.1-1.1 1.1.493 1.1 1.1-.493 1.1-1.1 1.1zm9 6.891h-2v-3.86c0-1.124-.816-1.282-1.03-1.282-.53 0-1.173.411-1.173 1.282v3.86h-2v-6h2v.835c.29-.444 1.144-.995 2.162-.995 1.485 0 2.041 1.048 2.041 2.307v3.853z"></path>
                </svg>
              </a>
              <a className="w-10 h-10 glass-effect rounded-full flex items-center justify-center hover:text-primary transition-all" href="#">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/5 pt-8 text-center">
          <p className="text-slate-400 text-sm">{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  )
}

// ==================== MAIN APP ====================

function App() {
  return (
    <div className="bg-darkBg text-slate-100 font-sans min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <ProductShowcaseSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  )
}

export default App