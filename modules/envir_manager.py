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
     Restituisce un dizionario (dict) con i metadati dell'ambiente.
    """       
    # --- RILEVAZIONE AMBIENTE ---
    if Path("/content").exists():
        env = "COLAB"
        root = Path("/content")
        branch = "sviluppo"
        
    elif Path("/home/studio-lab-user").exists():
        env = "SAGEMAKER"
        root = Path("/home/studio-lab-user")
        branch = "sviluppo" 
        
    elif os.getenv("GITHUB_ACTIONS"): # <--- NUOVO CONTROLLO PER IL COLLAUDO
        env = "GITHUB_ACTION"
        root = Path.cwd()
        # Recuperiamo il branch attuale direttamente da GitHub
        branch = os.getenv("GITHUB_REF_NAME", "sviluppo")
        
    else:
        env = "LOCAL"
        root = Path.cwd()
        branch = "main"

    # --- DEFINIZIONE PERCORSI ---
    # In GitHub Action, il repo è già nella root, quindi repo_local coincide con root
    repo_local = root if env == "GITHUB_ACTION" else root / "repo"
    target_modules = root / "modules"
    # path_db = root / "agent_instructions.db"  Database SQLite principale (Memoria Agente)
       
    # --- ESPORTAZIONE CONTESTO ---
    # Creiamo un dizionario che fungerà da "singola fonte di verità" per il main
    context = {
        "ENV": env,
        "ROOT": root,
        "BRANCH": branch,
        "REPO_LOCAL": repo_local,
        "TARGET_MODULES": target_modules,
                                   # DATABASE 1: SQLite (Locale)
                                   # "PATH_DB_LOCAL": root 
        
                                   # DATABASE 2: Supabase (Remoto - Segnaposto per le chiavi)
                                   # "SB_URL": None,
                                   # "SB_KEY": None    
    }
    
    return context
