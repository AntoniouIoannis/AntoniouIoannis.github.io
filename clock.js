function updateClock() {
    const now = new Date();

    const days = ["Κυριακή","Δευτέρα","Τρίτη","Τετάρτη","Πέμπτη","Παρασκευή","Σάββατο"];
    const months = ["Ιανουαρίου","Φεβρουαρίου","Μαρτίου","Απριλίου","Μαΐου","Ιουνίου",
                    "Ιουλίου","Αυγούστου","Σεπτεμβρίου","Οκτωβρίου","Νοεμβρίου","Δεκεμβρίου"];

    let dayName = days[now.getDay()];
    let day = now.getDate();
    let monthName = months[now.getMonth()];
    let year = now.getFullYear();

    let hours = String(now.getHours()).padStart(2, '0');
    let minutes = String(now.getMinutes()).padStart(2, '0');
    let seconds = String(now.getSeconds()).padStart(2, '0');

    document.getElementById('clock').textContent =
        `${dayName} ${day} ${monthName} ${year} ${hours}:${minutes}:${seconds}`;
}

setInterval(updateClock, 1000);
updateClock();
