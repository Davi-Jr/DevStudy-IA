import { useState } from 'react';

// ==================== HEADER COMPONENT ====================
function Header() {
  const [language, setLanguage] = useState<'PT' | 'EN'>('PT');
  const [darkMode, setDarkMode] = useState(true);

  return (
    <header className="flex items-center justify-between px-6 py-6 md:px-20 lg:px-40">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-primary rounded-twelve flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
          </svg>
        </div>
        <span className="font-bold text-xl tracking-tight text-white">
          DevStudy <span className="text-primary">AI</span>
        </span>
      </div>
      <div className="flex items-center">
        <div className="flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/10 mr-2">
          <span className="material-symbols-outlined text-sm text-slate-400 ml-1">language</span>
          <button
            onClick={() => setLanguage('PT')}
            className={`px-2 py-1 text-[10px] font-bold rounded-full transition-all ${
              language === 'PT' ? 'bg-primary text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            PT
          </button>
          <button
            onClick={() => setLanguage('EN')}
            className={`px-2 py-1 text-[10px] font-bold rounded-full transition-all ${
              language === 'EN' ? 'bg-primary text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            EN
          </button>
        </div>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
        >
          <span className="material-symbols-outlined dark:text-white">
            {darkMode ? 'dark_mode' : 'light_mode'}
          </span>
        </button>
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
function GoogleLoginButton() {
  return (
    <button className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-primary to-blue-600 hover:shadow-lg hover:shadow-primary/25 text-white transition-all py-4 px-6 rounded-twelve font-bold shadow-sm">
      <svg className="w-5 h-5 bg-white rounded-full p-0.5" viewBox="0 0 24 24">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12.16-4.53z" fill="#EA4335"></path>
      </svg>
      Login com Google
    </button>
  );
}

// ==================== LOGIN CARD COMPONENT ====================
function LoginCard() {
  return (
    <div className="glass-effect p-8 rounded-[24px] shadow-2xl space-y-8">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative size-24 bg-slate-200 dark:bg-white/10 rounded-full flex items-center justify-center overflow-hidden border-2 border-white/10">
            <span className="material-symbols-outlined text-5xl text-slate-400 dark:text-slate-500">account_circle</span>
          </div>
        </div>
        <div className="space-y-1">
          <h3 className="text-xl font-bold dark:text-white">Pronto para começar?</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Entre com sua conta Google para continuar
          </p>
        </div>
      </div>
      <div className="space-y-4">
        <GoogleLoginButton />
        
        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200 dark:border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-slate-900 px-2 text-slate-500">ou</span>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Novo por aqui?{' '}
            <a className="text-primary font-semibold hover:underline" href="#">
              Saiba mais
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

// ==================== FOOTER COMPONENT ====================
function Footer() {
  return (
    <footer className="w-full px-6 py-8 md:px-20 lg:px-40 border-t border-slate-200 dark:border-white/10">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          © 2024 DevStudy AI. Todos os direitos reservados.
        </p>
        <div className="flex gap-6">
          <a className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary transition-colors" href="#">
            Termos de Uso
          </a>
          <a className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary transition-colors" href="#">
            Privacidade
          </a>
        </div>
      </div>
    </footer>
  );
}

// ==================== MAIN LOGIN PAGE COMPONENT ====================
export default function LoginPage() {
  const features = [
    { icon: 'route', title: 'Roadmaps Personalizados' },
    { icon: 'psychology', title: 'IA Generativa' },
    { icon: 'monitoring', title: 'Track de Evolução' },
  ];

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-slate-950">
      <div className="layout-container flex h-full grow flex-col">
        <Header />
        
        <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center space-y-3">
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                Bem-vindo ao{' '}
                <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                  DevStudy AI
                </span>
              </h1>
              <p className="text-slate-400 text-lg">
                Acelere seus estudos com roadmaps inteligentes
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
        
        <Footer />
      </div>
    </div>
  );
}
