const api_url = "https://api.github.com/users/";

const form = document.querySelector('#form')
const search = document.querySelector('#search')
const main = document.querySelector('#main')

getUsers('florinpop17');

async function getUsers(username) {
    const resp = await fetch(api_url + username);
    const respData = await resp.json();
    createUserCard(respData);
    getRepos(username);
}

async function getRepos(username) {
    const resp = await fetch(api_url + username + '/repos');
    const respData = await resp.json();
    addReposToCard(respData);
}

function createUserCard(user) {
    const cardHTML = `
        <div class="card">
            <div>
                <img
                    class="avater"
                    src="${user.avatar_url}"
                    alt="${user.name}"
                />
            </div>
            <div class="user-info">
                <h2>${user.name}</h2>
                <p>${user.bio}</h2>

                <ul class="info">
                    <li>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
                        </svg>
                        ${user.followers}
                    </li>
                    <li>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        ${user.following}
                    </li>
                    <li>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79  8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                        </svg>
                        ${user.public_repos}
                    </li>
                </ul>

                <h4>Repos</h4>
                <div id="repos"></div>
            </div>
        </div>
    `;
    main.innerHTML = cardHTML;
}

function addReposToCard(repos) {
    const reposElement = document.querySelector('#repos');
    repos.sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 10).forEach(repo => {
        const repoElement = document.createElement('a');
        repoElement.classList.add('repo');
        repoElement.href = repo.html_url;
        repoElement.target = '_blank';
        repoElement.innerText = repo.name;
        reposElement.appendChild(repoElement);
    });
}

form.addEventListener('submit', e => {
    e.preventDefault();
    const user = search.value;
    if (user) {
        getUsers(user);
        search.value = '';
    }
});