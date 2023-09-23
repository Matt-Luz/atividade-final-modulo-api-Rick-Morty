const charactersList = document.getElementById("charactersList");
const searchCharacters = document.getElementById("searchCharacters");

const pagination = document.getElementById("pagination");
const btnPrevious = document.getElementById("previous");
const btnNext = document.getElementById("next");

let currentPage = 1;
let info;

async function characterSearch(page = 1, name = "") {
  try {
    const params = {
      page,
      name,
    };

    const response = await api.get("/character", {
      params,
    });

    btnPrevious.disabled = true
    btnNext.disabled = true

    const characters = response.data.results;
    info = response.data.info;

    console.log(response.data);

    showCharacters(characters);

  } catch (error) {
    console.log("Erro ao buscar personagem:", error);
  };
};

function showCharacters(characters) {
  charactersList.innerHTML = "";

  characters.forEach((character) => {
    const card = document.createElement("div");
    card.classList.add("card");

    let statusClass;

    if (character.status === "Alive") {
      statusClass = 'status-alive'
    } else if (character.status === "Dead") {
      statusClass = 'status-dead'
    } else if (character.status === "unknown") {
      statusClass = 'status-unknown'
    };

    card.innerHTML = `
        <img src = "${character.image}" />
        <h2>${character.name}</h2>
        <p class="${statusClass}">${character.status} - ${character.species}</p>
        <p>Last location:</p>
        <p>${character.location.name}</p>
        `;

    charactersList.appendChild(card);

    btnPrevious.disabled = info.prev ? false : true
    btnNext.disabled = info.next ? false : true

  });
}

btnPrevious.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    characterSearch(currentPage, searchCharacters.value);
  }
});

btnNext.addEventListener("click", () => {
  if (currentPage < info.pages) {
    currentPage++;
    characterSearch(currentPage, searchCharacters.value);
  }
});

searchCharacters.addEventListener("input", () => {
  currentPage = 1;
  characterSearch(currentPage, searchCharacters.value);
});

characterSearch();
