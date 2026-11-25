# Progetto ISIN — Investimenti (rev 1.1)

> **Autore**: Davide Gervasio • rev 1.1  
> **Stato**: Prodotto non in vendita — Solo test  
> **Architettura**: Standalone Desktop / PWA Mobile / Node.js Serverless & LAN  

---

## 📌 Panoramica
Applicazione desktop e web per il monitoraggio e confronto analitico di strumenti finanziari tramite codici **ISIN** (BTP, BOT, Bund europei, Obbligazioni societarie, Fondi comuni ed ETF).

L'interfaccia permette di gestire fino a **10 codici ISIN** per profilo personale senza alcuna richiesta di importi monetari o dati sensibili, mostrando curve storiche normalizzate su base 100 per il periodo **2020 – 2026**.

---

## ✨ Funzionalità Principali

1. **Gestione Multi-Profilo Personale**:
   - Creazione, selezione e rinomina rapida di profili nominativi (es. *Davide*, *Mario*, *Titoli di Stato*).
   - **Salva Profilo (💾)**: esporta e memorizza il profilo in formato JSON locale.
   - **Apri Profilo (📂)**: carica qualsiasi profilo JSON salvato sul computer.
   - **Svuota Titoli (🧹)**: azzera le righe con un tocco per inserire nuovi codici da capo.

2. **Zero Campi Denaro**:
   - Nessun dato finanziario privato: vengono salvati e confrontati esclusivamente codice ISIN e descrizione.

3. **Auto-Riconoscimento & Dati Certificati**:
   - Riconoscimento automatico immediato per i titoli governativi e gli ETF più diffusi (BTP Valore, BTP Italia, Bund, VWCE, MSCI World).
   - Scheda dettaglio per ogni titolo: Prezzo ultimo, Cedola stimata, Minimo e Massimo storico.
   - Pulsante **🔍 Forum** con collegamenti diretti alle discussioni su FinanzaOnline e Reddit r/ItaliaPersonalFinance.

4. **Multi-Piattaforma & Condivisione**:
   - **Desktop**: Avvio immediato tramite `Investimenti.bat` o apertura diretta di `index.html`.
   - **Rete Locale (LAN/Wi-Fi)**: Server Node.js integrato (`server.js`) per accedere da un'altra postazione o smartphone sulla stessa rete.
   - **Mobile (PWA)**: Supporto Web App installabile a schermo intero su iPhone (Safari) e Android (Chrome).

---

## 🚀 Avvio Rapido

### Modalità Standalone Desktop
Fare doppio clic su `Investimenti.bat` oppure aprire `index.html` con qualsiasi browser.

### Modalità Condivisa in Rete Locale
Avviare il server Node.js:
```bash
node server.js
```
- Da locale: `http://localhost:3000`
- Da altri computer/smartphone nella stessa Wi-Fi: `http://<IP_LOCALE>:3000`

---

## 📂 Struttura del Progetto

```
investimenti_app/
├── index.html              # Interfaccia grafica completa (Tailwind + Canvas HTML5)
├── manifest.json           # Manifest PWA per installazione mobile
├── server.js               # Server HTTP locale Node.js per condivisione LAN
├── Investimenti.bat        # Launcher rapido Windows in modalità App
├── vercel.json             # Configurazione di deploy serverless per Vercel
├── api/
│   └── isin.js             # Endpoint API serverless
├── gruppi_salvati/         # Profili di test preconfigurati (JSON)
│   ├── Profilo_Davide.json
│   ├── Profilo_Mario.json
│   └── BTP_e_Titoli_di_Stato.json
└── README.md
```
