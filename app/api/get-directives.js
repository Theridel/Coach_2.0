/**
 * api/get-directives.js - Gestione del Backend
 * Questo codice gira sui server di Vercel, non nel browser.
 */

export default function handler(req, res) {
    // Per ora restituiamo dati "finti" (Mock) per testare il collegamento.
    // In futuro, qui inseriremo la chiamata a Supabase.
    const datiDiEsempio = [
        { 
            id: 1, 
            sezione: "Test Vercel", 
            contenuto: "Se vedi questo, il ponte tra scripts/main.js e api/get-directives.js funziona!" 
        }
    ];

    // Rispondiamo al browser con lo stato 200 (OK) e i dati in formato JSON
    res.status(200).json(datiDiEsempio);
