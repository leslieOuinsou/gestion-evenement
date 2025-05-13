// Lib/Bdd.js pour Supabase
import { createClient } from '@supabase/supabase-js';

// Remplace ces valeurs par les tiennes
const supabaseUrl = 'https://zppqbcltlhtobpghfsqg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpwcHFiY2x0bGh0b2JwZ2hmc3FnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIxMTgwMDQsImV4cCI6MjA1NzY5NDAwNH0.DFZo-g3nggTvwNjftDXAfizSIaUUBTiQPZWXfUdJ3Tg';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default {
  auth: supabase.auth, // Assure-toi que 'auth' est bien exposé
};
