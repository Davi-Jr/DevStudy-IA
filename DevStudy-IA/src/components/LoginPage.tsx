import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '@/lib/i18n';

// ==================== HEADER COMPONENT ====================
function Header() {
  const { t, setLanguage, language } = useLanguage();
  
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

// ==================== FEATURE CARD COMPONENT ====================
interface FeatureCardProps {
  icon: string;
  title: string;
}

function FeatureCard({ icon, title }: FeatureCardProps) {
  return (
    <div className="flex flex-col items-center gap-2 p-4 rounded-twelve glass-effect text-center">
      <span className="material-symbols-outlined text-primary">{icon}</span>
      <span className="text-xs font-medium text-slate-300">{title}</span>
    </div>
  );
}

// ==================== GOOGLE BUTTON COMPONENT ====================
function GoogleLoginButton({ onClick }: { onClick: () => void }) {
  const { t } = useLanguage();
  
  return (
    <button 
      onClick={onClick}
      className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-primary to-blue-600 py-4 px-6 rounded-twelve font-bold shadow-sm cursor-pointer transition-transform duration-200 hover:shadow-lg hover:shadow-primary/25 active:scale-[0.97]"
    >
      <svg className="w-5 h-5 bg-white rounded-full p-0.5" viewBox="0 0 24 24">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12.16-4.53z" fill="#EA4335"></path>
      </svg>
      {t('login.google')}
    </button>
  );
}

// ==================== LOGIN CARD COMPONENT ====================
function LoginCard() {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        setError(error.message);
      }
    } catch (err) {
      setError(t('login.errorGoogle'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-effect p-8 rounded-[24px] shadow-2xl space-y-8">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="relative group flex items-center justify-center w-22 h-22 rounded-full bg-gradient-to-r from-primary to-blue-500 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all hover:scale-105">
          <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center border-2 border-white/20 group-hover:border-white/40 transition-all">
            <span className="material-symbols-outlined text-white text-xl ">person</span>
          </div>
        </div>
        <div className="space-y-1">
          <h3 className="text-xl font-bold dark:text-white">{t('login.ready')}</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {t('login.continue')}
          </p>
        </div>
      </div>
      <div className="space-y-4">
        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center">
            {error}
          </div>
        )}
        <GoogleLoginButton onClick={handleGoogleLogin} />
      </div>
    </div>
  );
}

// ==================== FOOTER COMPONENT ====================
function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className="w-full px-6 py-8 md:px-20 lg:px-40 border-t border-white/5 mt-auto">
      <div className="flex flex-col md:flex-row justify-center items-center gap-4">
        <p className="text-sm text-slate-500 dark:text-slate-400 text-center">
          {t('footer.copyright')}
        </p>
      </div>
    </footer>
  );
}

// ==================== MAIN LOGIN PAGE COMPONENT ====================
export default function LoginPage() {
  const { t } = useLanguage();
  
  const features = [
    { icon: 'route', title: t('feature.personalized') },
    { icon: 'psychology', title: t('feature.generative') },
    { icon: 'monitoring', title: t('feature.tracking') },
  ];

  return (
    <div className="bg-darkBg text-slate-100 font-sans min-h-screen">
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-39">
          <div className="max-w-md w-full space-y-10">
            <div className="text-center space-y-10">
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                {t('login.welcome')}{' '}
                <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                  {t('hero.title.pt')}
                </span>
              </h1>
              <p className="text-slate-400 text-lg">
                {t('login.subtitle')}
              </p>
            </div>
            
            <LoginCard />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8">
              {features.map((feature, index) => (
                <FeatureCard key={index} icon={feature.icon} title={feature.title} />
              ))}
            </div>
          </div>
        </main>
    </div>
  );
}

