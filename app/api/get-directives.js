// QUESTA RIGA È FONDAMENTALE:
import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  // Controlliamo che le chiavi esistano (per evitare crash muti)
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
    return res.status(500).json({ error: "Chiavi mancanti su Vercel" });
  }

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
  );

  try {
    const { data, error } = await supabase
      .from('direttive_ai') 
      .select('*')
      .order('id', { ascending: true }); // Mantiene l'ordine visto nello screenshot

    if (error) throw error;

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
