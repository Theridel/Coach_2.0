/**
 * api/test2.js # cerchiamo di far colloquiare Vercel con Hugging Face
 * Basato sulla documentazione JS ufficiale dello Space "Orchestratore"
 * e su un competitor
 */

export default async function handler(req, res) {
  // Proviamo l'endpoint API base che spesso funge da redirect corretto
  const HF_URL = "https://theridel-orchestratore.hf.space/api/predict";

  try {
    const response = await fetch(HF_URL, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        data: ["Test finale"],
        session_hash: "test_" + Math.random().toString(36).substring(7)
      })
    });

    const result = await response.json();

    return res.status(200).json({
      successo: true,
      risposta: result,
      info: "Se leggi questo, abbiamo trovato l'URL magico"
    });

  } catch (error) {
    return res.status(200).json({
      successo: false,
      errore: "Ancora 405 o Errore di Rete",
      messaggio: error.message
    });
  }
}
