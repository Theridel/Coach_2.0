export default async function handler(req, res) {
  // Vercel recupera queste variabili dai "Secret" che hai appena visto (oscurati)
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
  );

  try {
    // Sostituisci 'NOME_TABELLA' con il nome reale della tua tabella
    const { data, error } = await supabase
      .from('NOME_TABELLA') 
      .select('*');

    if (error) throw error;

    // Restituiamo i dati al frontend
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
