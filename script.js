/* search input and submitting the search */
const searchInput = document.getElementById("search-input");
const searchSubmit = document.getElementById("search-submit");

/*setting pokemon data on submit*/
searchSubmit.addEventListener("submit", async function (event) {
  event.preventDefault();

  /* inputValue as lower case for searching by name/id */
  const inputValue = searchInput.value.toLowerCase();
  /* data to set */
  const name = document.getElementById("pokemon-name");
  const id = document.getElementById("pokemon-id");
  const weight = document.getElementById("weight");
  const height = document.getElementById("height");
  const types = document.getElementById("types");
  const hp = document.getElementById("hp");
  const attack = document.getElementById("attack");
  const defense = document.getElementById("defense");
  const specialAttack = document.getElementById("special-attack");
  const specialDefense = document.getElementById("special-defense");
  const speed = document.getElementById("speed");
  try {
    const data = await fetch(
      `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${inputValue}`
    );
    const jsonData = await data.json();
    console.log(jsonData);
    name.textContent = jsonData.name.toUpperCase() + "\u00A0";
    name.classList.remove("hidden");
    id.textContent = "#" + jsonData.id;
    id.classList.remove("hidden");
    weight.textContent = jsonData.weight + "\u00A0";
    height.textContent = jsonData.height;
    hp.textContent = jsonData.stats[0].base_stat;
    attack.textContent = jsonData.stats[1].base_stat;
    defense.textContent = jsonData.stats[2].base_stat;
    specialAttack.textContent = jsonData.stats[3].base_stat;
    specialDefense.textContent = jsonData.stats[4].base_stat;
    speed.textContent = jsonData.stats[5].base_stat;
    types.innerHTML = jsonData.types
      .map(
        (obj) =>
          `<div class="type ${obj.type.name}">${obj.type.name}</div>`
      )
      .join("");
    types.classList.remove("hidden");
    const imgContainer = document.getElementById("img-container");
    /* if image showing in container, remove it */
    if (imgContainer.firstChild) {
      imgContainer.removeChild(imgContainer.firstChild);
    }
    const img = document.createElement("img");
    img.src = `${jsonData.sprites.front_default}`;
    img.alt = `${jsonData.name} front default sprite`;
    img.classList.add("img-thumbnail", "mx-auto");
    img.id = "sprite";
    imgContainer.appendChild(img);
  } catch (error) {
    alert("Pokémon not found");
    console.error("Error fetching data:", error);
  }
});
