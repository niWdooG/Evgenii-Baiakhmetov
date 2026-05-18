// script.js

// ======================== GITHUB REPOS (only runs on pages that have #github-repos) ========================
const reposContainer = document.getElementById('github-repos');

if (reposContainer) {
    const githubUsername = 'YOUR_GITHUB_USERNAME'; 

    fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated`)
        .then(response => response.json())
        .then(repos => {
            const myRepos = repos.filter(repo => !repo.fork).slice(0, 6);
            
            myRepos.forEach(repo => {
                const card = `
                    <div class="col-md-4">
                        <div class="card h-100">
                            <div class="card-body">
                                <h5 class="card-title">${repo.name}</h5>
                                <p class="card-text">${repo.description || 'No description available.'}</p>
                                <p class="text-muted"><small>Language: ${repo.language || 'N/A'}</small></p>
                                <a href="${repo.html_url}" target="_blank" class="btn btn-outline-primary btn-sm">View Code</a>
                            </div>
                        </div>
                    </div>
                `;
                reposContainer.innerHTML += card;
            });
        })
        .catch(error => console.error('Error fetching repos:', error));
}

// ======================== THEME TOGGLE (works on ALL pages) ========================
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle'); // the checkbox
    const html = document.documentElement;

    // Load saved theme or system preference
    const savedTheme = localStorage.getItem('theme') ||
                       (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    html.setAttribute('data-bs-theme', savedTheme);
    if (themeToggle) themeToggle.checked = savedTheme === 'dark';

    // Listen for toggle changes (slide switch)
    if (themeToggle) {
        themeToggle.addEventListener('change', () => {
            const newTheme = themeToggle.checked ? 'dark' : 'light';
            html.setAttribute('data-bs-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
});