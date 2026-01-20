

/**
 * api/test2.js # cerchiamo di far colloquiare Vercel con Hugging Face
 * Basato sulla documentazione JS ufficiale dello Space "Orchestratore"
 */

export default async function handler(req, res) {
  // L'URL dello Space per le chiamate sincrone
  const HF_URL = "https://theridel-orchestratore.hf.space/run/api_handler";

  try {
    // Usiamo fetch (nativo in Node.js su Vercel)
    const response = await fetch(HF_URL, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json" 
      },
      // NOTA: Gradio vuole i dati in un array 'data', 
      // ma il JS client li mappa dall'oggetto che hai visto nella doc.
      body: JSON.stringify({
        data: ["Hello!!"] 
      })
    });

    // Se Hugging Face risponde, ma non è un 200 OK
    if (!response.ok) {
      const errorDetail = await response.text();
      return res.status(200).json({
        successo: false,
        errore: `Lo Space ha risposto con codice ${response.status}`,
        dettaglio: errorDetail
      });
    }

    const result = await response.json();

    // Inviamo la risposta al tuo browser
    return res.status(200).json({
      successo: true,
      risposta_ai: result.data ? result.data[0] : "Nessun dato ricevuto",
      timestamp: new Date().toISOString(),
      debug: "Connessione stabilita seguendo la doc JS"
    });

  } catch (error) {
    // Gestione dell'eccezione per evitare la pagina rossa "Serverless Function Crashed"
    return res.status(200).json({
      successo: false,
      errore: "Eccezione durante la chiamata a HF",
      messaggio: error.message
    });
  }
}
