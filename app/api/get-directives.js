/**
 * api/get-directives.js
 * TEST SEMPLICE SENZA SUPABASE
 */
export default function handler(req, res) {
    try {
        // Creiamo un dato di test statico
        const datiTest = [
            { 
                id: 1, 
                sezione: "Connessione API", 
                contenuto: "Sincronizzazione completata! Il backend Vercel risponde correttamente." 
            }
        ];

        // Inviamo la risposta al frontend
        res.status(200).json(datiTest);
        
    } catch (error) {
        // Se c'è un errore di codice, lo inviamo al frontend per leggerlo
        res.status(500).json({ error: error.message });
    }
}
