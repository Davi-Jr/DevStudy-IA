import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase credentials are missing. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper functions for common Supabase operations
export const supabaseHelpers = {
  // Auth helpers
  signUp: async (email: string, password: string) => {
    return await supabase.auth.signUp({ email, password });
  },
  
  signIn: async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({ email, password });
  },
  
  signOut: async () => {
    return await supabase.auth.signOut();
  },
  
  getCurrentUser: async () => {
    return await supabase.auth.getUser();
  },
  
  // Database helpers
  getRoadmaps: async (userId: string) => {
    return await supabase
      .from('roadmaps')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
  },
  
  getRoadmapById: async (id: string) => {
    return await supabase
      .from('roadmaps')
      .select('*')
      .eq('id', id)
      .single();
  },
  
  createRoadmap: async (roadmap: any) => {
    return await supabase
      .from('roadmaps')
      .insert(roadmap)
      .select();
  },
  
  updateRoadmap: async (id: string, updates: any) => {
    return await supabase
      .from('roadmaps')
      .update(updates)
      .eq('id', id)
      .select();
  },
  
  deleteRoadmap: async (id: string) => {
    return await supabase
      .from('roadmaps')
      .delete()
      .eq('id', id);
  },
};
