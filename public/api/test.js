export default async function handler(req, res) {
  try {
    // Manteniamo il tuo messaggio originale per conferma
    const baseResponse = { 
      messaggio: "Il backend di Vercel funziona correttamente!",
      timestamp: new Date().toISOString()
    };

    // Aggiungiamo una sezione per il futuro collegamento con lo Space
    const hfStatus = {
      target_space: "Theridel/Orchestratore",
      status: "Pronto per l'integrazione API"
    };

    // Restituiamo entrambi
    res.status(200).json({ 
      ...baseResponse, 
      hf_bridge: hfStatus 
    });

  } catch (error) {
    res.status(500).json({ error: "Errore nel test: " + error.message });
  }
}
