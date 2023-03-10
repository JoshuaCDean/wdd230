
const weatherAPI = "https://api.openweathermap.org/data/2.5/weather?q=Coffeyville&units=imperial&appid=6a25746225544cae7f4ca8c6e5598485";
const weatherDegrees = document.querySelector("#weatherDegrees");
const weatherIcon = document.querySelector("#weather-icon");
const weatherDescription = document.querySelector("#weatherDescription");
const weatherWindSpeed = document.querySelector("#windSpeed");
const weatherHumidity = document.querySelector("#humidity")

async function apiFetchWeather(url) {
    try {
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            calculateWeatherInfo(data);
        } else {
            throw Error(await response.text());
        }
    }   catch (error)
    {
        console.log(error);
    }
}

function calculateWeatherInfo(weatherData)
{
    weatherDegrees.innerHTML = `${weatherData.main.temp.toFixed(0)}`
    const iconsrc = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`
    const desc = weatherData.weather[0].description;
    let description = desc.split(" ");

    for (let i = 0; i < description.length; i++) {
        description[i] = description[i][0].toUpperCase() + description[i].substr(1);
    }
    description = description.join(" ")
    weatherIcon.setAttribute("src", iconsrc);
    weatherIcon.setAttribute("alt", description);
    weatherDescription.textContent = description;

    weatherWindSpeed.innerHTML = `${weatherData.wind.speed.toFixed(2)}`
    weatherHumidity.innerHTML = `${weatherData.main.humidity.toFixed(0)}`

    calculateWindChill();
}



function calculateWindChill()
{
    const theDegrees =document.querySelector("#weatherDegrees")
    if (theDegrees)
    {
        const degrees = parseInt(theDegrees.innerHTML); 
        const windSpeed = parseFloat(document.querySelector("#windSpeed").innerHTML);
        let windChill = "N/A";
        if (degrees <= 50 && windSpeed > 3.0)
        {
            windChill = `${(35.74 + (0.6215*degrees)-(35.75*(windSpeed**0.16)) + (0.4275*degrees*(windSpeed**0.16))).toFixed(0)} &#176;F`
        }

        document.querySelector("#windChill").innerHTML = `${windChill}`;
    }
}


apiFetchWeather(weatherAPI);