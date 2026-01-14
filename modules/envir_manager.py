"""
MODULO: analizza_contesto.py
SCOPO: Identificare l'infrastruttura di esecuzione (Colab vs SageMaker) 
       e mappare i percorsi fondamentali per il progetto AI Agent.
AUTORE: Bot AI (per Theridel)
DATA: 10 Gennaio 2026
"""

import os
from pathlib import Path

def get_env_context():
    """
    Esegue lo screening del file system per determinare dove si trova l'agente.
    Restituisce un dizionario (dict) con i metadati dell'ambiente.
    """
    
    # --- RILEVAZIONE AMBIENTE ---
    # Cerchiamo directory specifiche che esistono solo in determinati cloud provider
    if Path("/content").exists():
        # Ambiente Google Colab standard
        env = "COLAB"
        root = Path("/content")
        branch = "sviluppo"  # Branch di lavoro predefinito per Colab
        
    elif Path("/home/studio-lab-user").exists():
        # Ambiente Amazon SageMaker Studio Lab
        env = "SAGEMAKER"
        root = Path("/home/studio-lab-user")
        # In SageMaker forziamo sviluppo fino a collaudo definitivo del main
        branch = "sviluppo" 
        
    else:
        # Fallback per esecuzione locale o ambienti ignoti
        env = "UNKNOWN"
        root = Path(os.getcwd())
        branch = "main"

    # --- DEFINIZIONE PERCORSI DERIVATI ---
    # Centralizziamo qui la gestione dei path per evitare hard-coding nel notebook
    repo_local = root / "repo"          # Cartella dove viene clonato il Git
    target_modules = root / "modules"   # Cartella che ospita questo e altri moduli .py
    # path_db = root / "agent_instructions.db"  Database SQLite principale (Memoria Agente)

    # --- ESPORTAZIONE CONTESTO ---
    # Creiamo un dizionario che fungerà da "singola fonte di verità" per il main
    context = {
        "ENV": env,                # Stringa identificativa (COLAB/SAGEMAKER)
        "ROOT": root,              # Path oggetto della directory radice
        "BRANCH": branch,          # Nome del branch Git da utilizzare
        "REPO_LOCAL": repo_local,  # Percorso locale del repository
        "TARGET_MODULES": target_modules, # Percorso dei moduli Python
                                   # DATABASE 1: SQLite (Locale)
                                   # "PATH_DB_LOCAL": root 
        
                                   # DATABASE 2: Supabase (Remoto - Segnaposto per le chiavi)
                                   # "SB_URL": None,
                                   # "SB_KEY": None 
    }
    
    return context
