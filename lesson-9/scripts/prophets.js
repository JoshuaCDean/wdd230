const url = "https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json";
async function getProphetData() {
  const response = await fetch(url);
  const data = await response.json();
  console.table(data.prophets);
  displayProphets(data.prophets);
}

function displayProphets(prophets) {
    const cards = document.querySelector("div.cards");
    prophets.forEach((prophet) => {
        let card = document.createElement("section");
        let h2 = document.createElement("h2");
        let birthDate = document.createElement("p");
        let birthPlace = document.createElement("p");
        let portrait = document.createElement("img");

        h2.textContent =`${prophet.name} ${prophet.lastname}`;
        birthDate.textContent = `Birth Date: ${prophet.birthdate}`
        birthPlace.textContent = `Birth Place: ${prophet.birthplace}`
        portrait.setAttribute("src", prophet.imageurl);
        portrait.setAttribute("alt", `Portrait of ${prophet.name} ${prophet.lastname}`);
        portrait.setAttribute("loading", "lazy");
        portrait.setAttribute("width", "340");
        portrait.setAttribute("height", "440");

        card.appendChild(h2);
        card.appendChild(birthDate);
        card.appendChild(birthPlace);
        card.appendChild(portrait);
        cards.appendChild(card);
    })
    
}

getProphetData();