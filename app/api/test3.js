export default async function handler(req, res) {
  // Cambiamo l'endpoint: usiamo quello standard /run/predict
  const HF_URL = "https://theridel-orchestratore.hf.space/run/predict";

  try {
    const response = await fetch(HF_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // Gradio Interface standard vuole i dati in un array dentro 'data'
        data: ["Test connessione universale"] 
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(200).json({
        successo: false,
        errore: `HF ha rifiutato la porta /run/predict con codice ${response.status}`,
        dettaglio: errorText
      });
    }

    const result = await response.json();

    return res.status(200).json({
      successo: true,
      risposta_ai: result.data ? result.data[0] : "Nessun testo ricevuto",
      debug: "Porta /run/predict aperta con successo!"
    });

  } catch (error) {
    return res.status(200).json({
      successo: false,
      errore: "Errore di rete",
      messaggio: error.message
    });
  }
}
