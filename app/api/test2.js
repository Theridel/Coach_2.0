# cerchiamo di far colloquiare Vercel con Hugging Face

export default async function handler(req, res) {
  // L'endpoint per le chiamate dirette sincrone basato sul tuo screenshot
  const HF_URL = "https://theridel-orchestratore.hf.space/run/api_handler";

  try {
    // Usiamo fetch che è più leggibile e moderno di https.request
    const response = await fetch(HF_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: ["Ciao da Vercel!"] // Il parametro 'input_data' va qui dentro
      })
    });

    // Se lo Space è in coda o ha problemi, response.ok sarà false
    if (!response.ok) {
      const errorText = await response.text();
      return res.status(200).json({
        successo: false,
        errore: `Lo Space ha risposto con errore ${response.status}`,
        dettaglio: errorText
      });
    }

    const result = await response.json();

    // Gradio restituisce i dati in un array dentro la chiave 'data'
    return res.status(200).json({
      successo: true,
      risposta_ai: result.data ? result.data[0] : "Nessuna risposta nel pacchetto",
      debug: result
    });

  } catch (error) {
    // Questo cattura errori di rete o crash del codice
    return res.status(200).json({
      successo: false,
      errore: "Eccezione durante la chiamata",
      messaggio: error.message
    });
  }
}
