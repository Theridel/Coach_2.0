/**
 * main.js - Gestione del Frontend
 * Questo script viene eseguito nel browser dell'utente.
 */


        async function loadAllDirectives() {
            const container = document.getElementById('dynamic-directives-container');
            try {
                const response = await fetch('/api/get-directives');
                if (!response.ok) throw new Error('Impossibile recuperare i dati dalle API');

                const data = await response.json();
                container.innerHTML = ''; 

                data.forEach(item => {
                    const sectionDiv = document.createElement('div');
                    sectionDiv.className = 'directive-block';
                    sectionDiv.style.border = '1px solid #ccc';
                    sectionDiv.style.padding = '15px';
                    sectionDiv.style.marginBottom = '20px';
                    
                    sectionDiv.innerHTML = `
                        <h3>${item.sezione}</h3>
                        <textarea id="text-${item.id}" style="width:100%; min-height:100px;">${item.contenuto}</textarea>
                        <br>
                        <button id="btn-${item.id}">Salva Modifiche</button>
                    `;
                    container.appendChild(sectionDiv);

                    document.getElementById(`btn-${item.id}`).addEventListener('click', () => updateDirective(item.id));
                });
            } catch (err) {
                console.error('Errore:', err.message);
                container.innerHTML = `<p style="color:red;">Errore di connessione: ${err.message}</p>`;
            }
        }

        async function updateDirective(id) {
            const nuovoContenuto = document.getElementById(`text-${id}`).value;
            const btn = document.getElementById(`btn-${id}`);
            btn.disabled = true;
            btn.innerText = 'Salvataggio in corso...';

            try {
                const response = await fetch('/api/update-directives', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id, contenuto: nuovoContenuto })
                });

                if (!response.ok) throw new Error('Errore durante il salvataggio');
                alert('Database aggiornato con successo!');
            } catch (err) {
                alert('Errore nel salvataggio: ' + err.message);
            } finally {
                btn.disabled = false;
                btn.innerText = 'Salva Modifiche';
            }
        }

        document.addEventListener('DOMContentLoaded', loadAllDirectives);
   
