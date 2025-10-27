import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gktjvhsurocehmqjvnfi.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdrdGp2aHN1cm9jZWhtcWp2bmZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE1ODQ0NTUsImV4cCI6MjA3NzE2MDQ1NX0.LMNJ9VtFWHus1_iK-js3fEzkEnzldT0vfw1fL9BdCZE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
