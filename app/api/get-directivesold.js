import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {
  // Vercel legge queste variabili dalle "Environment Variables" che hai impostato
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
  );

  const { data, error } = await supabase
    .from('direttive_ai')
    .select('*')
    .order('id', { ascending: true });

  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json(data);
}
