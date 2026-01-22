import sqlite3
import shutil
from pathlib import Path
from datetime import datetime

def setup(ctx):
    """Configura l'ambiente SQLite e crea lo schema a 3 livelli."""
    nome_db = "agent_instructions.db"
    path_lavoro = ctx['ROOT'] / nome_db
    source_db = None
    
    # 1. Ricerca Sorgente (Colab Drive -> Repo)
    if ctx['ENV'] == "COLAB":
        path_drive = Path("/content/drive/MyDrive/LLM Database") / nome_db
        if path_drive.exists():
            source_db = path_drive
            
    if not source_db:
        path_repo = ctx['REPO_LOCAL'] / nome_db
        if path_repo.exists():
            source_db = path_repo

    # 2. Copia o Inizializzazione
    if source_db:
        shutil.copy2(source_db, path_lavoro)
    else:
        conn = sqlite3.connect(path_lavoro)
        _create_schema(conn)
        conn.close()
        
    return path_lavoro

def _create_schema(conn):
    """Crea le tabelle per la gestione della memoria."""
    cursor = conn.cursor()
    # Memoria Breve (ultimi scambi)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS short_term_memory (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
            role TEXT,
            content TEXT
        )
    """)
    # Memoria Media (riassunti sessione)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS session_summary (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            summary_text TEXT,
            last_message_id INTEGER
        )
    """)
    # Variabili di Stato
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS session_context (
            key TEXT PRIMARY KEY,
            value TEXT
        )
    """)
    conn.commit()

def get_chat_history(path_db, limit=10):
    """Recupera gli ultimi scambi per il prompt."""
    conn = sqlite3.connect(path_db)
    cursor = conn.cursor()
    cursor.execute("SELECT role, content FROM short_term_memory ORDER BY id DESC LIMIT ?", (limit,))
    history = cursor.fetchall()
    conn.close()
    # Ribaltiamo per avere l'ordine cronologico corretto
    return history[::-1]
