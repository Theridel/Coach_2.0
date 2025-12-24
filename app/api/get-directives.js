import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  // 1. Configurazione Client
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
  );

  try {
    // 2. Recupero dati
    const { data, error } = await supabase
      .from('direttive_ai')
      .select('*')
      .order('id', { ascending: true });

    if (error) throw error;

    // 3. Risposta corretta
    return res.status(200).json(data);
  } catch (error) {
    // In caso di errore, inviamo l'errore come JSON (non come testo)
    return res.status(500).json({ error: error.message });
  }
}
