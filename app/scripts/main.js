/**
 * main.js - Gestione del Frontend
 * Questo script viene eseguito nel browser dell'utente.
 */

async function caricaDatiDalBackend() {
    // Tenta di trovare il contenitore dove scrivere i dati
    const contenitore = document.getElementById('dynamic-directives-container');

    try {
        // 1. Chiamata all'API interna di Vercel (il "ponte")
        // Non usiamo URL completi, basta il percorso relativo
        const risposta = await fetch('/api/get-directives');

        // Controlliamo se il server ha risposto con un errore (es. 404 o 500)
        if (!risposta.ok) {
            throw new Error('Il server ha risposto con un errore');
        }

        // 2. Trasformiamo la risposta in dati leggibili (JSON)
        const dati = await risposta.json();

        // 3. Puliamo il contenitore (rimuove il testo "In attesa...")
        contenitore.innerHTML = '';

        // 4. Cicliamo sui dati ricevuti per creare i blocchi visibili
        dati.forEach(elemento => {
            const divDinamico = document.createElement('div');
            
            // Applichiamo uno stile rapido per il test
            divDinamico.style.border = '1px solid #2196f3';
            divDinamico.style.padding = '15px';
            divDinamico.style.marginTop = '10px';
            divDinamico.style.borderRadius = '8px';

            // Inseriamo il titolo della sezione e il testo
            divDinamico.innerHTML = `
                <h3>${elemento.sezione}</h3>
                <p>${elemento.contenuto}</p>
            `;

            // Aggiungiamo il blocco appena creato nella pagina
            contenitore.appendChild(divDinamico);
        });

    } catch (errore) {
        // Se qualcosa va storto (es. internet assente o errore server)
        console.error('Errore rilevato:', errore);
        contenitore.innerHTML = `<p style="color:red;">Errore: ${errore.message}</p>`;
    }
}

// Avviamo la funzione solo quando tutta la pagina HTML è stata caricata
document.addEventListener('DOMContentLoaded', caricaDatiDalBackend);
