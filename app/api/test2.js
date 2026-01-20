# cerchiamo di far colloquiare Vercel con Hugging Face

import https from 'https';

export default async function handler(req, res) {
  // L'host deve essere esattamente questo
  const hostname = 'theridel-orchestratore.hf.space';
  
  // Gradio usa questo percorso per le chiamate API dirette (senza client libreria)
  const path = '/api/api_handler'; 

  // Formato dati richiesto dal tuo Space (vedi screenshot HF)
  const requestPayload = JSON.stringify({
    data: ["Hello!!"] // Gradio via HTTP vuole comunque i dati dentro un array 'data'
  });

  try {
    return new Promise((resolve) => {
      const options = {
        hostname: hostname,
        port: 443,
        path: path,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(requestPayload)
        },
        timeout: 10000
      };

      const request = https.request(options, (response) => {
        let body = '';
        response.on('data', (chunk) => body += chunk);
        response.on('end', () => {
          try {
            const jsonResponse = JSON.parse(body);
            // Mandiamo al browser la risposta pulita
            res.status(200).json({
              successo: true,
              risposta_ai: jsonResponse.data ? jsonResponse.data[0] : "Nessun testo ricevuto",
              debug: jsonResponse
            });
          } catch (e) {
            res.status(200).json({ errore: "Risposta non JSON", raw: body });
          }
          resolve();
        });
      });

      request.on('error', (err) => {
        res.status(200).json({ errore: "Errore connessione", msg: err.message });
        resolve();
      });

      request.write(requestPayload);
      request.end();
    });
  } catch (err) {
    res.status(200).json({ errore: "Eccezione", msg: err.message });
  }
}
