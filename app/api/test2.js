/**
 * api/test2.js # cerchiamo di far colloquiare Vercel con Hugging Face
 * Basato sulla documentazione JS ufficiale dello Space "Orchestratore"
 * e su un competitor
 */

export default async function handler(req, res) {
  // 1. Endpoint per unirsi alla coda
  const JOIN_URL = "https://theridel-orchestratore.hf.space/queue/join";

  try {
    // Chiediamo di entrare in coda
    const response = await fetch(JOIN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: ["Test finale via Queue"],
        fn_index: 0, // Indice della funzione api_handler
        session_hash: "vercel_" + Math.random().toString(36).substring(7)
      })
    });

    const result = await response.json();

    // Se riceviamo un event_id, la connessione è VERA
    if (result.event_id) {
      return res.status(200).json({
        successo: true,
        messaggio: "Siamo in coda!",
        event_id: result.event_id,
        nota: "Il tunnel è aperto. HF ha accettato la richiesta tramite coda."
      });
    }

    return res.status(200).json({
      successo: false,
      errore: "Nessun ID evento ricevuto",
      debug: result
    });

  } catch (error) {
    return res.status(200).json({
      successo: false,
      errore: "Errore durante l'accesso alla coda",
      dettaglio: error.message
    });
  }
}
