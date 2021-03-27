const cardContainer = document.getElementById('card-container');
const searchBar = document.getElementById('search-bar');

initializeApp();

async function initializeApp() {
    let userData = await getUserData(500);

    const userCards = makeUserCards(userData);

    searchBar.addEventListener('input', e => {
        const searchTerm = e.target.value.toLowerCase();

        userCards.forEach(card => {
            if (card.innerHTML.toLowerCase().includes(searchTerm)) {
                card.classList.remove('hide');
            } else {
                card.classList.add('hide');
            }
        })
    });
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
    let userCards =[];

    cardContainer.innerHTML = '';

    userData.forEach((user) => {
        const card = document.createElement('li');
        card.innerHTML = `
            <img src="${user.picture.large}" alt="Photo of ${user.name.first}">
            <div class="info">
                <h2>${user.name.first} ${user.name.last}</h2>
                <p>${user.location.city}, ${user.location.country}</p>
            </div>`;
        userCards.push(card);
        cardContainer.append(card);
    });
    
    return userCards;
}