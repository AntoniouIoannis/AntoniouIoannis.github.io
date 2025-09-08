document.addEventListener("DOMContentLoaded", function () {
  const username = "AntoniouIoannis";
  const repoList = document.getElementById("repo-list");

  // Χάρτης γλωσσών -> χρώματα (GitHub-style)
  const langColors = {
    JavaScript: "#f1e05a",
    Python: "#3572A5",
    Java: "#b07219",
    "C#": "#178600",
    HTML: "#e34c26",
    CSS: "#563d7c",
    TypeScript: "#2b7489"
    // πρόσθεσε όσες θες
  };

  // Βοηθητική συνάρτηση: φτιάχνει progress bar
  function createLangBar(languages) {
    const total = Object.values(languages).reduce((a, b) => a + b, 0);
    let barHTML = `<div class="progress mt-2" style="height: 20px;">`;

    for (const [lang, value] of Object.entries(languages)) {
      const percent = ((value / total) * 100).toFixed(1);
      const color = langColors[lang] || "#999";

      barHTML += `
        <div class="progress-bar" role="progressbar" 
             style="width: ${percent}%; background-color: ${color};"
             aria-valuenow="${percent}" aria-valuemin="0" aria-valuemax="100">
          ${lang} ${percent}%
        </div>
      `;
    }

    barHTML += `</div>`;
    return barHTML;
  }

  fetch(`https://api.github.com/users/${username}/repos`)
    .then(response => response.json())
    .then(repos => {
      repos.forEach(repo => {
        if (repo.fork || !repo.description) return;

        const col = document.createElement("div");
        col.className = "col-md-6 col-lg-4 mb-4";

        // Βασική κάρτα
        col.innerHTML = `
          <div class="card h-100 shadow-sm">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${repo.name}</h5>
              <p class="card-text">${repo.description}</p>
              <div class="languages mt-2">Loading languages...</div>
              <a href="${repo.html_url}" target="_blank" class="btn btn-primary mt-auto">View on GitHub</a>
            </div>
          </div>
        `;

        repoList.appendChild(col);

        // Ζητάμε αναλυτικά τις γλώσσες για το repo
        fetch(repo.languages_url)
          .then(res => res.json())
          .then(languages => {
            const langDiv = col.querySelector(".languages");
            if (Object.keys(languages).length === 0) {
              langDiv.innerHTML = `<span class="badge bg-secondary">No language data</span>`;
            } else {
              langDiv.innerHTML = createLangBar(languages);
            }
          })
          .catch(err => {
            console.error("Σφάλμα φόρτωσης γλωσσών:", err);
          });
      });
    })
    .catch(error => {
      console.error("Σφάλμα φόρτωσης GitHub projects:", error);
      repoList.innerHTML = "<p>Αποτυχία φόρτωσης έργων από GitHub.</p>";
    });
});

