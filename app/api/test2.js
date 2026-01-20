# cerchiamo di far colloquiare Vercel con Hugging Face

import https from 'https';

export default async function handler(req, res) {
  // 1. L'HOST deve essere pulito: solo il dominio, niente https://
  const hostname = 'theridel-orchestratore.hf.space';
  const path = '/run/predict';

  const requestPayload = JSON.stringify({
    data: ["Test di connessione"]
  });

  // Usiamo un try-catch globale per evitare il FUNCTION_INVOCATION_FAILED
  try {
    return new Promise((resolve) => {
      const options = {
        hostname: hostname,
        port: 443,
        path: path,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(requestPayload),
          'User-Agent': 'Vercel-Serverless-Function' // Alcuni server bloccano richieste senza User-Agent
        },
        timeout: 5000 
      };

      const request = https.request(options, (response) => {
        let body = '';
        response.on('data', (chunk) => body += chunk);
        response.on('end', () => {
          try {
            const jsonResponse = JSON.parse(body);
            res.status(200).json({ risposta: jsonResponse.data[0] });
          } catch (e) {
            res.status(200).json({ errore: "HF ha risposto con testo non-JSON", raw: body });
          }
          resolve();
        });
      });

      // Questo gestisce l'errore di connessione (es. DNS sbagliato) SENZA far crashare Vercel
      request.on('error', (err) => {
        res.status(200).json({ errore: "Connessione fallita", messaggio: err.message });
        resolve();
      });

      request.on('timeout', () => {
        request.destroy();
        res.status(200).json({ errore: "Timeout: Lo Space non risponde" });
        resolve();
      });

      request.write(requestPayload);
      request.end();
    });
  } catch (globalError) {
    // Se tutto il resto fallisce, questo salva la funzione dal crash
    res.status(200).json({ errore: "Eccezione globale catturata", msg: globalError.message });
  }
}
