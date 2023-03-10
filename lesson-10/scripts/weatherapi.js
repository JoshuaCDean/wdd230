const currentTemp = document.querySelector("#current-temp");
const weatherIcon = document.querySelector("#weather-icon");
const captionDesc = document.querySelector("figcaption");

const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=Fairbanks&units=imperial&appid=6a25746225544cae7f4ca8c6e5598485"

async function apiFetch(url) {
    try {
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    }   catch (error)
    {
        console.log(error);
    }
}

function displayResults(weatherData) {
    currentTemp.innerHTML = `<strong>${weatherData.main.temp.toFixed(0)}</strong>`;

    const iconsrc = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`
    const desc = weatherData.weather[0].description;
    let description = desc.split(" ");

    for (let i = 0; i < description.length; i++) {
        description[i] = description[i][0].toUpperCase() + description[i].substr(1);
    }
    description = description.join(" ")
    
    weatherIcon.setAttribute("src", iconsrc);
    weatherIcon.setAttribute("alt", description);
    captionDesc.textContent = description;
}

apiFetch(apiURL)