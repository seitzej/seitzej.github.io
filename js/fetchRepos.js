function fetchRecentRepos() {
  const URL = 'https://api.github.com/users/seitzej/repos?sort=updated';
  return fetch(URL)
    .then(response => response.json())
    .then(json => {
      const repos = json.map(({ name, full_name, description }) => ({
        name,
        url: `https://www.github.com/${full_name}`,
        description
      }));
      // remove repos w/o descriptions
      const withDescription = repos.filter(({ description }) => description);

      return withDescription;
    })
}

function repoHTML(repo) {
  return `
    <article class="project">
      <header>${repo.name}</header>
      <section class="description">
        ${repo.description}
      </section>
      <footer>
        <a href="${repo.url}" target="_blank">See on github</a>
      </footer>
    </article>
  `;
}


function appendAllRepos(data) {
  const container = document.querySelector("#github-projects");
  data.forEach(repo => {
    container.innerHTML += repoHTML(repo);
  });
}
