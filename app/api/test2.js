# cerchiamo di far colloquiare Vercel con Hugging Face

export default async function handler(req, res) {
  // Usiamo l'endpoint synchronous che è più adatto alle serverless functions
  const HF_SPACE_URL = "https://theridel-orchestratore.hf.space/run/predict";

  try {
    const response = await fetch(HF_SPACE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: ["Test connessione"]
      })
    });

    // Se Hugging Face risponde con errore, lo catturiamo qui
    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`HF Space Error: ${response.status} - ${errorData}`);
    }

    const result = await response.json();
    
    // Gradio /run/predict restituisce i dati direttamente in result.data
    res.status(200).json({
      stato: "Successo!",
      risposta_ai: result.data[0],
      info: "Vercel ha parlato con Hugging Face e ha ricevuto risposta."
    });

  } catch (error) {
    // Questo ci aiuterà a capire esattamente cosa fallisce nei log di Vercel
    res.status(500).json({ 
      errore: "Fallimento nel tunnel Vercel -> HF",
      messaggio: error.message 
    });
  }
}
