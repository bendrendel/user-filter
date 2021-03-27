const cardContainer = document.getElementById('card-container');
const searchBar = document.getElementById('search-bar');

initializeApp();

async function initializeApp() {
    let userData = await getUserData(500);
    makeUserCards(userData);

    searchBar.addEventListener('input', e => {
        const searchTerm = e.target.value.toLowerCase();

        const filteredUserData = userData.filter(user => {
            const searchableData = `
                ${user.name.first.toLowerCase()} ${user.name.last.toLowerCase()} 
                ${user.location.city.toLowerCase()}, ${user.location.country.toLowerCase()}`;
            return searchableData.includes(searchTerm);
        })

        makeUserCards(filteredUserData);
    })
}

async function getUserData(numUsers) {
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

function makeUserCards(userData) {
    cardContainer.innerHTML = '';

    userData.forEach((user) => {
        const userCard = document.createElement('div');
        userCard.classList.add('user-card');
        userCard.innerHTML = `
            <img src="${user.picture.large}" alt="Photo of ${user.name.first} ${user.name.last}">
            <div class="info">
                <h2>${user.name.first} ${user.name.last}</h2>
                <p>${user.location.city}, ${user.location.country}</p>
            </div>`;
        cardContainer.append(userCard);
    });
}