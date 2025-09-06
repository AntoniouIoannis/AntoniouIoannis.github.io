// repo-stats.js
document.addEventListener("DOMContentLoaded", function() {
    const username = "AntoniouIoannis";
    const repo = "AntoniouIoannis.github.io";
    
    fetch(`https://api.github.com/repos/${username}/${repo}/languages`)
        .then(response => response.json())
        .then(data => {
            const totalBytes = Object.values(data).reduce((sum, bytes) => sum + bytes, 0);
            
            // Υπολογισμός ποσοστών
            const htmlPercent = ((data.HTML || 0) / totalBytes * 100).toFixed(1);
            const cssPercent = ((data.CSS || 0) / totalBytes * 100).toFixed(1);
            const jsPercent = ((data.JavaScript || 0) / totalBytes * 100).toFixed(1);
            
            // Ενημέρωση των progress bars
            updateProgressBars(htmlPercent, cssPercent, jsPercent);
        })
        .catch(error => {
            console.error("Error fetching GitHub data:", error);
            // Fallback values αν αποτύχει το API
            updateProgressBars(54.8, 37.3, 7.9);
        });
});

function updateProgressBars(htmlPercent, cssPercent, jsPercent) {
    const circles = document.querySelectorAll('.circle');
    
    // HTML
    circles[0].querySelector('.number').innerHTML = `${htmlPercent}<span>%</span>`;
    circles[0].setAttribute('data-percent', htmlPercent);
    
    // CSS
    circles[1].querySelector('.number').innerHTML = `${cssPercent}<span>%</span>`;
    circles[1].setAttribute('data-percent', cssPercent);
    
    // JavaScript
    circles[2].querySelector('.number').innerHTML = `${jsPercent}<span>%</span>`;
    circles[2].setAttribute('data-percent', jsPercent);
    
    // Εκκίνηση animation
    initProgressBars();
}

function initProgressBars() {
    let circles = document.querySelectorAll('.circle');
    
    circles.forEach(function(progress) {
        let degree = 0;
        let targetDegree = 360 * (parseFloat(progress.getAttribute('data-percent')) / 100);
        let color = progress.getAttribute('data-color');
        
        let interval = setInterval(function() {
            if (degree >= targetDegree) {
                clearInterval(interval);
                return;
            }
            
            degree += 1;
            progress.style.background = `conic-gradient(${color} ${degree}deg, #333 0deg)`;
        }, 10);
    });
}
