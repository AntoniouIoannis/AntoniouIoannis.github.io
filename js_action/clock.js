const dateEl = document.getElementById('date');
const timeEl = document.getElementById('time');

function updateClock() {
    const now = new Date();
    const dayName = now.toLocaleDateString('el-GR', { weekday: 'long' });
    const day = now.getDate();
    const monthName = now.toLocaleDateString('el-GR', { month: 'long' });
    const year = now.getFullYear();

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    dateEl.textContent = `${dayName} ${day} ${monthName} ${year}`;
    timeEl.textContent = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateClock, 1000);
updateClock();
