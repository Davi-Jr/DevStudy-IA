import { useLanguage } from '@/lib/i18n';
import { Link } from 'react-router-dom';
import profilePhoto from '@/assets/jpeg/1740177009224.jpeg';

// ==================== HEADER COMPONENT ====================
function Header() {
  const { t, language, setLanguage } = useLanguage();
  
  return (
    <header className="fixed top-0 w-full z-50 glass-effect border-b border-white/5">
      <div className="flex items-center justify-between px-6 py-6 md:px-20 lg:px-40">
        <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-90 cursor-pointer">
          <div className="w-8 h-8 bg-primary rounded-twelve flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
            </svg>
          </div>
          <span className="font-bold text-xl tracking-tight text-white">
            {t('header.devStudy')} <span className="text-primary">AI</span>
          </span>
        </Link>
        <div className="flex items-center">
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
        </div>
      </div>
    </header>
  );
}

// ==================== SOCIAL LINKS COMPONENT ====================
function SocialLinks() {
  const platforms = [
    {
      name: 'GitHub',
      color: 'text-white',
      bgColor: 'hover:bg-white/10',
      href: 'https://github.com/Davi-Jr',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
        </svg>
      )
    },
    {
      name: 'Gmail',
      color: 'text-red-400',
      bgColor: 'hover:bg-red-500/20',
      href: 'mailto:davibritojunior1@gmail.com',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
        </svg>
      )
    },
    {
      name: 'Discord',
      color: 'text-indigo-400',
      bgColor: 'hover:bg-indigo-500/20',
      href: 'https://discord.com/users/1155996422668288120', // ID numérico,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
        </svg>
      )
    },
    {
      name: 'Portfolio',
      color: 'text-white',
      bgColor: 'hover:bg-white/10',
      href: 'https://davi-jr.github.io/portifolio/',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
        </svg>
      )
    }
  ];

  return (
    <div className="space-y-3 ">
      {platforms.map((platform) => (
        <a
          key={platform.name}
          href={platform.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-3 p-3 rounded-xl glass-effect border border-white/10 ${platform.bgColor} transition-all group`}
        >
          <div className={`w-10 h-10 rounded-full glass-effect flex items-center justify-center ${platform.color} border border-white/10`}>
            {platform.icon}
          </div>
          <span className={`font-medium ${platform.color} group-hover:text-white transition-colors`}>
            {platform.name}
          </span>
          <span className="material-symbols-outlined text-slate-400 ml-auto group-hover:text-white transition-colors">
            arrow_forward
          </span>
        </a>
      ))}
    </div>
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
          {t('about.purposeTitle')} <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">{t('about.purposeHighlight')}</span>
        </h2>
        
        <p className="text-lg text-slate-400 leading-relaxed max-w-2xl">
          {t('about.purposeDescription')}
        </p>
        
        <div className="grid grid-cols-2 gap-6 pt-4">
          <div className="glass-effect p-6 rounded-2xl border border-white/10 bg-slate-800/30">
            <h4 className="text-primary font-bold text-lg mb-2">{t('about.zeroToPro')}</h4>
            <p className="text-xs text-slate-400 leading-relaxed">{t('about.zeroToProDesc')}</p>
          </div>
          <div className="glass-effect p-6 rounded-2xl border border-white/10 bg-slate-800/30">
            <h4 className="text-primary font-bold text-lg mb-2">{t('about.fullFocus')}</h4>
            <p className="text-xs text-slate-400 leading-relaxed">{t('about.fullFocusDesc')}</p>
          </div>
        </div>
      </div>
      
      {/* Social Links - Right Side */}
      <div className="lg:col-span-5 mt-6">
        <h3 className="text-2xl font-bold text-white mb-6">Contato Pessoal</h3>
        <SocialLinks />
      </div>
    </section>
  );
}

// ==================== DEVELOPER SECTION ====================
function DeveloperSection() {
  const { t } = useLanguage();
  
  return (
    <section className="glass-effect rounded-[2.5rem] p-12 relative overflow-hidden border border-white/10 bg-slate-800/30">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 relative z-10">
        <div className="md:col-span-4 flex flex-col items-center text-center space-y-8">
          <div className="relative">
            <div className="w-64 h-64 rounded-full overflow-hidden ring-4 ring-primary/20 bg-gradient-to-br from-primary/30 to-transparent">
              <img
                alt="Portrait"
                className="w-full h-full object-cover"
                src={profilePhoto}
              />
            </div>

            <div className="absolute -bottom-2 -right-2 bg-primary w-14 h-14 rounded-full flex items-center justify-center border-4 border-slate-800 shadow-xl">
              <span className="material-symbols-outlined text-2xl font-bold" style={{ color: '#4a1c00' }}>code</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-3xl font-bold text-white">Davi Brito Júnior</h3>
            <p className="text-primary font-bold tracking-[0.2em] text-[10px] uppercase mt-2">{t('about.devTitle')}</p>
          </div>
        </div>
        
        <div className="md:col-span-8 flex flex-col justify-center space-y-6">
          <h4 className="text-2xl font-bold text-white">{t('about.helloDev')}</h4>
          
          <div className="space-y-4 text-slate-400 text-lg leading-relaxed">
            <p>{t('about.devJourney1')}</p>
            <p>{t('about.devJourney2')}</p>
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
    
  ];
  
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <div 
          key={index}
          className="glass-effect p-8 rounded-2xl flex flex-col justify-between group hover:border-primary/30 transition-all border border-white/10 bg-slate-800/30"
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

// ==================== MAIN ABOUT PAGE ====================
export default function AboutPage() {
  return (
    <div className="bg-darkBg text-slate-100 min-h-screen">
      <Header />
      
      <main className="pt-32 px-6 md:px-20 lg:px-40 pb-20 min-h-screen relative">
        <div className="max-w-6xl mx-auto space-y-20">
          <PurposeSection />
          <DeveloperSection />
          <TechStackSection />
        </div>
      </main>
     
    </div>
  );
}
