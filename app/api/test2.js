# cerchiamo di far colloquiare Vercel con Hugging Face

export default async function handler(req, res) {
  const HF_SPACE_URL = "https://theridel-orchestratore.hf.space/call/predict";

  try {
    // 1. Prepariamo la chiamata per lo Space (formato Gradio API)
    const response = await fetch(HF_SPACE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: ["Test di connessione da Vercel"]
      })
    });

    if (!response.ok) throw new Error(`HF Space error: ${response.statusText}`);

    const result = await response.json();
    
    // Gradio restituisce un 'event_id'. Per semplicità in questo step 
    // verifichiamo solo se lo Space ha accettato la richiesta.
    res.status(200).json({
      connessione: "Riuscita",
      space_response_id: result.event_id,
      nota: "Il ponte ha inviato il messaggio allo Space con successo!"
    });

  } catch (error) {
    res.status(500).json({ 
      errore: "Il ponte non è riuscito a parlare con lo Space",
      dettaglio: error.message 
    });
  }
}
