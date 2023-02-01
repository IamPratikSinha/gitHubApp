const APIURL = 'https://api.github.com/users/';

const main = document.querySelector('#main');

const getUser = async (username) => {
  const response = await fetch(APIURL + username);
  //   console.log(response);
  const data = await response.json();

  main.innerHTML = `<div class="card">
<div>
  <img
    src="${data.avatar_url}"
    alt="User Image"
    class="avatar"
  />

</div>
<div class="user-info">
<h2>${data.name}</h2>
<p>${data.bio}</p>

<ul class="info">
  <li>${data.followers}<strong>Followers</strong></li>
  <li>${data.following}<strong>Following</strong></li>
  <li>${data.public_repos}<strong>Repos</strong></li>
</ul>

<div id="repos">
         
        </div>
</div>
</div>`;
  getRepos(username);
  console.log(data);
};

getUser('IamPratikSinha');

const getRepos = async (username) => {
  const response = await fetch(APIURL + username + '/repos');
  const data = await response.json();
  const repos = document.querySelector('#repos');
  data.forEach((item) => {
    const elem = document.createElement('a');
    elem.classList.add('repo');
    elem.href = item.html_url;
    elem.textContent = item.name;
    elem.target = '_blank';
    repos.appendChild(elem);
  });
  //   console.log(data);
};

const formSubmit = () => {
  const searchBox = document.querySelector('#search');
  if (searchBox.value !== '') {
    getUser(searchBox.value);
  }
  return false;
};
