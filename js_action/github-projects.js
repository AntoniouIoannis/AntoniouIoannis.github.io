document.addEventListener("DOMContentLoaded", function () {
  const username = "AntoniouIoannis";
  const repoList = document.getElementById("repo-list");

  fetch(`https://api.github.com/users/${username}/repos`)
    .then(response => response.json())
    .then(repos => {
      repos.forEach(repo => {
        if (repo.fork || !repo.description) return;

        const col = document.createElement("div");
        col.className = "col-md-6 col-lg-4 mb-4";

        col.innerHTML = `
          <div class="card h-100 shadow-sm">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${repo.name}</h5>
              <p class="card-text">${repo.description}</p>
              <a href="${repo.html_url}" target="_blank" class="btn btn-primary mt-auto">View on GitHub</a>
            </div>
          </div>
        `;

        repoList.appendChild(col);
      });
    })
    .catch(error => {
      console.error("Σφάλμα φόρτωσης GitHub projects:", error);
      repoList.innerHTML = "<p>Αποτυχία φόρτωσης έργων από GitHub.</p>";
    });
});
