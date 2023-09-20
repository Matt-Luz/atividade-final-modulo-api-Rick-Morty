const charactersList = document.getElementById('charactersList');
const searchCharacters = document.getElementById('searchCharacters');

const pagination = document.getElementById('pagination');
const btnPrevious = document.getElementById("previous");
const btnNext = document.getElementById('next');

let currentPage = 1;

async function characterSearch(page = 1, name = "") {
    try {
        const params = {
            page,
            name
        };

        const response = await api.get('/character', {
            params
        });
        
        const characters = response.data.results;
        const info = response.data.info;
    
        console.log(response.data);

        showCharacters(characters);
        displayPagination(info)

    } catch (error) {
        console.log("Erro ao buscar personagem:", error);
    };

    
};


function showCharacters(characters) {
    charactersList.innerHTML = '';

    characters.forEach(character => {
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
        <img src = "${character.image}" />
        <h2>${character.name}</h2>
        <p>${character.status} - ${character.species}</p>
        <p>Última localização conhecida:</p>
        <p>${character.location.name}</p>
        `

        charactersList.appendChild(card);
    });
};

function displayPagination(info) {
    btnPrevious.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--
            characterSearch(currentPage);
        };
    });

    btnNext.addEventListener('click', () => {
        if (currentPage < info.pages) {
            currentPage++
            characterSearch(currentPage);
        };
    });
};

searchCharacters.addEventListener('input', () => {
    currentPage = 1;
    characterSearch(currentPage, searchCharacters.value);
});

characterSearch();