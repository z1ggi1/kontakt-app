// Kontaktliste Array zum Speichern der Kontakte
let kontakte = [];
// DOM Elemente
const form = document.getElementById('kontakt-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const telefonInput = document.getElementById('telefon');
const kontaktListe = document.getElementById('kontakt-liste');
// Event Listener für das Formular
form.addEventListener('submit', function(e) {
    e.preventDefault();
    kontaktHinzufuegen();
});
// Funktion zum Hinzufügen eines Kontakts
function kontaktHinzufuegen() {
    const neuerKontakt = {
        id: Date.now(),
        name: nameInput.value,
        email: emailInput.value,
        telefon: telefonInput.value
    };
    
    kontakte.push(neuerKontakt);
    formularLeeren();
    kontakteAnzeigen();
}
// Funktion zum Leeren des Formulars
function formularLeeren() {
    nameInput.value = '';
    emailInput.value = '';
    telefonInput.value = '';
}
// NEUE FUNKTION: Kontakte filtern
function kontakteFiltern(suchbegriff) {
    if (!suchbegriff) {
        return kontakte;
    }
    
    return kontakte.filter(kontakt => 
        kontakt.name.toLowerCase().includes(suchbegriff.toLowerCase()) ||
        kontakt.email.toLowerCase().includes(suchbegriff.toLowerCase())
    );
}
// Funktion zur Anzeige aller Kontakte (erweitert für Filter)
function kontakteAnzeigen(suchbegriff = '') {
    kontaktListe.innerHTML = '';
    
    // Filter anwenden falls Suchbegriff vorhanden
    const gefilterteKontakte = kontakteFiltern(suchbegriff);
    
    gefilterteKontakte.forEach(function(kontakt) {
        const kontaktDiv = document.createElement('div');
        kontaktDiv.className = 'kontakt-item';
        kontaktDiv.innerHTML = `
${kontakt.name}
E-Mail: ${kontakt.email}

Telefon: ${kontakt.telefon}

   Löschen
`;
kontaktListe.appendChild(kontaktDiv);
});

// Anzeige wenn keine Kontakte gefunden
if (gefilterteKontakte.length === 0) {
kontaktListe.innerHTML = '

Keine Kontakte gefunden.

';
}
}
// Funktion zum Löschen eines Kontakts
function kontaktLoeschen(id) {
kontakte = kontakte.filter(kontakt => kontakt.id !== id);
kontakteAnzeigen();
}
