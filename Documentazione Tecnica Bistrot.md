# Documentazione Tecnica Bistrot

## 1. Documentazione Tecnica

### 1.1 Panoramica del Sistema

**Nome applicazione:** ScrumBistrot

**Tipo:** Sistema di gestione basato su metodologia SCRUM

**Architettura:** Client-Server (presunto dall'organizzazione dei menu)

### 1.2 Componenti Principali

1. **Modulo Organizzazione (organizza)**
    - Gestione team e risorse
    - Assegnazione ruoli SCRUM (Product Owner, Scrum Master, Team)
2. **Modulo Esecuzione (svolge)**
    - Tracking attività sprint
    - Gestione task board
3. **Modulo Gestione (Gestisce)**
    - Configurazione progetti
    - Reportistica
4. **Modulo Ordini (ORDINA)**
    - Funzionalità specifiche per gestione ordini
    - Processo di accettazione
5. **Modulo Amministrazione (ADMIN)**
    - Visualizzazione dati sistema
    - Gestione utenti e permessi

### 1.3 Requisiti di Sistema

- **Server:**
    - Linux/Windows Server
    - 4GB RAM minima
    - 50GB spazio disco
- **Client:**
    - Browser moderno (Chrome, Firefox, Edge)
    - Risoluzione minima 1024x768

### 1.4 API (se applicabile)

Endpoint principali:

- `/api/organizza` - Gestione team
- `/api/svolge` - Tracking attività
- `/api/ordina` - Processi ordini