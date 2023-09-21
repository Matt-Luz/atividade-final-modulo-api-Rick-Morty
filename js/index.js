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

    card.innerHTML = `
        <img src = "${character.image}" />
        <h2>${character.name}</h2>
        <p>${character.status} - ${character.species}</p>
        <p>Last location:</p>
        <p>${character.location.name}</p>
        `;

    charactersList.appendChild(card);
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
