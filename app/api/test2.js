# cerchiamo di far colloquiare Vercel con Hugging Face

// Usiamo https nativo di Node per massima compatibilità se fetch fallisce
import https from 'https';

export default async function handler(req, res) {
  const hostname = 'theridel-orchestratore.hf.space';
  const path = '/run/predict';

  const data = JSON.stringify({
    data: ["Test di connessione"]
  });

  const options = {
    hostname: hostname,
    port: 443,
    path: path,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    },
    timeout: 8000 // 8 secondi per non far crashare Vercel
  };

  return new Promise((resolve) => {
    const request = https.request(options, (response) => {
      let body = '';
      response.on('data', (chunk) => body += chunk);
      response.on('end', () => {
        try {
          const jsonResponse = JSON.parse(body);
          res.status(200).json({
            stato: "Successo",
            risposta_hf: jsonResponse.data ? jsonResponse.data[0] : "Nessun dato"
          });
        } catch (e) {
          res.status(500).json({ errore: "Errore parsing HF", dettaglio: body });
        }
        resolve();
      });
    });

    request.on('error', (error) => {
      res.status(500).json({ errore: "Errore richiesta HTTPS", messaggio: error.message });
      resolve();
    });

    request.write(data);
    request.end();
  });
}
