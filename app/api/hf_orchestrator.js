/**
 * api/hf-orchestrator.js
 * Bridge tra Vercel e Hugging Face Space
 */

export default async function handler(req, res) {
  // Accettiamo solo POST per inviare messaggi all'AI
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Metodo non consentito' });
  }

  try {
    // Per ora, come richiesto, restituiamo un feedback minimo di successo
    // Senza ancora chiamare fisicamente lo Space HF
    
    const rispostaSemplice = {
      messaggio: "Benvenuto! La funzione di backend su Vercel è pronta.",
      stato: "connesso",
      timestamp: new Date().toISOString()
    };

    return res.status(200).json(rispostaSemplice);

  } catch (error) {
    return res.status(500).json({ error: "Errore interno nel ponte HF: " + error.message });
  }
}
