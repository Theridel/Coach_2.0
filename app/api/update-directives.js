import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {
  // Accettiamo solo richieste POST per modificare i dati
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Metodo non consentito' });
  }

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
  );

  const { id, contenuto } = req.body;

  const { error } = await supabase
    .from('direttive_ai')
    .update({ 
        contenuto: contenuto, 
        ultima_modifica: new Date().toISOString() 
    })
    .eq('id', id);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json({ message: 'Aggiornamento riuscito' });
}
