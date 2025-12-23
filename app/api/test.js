export default function handler(req, res) {
  res.status(200).json({ 
    messaggio: "Il backend di Vercel funziona correttamente!",
    timestamp: new Date().toISOString()
  });
}
