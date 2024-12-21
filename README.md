# 🎨 Event Tracker - Frontend

## 📋 Descrizione del Progetto
Event Tracker è un'applicazione che consente agli utenti di visualizzare e salvare eventi e notizie, accedere al proprio calendario personalizzato e gestire i propri elementi salvati.
Questo progetto utilizza React per la struttura dell'app, Bootstrap per il design responsivo e Sass per uno stile personalizzato.

## 🚀 Tecnologie Utilizzate
React
React Router (Per la navigazione)
Bootstrap 5 (Per il layout e lo stile responsivo)
Sass (Per personalizzazioni avanzate del CSS)
Axios (Per le chiamate HTTP)
React-Toastify (Per le notifiche)

## ⚙️ Configurazione del Progetto:

### 1. Requisiti Preliminari
Node.js installato (versione 16 o successiva)
npm o yarn installati

### 2. Configurazione dell'Applicazione
Clona il repository:
git clone https://github.com/your-repository/event-tracker-frontend.git

### 3. Vai nella cartella del progetto:
cd event-tracker-frontend

### 4. Installa le dipendenze:
npm install

### 5. Crea un file .env nella root del progetto e aggiungi:
REACT_APP_API_URL=${your_baseURL}
REACT_APP_TICKETMASTER_API_KEY=${your_apiKey}

## 🛠️ Avvio dell'Applicazione

### Avvia il server di sviluppo:
npm start

### L'app sarà disponibile su:
http://localhost:3000

## 🖼️ Caratteristiche Principali

### 1. Login e Registrazione
Gli utenti possono accedere con le proprie credenziali tramite il modulo di login.

### 2. Home Page
Visualizza eventi e notizie provenienti da Ticketmaster API e NewsAPI.
Funzionalità di ricerca per filtrare eventi/notizie per keyword, città, o categoria.

### 3. Elementi Salvati
Gli utenti possono salvare eventi e notizie, visualizzarli in una pagina dedicata e rimuoverli se necessario.

### 4. Calendario Personalizzato
Gli eventi salvati sono visualizzati in un calendario con indicazioni visive sulle date occupate.
È possibile aggiungere eventi personali con note direttamente nel calendario.

## 📄 Struttura dei Componenti

src
│-- components
|   ├── navbar |- file jsx e css # Navbar dell'app
|   ├── footer |- file jsx e css # Footer
|   ├── eventCard |- file jsx e css # Card singola per gli eventi
|   ├── eventFilterBar |- file jsx e css # Barra dei filtri per eventi
|   ├── eventList |- file jsx e css # Lista degli eventi
|   ├── newsSection |- file jsx e css # Sezione per le notizie
|   ├── calendarPage |- file jsx e css # Calendario personalizzato
│-- pages
|   ├── homePage |- file jsx e css # Pagina principale
|   ├── savedItemsPage |- file jsx e css # Pagina degli elementi salvati
|   ├── loginPage |- file jsx e css # Pagina di login
│-- services
|   ├── TicketmasterService.js # Chiamate API per eventi
|   ├── NewsService.js # Chiamate API per notizie
│-- styles
|   ├── custom.scss # Stili personalizzati

## 🔄 Workflow

# 1. Chiamate API
/events/filter: Recupera eventi con filtri da Ticketmaster.
/news/external: Recupera notizie filtrate da NewsAPI.

# 2. Stato Locale
Stato globale gestito tramite useState.
Funzioni principali come handleSaveItem e handleRemoveItem per gestire gli elementi salvati.

## 🎨 Stile Personalizzato
Gli stili sono personalizzati con Sass.

Esempio di palette personalizzata utilizzata:

$primary: #3D5AFE;
$success: #81C784;
$danger: #E57373;
$warning: #FFF9C4;
$dark: #212529;

$theme-colors: (
"primary": $primary,
"success": $success, 
"danger": $danger,
"warning": $warning,
"dark": $dark,
);

## 🧪 Test dell'Applicazione
Puoi testare l'applicazione utilizzando React Testing Library o strumenti manuali come Postman per verificare le risposte del backend.

## 📫 Contatti
Se hai bisogno di ulteriori informazioni o supporto:
John Oliveira

Email: john.oliver98.br@gmail.com
LinkedIn: https://www.linkedin.com/in/john-oliver-2205aa247
