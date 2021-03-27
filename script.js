const userContainer = document.getElementById('user-container');
const searchBar = document.getElementById('search-bar');
let data;

populateList(100);

async function populateList(numUsers) {
    data = await getUsers(numUsers);
    for (let i = 0; i < numUsers; i++) {
        const userEl = document.createElement('div');
        userEl.classList.add('user');
        userEl.innerHTML =`
        <img src="${data[i].picture.large}" alt="Photo of ${data[i].name.first} ${data[i].name.last}">
        <div class="info">
            <h2>${data[i].name.first} ${data[i].name.last}</h2>
            <p>${data[i].location.city}, ${data[i].location.country}</p>
        </div>
        `
        userContainer.append(userEl);
    }

    searchBar.addEventListener('input', e => {
        const filteredData = data.filter(item => {
            return item.name.first.includes(e.target.value);
        })

        userContainer.innerHTML = '';

        filteredData.forEach(item => {
            const userEl = document.createElement('div');
            userEl.classList.add('user');
            userEl.innerHTML = `
            <img src="${item.picture.large}" alt="Photo of ${item.name.first} ${item.name.last}">
            <div class="info">
                <h2>${item.name.first} ${item.name.last}</h2>
                <p>${item.location.city}, ${item.location.country}</p>
            </div>
            `;
            userContainer.append(userEl);
        })
    })
}

async function getUsers(numUsers) {
    const url = 'https://randomuser.me/api/';
    const resultsParam = `?results=${numUsers}`;
    const endpoint = url + resultsParam;

    try {
        const response = await fetch(endpoint);

        if (response.ok) {
            json = await response.json();
            return json.results;
        } else {
            throw new Error(`HTTP Error: ${response.status}`);
        }
    } catch(e) {
        console.log(e);
    }
}