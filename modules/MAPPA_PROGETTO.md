## MODULO: analizza_contesto.py    
## SCOPO: Identificare l'infrastruttura di esecuzione (Colab vs SageMaker) e mappare i percorsi fondamentali per il progetto AI Agent.

### Funzioni:
1. **get_env_context()**
   - **Input:** Nessuno.
   - **Output:** Dizionario `envir`.
   - **Scopo:** Identifica se siamo su Colab o SageMaker e mappa i percorsi base (Root, DB locale).
