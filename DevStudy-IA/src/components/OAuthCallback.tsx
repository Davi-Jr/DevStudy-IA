import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

export default function OAuthCallback() {
  const navigate = useNavigate();
  const handled = useRef(false);

  useEffect(() => {
    if (handled.current) return;
    handled.current = true;

    const handleAuth = async () => {
      // Supabase client already parses tokens from URL hash automatically
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      // Clear tokens from URL hash immediately
      if (window.location.hash) {
        window.history.replaceState({}, document.title, window.location.pathname);
      }

      if (error || !session) {
        navigate('/login', { replace: true });
        return;
      }

      navigate('/dashboard', { replace: true });
    };

    handleAuth();
  }, [navigate]);

  return (
    <div className="bg-darkBg text-slate-100 font-sans min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-slate-400">Finalizando login...</p>
      </div>
    </div>
  );
}
