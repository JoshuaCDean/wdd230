function toggleMenu() {
    document.getElementById("hamburgerNav").classList.toggle("open");
    document.getElementById("hamburgerBtn").classList.toggle("open");
    document.getElementById("burgerBox").classList.toggle("open");
}

const x = document.getElementById("hamburgerBtn");

x.onclick = toggleMenu;


//Footer Date
let daynames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

let months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
];

let d = new Date(document.lastModified);
let year = d.getFullYear();
let fulldate = `Last Updated: ${d.getMonth()+1}/${d.getDate()}/${year} ${minTwoDigits(d.getHours())}:${minTwoDigits(d.getMinutes())}:${minTwoDigits(d.getSeconds())}`
const copyyears = document.querySelectorAll(".copyyear");
const currentdates = document.querySelectorAll(".currentdate")

var i;
for (i = 0; i < copyyears.length; i++) {
  copyyears[i].textContent= year;
  currentdates[i].textContent = fulldate;
}

function minTwoDigits(n) {
    return (n < 10 ? '0' : '') + n;
}


const visitDays = document.querySelector("#daysVisit");
const lastVisit = Date.parse(window.localStorage.getItem("last-visit"));


// --------------- WEATHER --------------------//
const weatherAPI = "https://api.openweathermap.org/data/2.5/weather?q=Carlsbad&units=imperial&appid=6a25746225544cae7f4ca8c6e5598485";
const forecastAPI = "https://api.openweathermap.org/data/2.5/forecast?q=Carlsbad&units=imperial&appid=6a25746225544cae7f4ca8c6e5598485";
const weatherDegrees = document.querySelector("#weather-degrees");
const weatherIcon = document.querySelector("#weather-icon");
const weatherDescription = document.querySelector("#weather-description");
const weatherHumidity = document.querySelector("#weather-humidity");
const forecast1Date = document.querySelector("#forecast1-date")
const forecast2Date = document.querySelector("#forecast2-date")
const forecast3Date = document.querySelector("#forecast3-date")
const forecast1Icon = document.querySelector("#forecast1-icon");
const forecast2Icon = document.querySelector("#forecast2-icon");
const forecast3Icon = document.querySelector("#forecast3-icon");
const forecast1Description = document.querySelector("#forecast1-description");
const forecast2Description = document.querySelector("#forecast2-description");
const forecast3Description = document.querySelector("#forecast3-description");

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

async function apiFetchForecast(url)
{
    try {
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            calculateForecastInfo(data);
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
    weatherDegrees.innerHTML = `${weatherData.main.temp.toFixed(0)} &deg;F`
    const iconsrc = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`
    const desc = weatherData.weather[0].description;
    let description = capitilizeWords(desc);
    weatherIcon.setAttribute("src", iconsrc);
    weatherIcon.setAttribute("alt", description);
    weatherDescription.textContent = description;
    weatherHumidity.innerHTML = `Humidity: ${weatherData.main.humidity.toFixed(0)}%`

}

function calculateForecastInfo(forecastData)
{
    const forecast1 = forecastData.list[5];
    const forecast2 = forecastData.list[13];
    const forecast3 = forecastData.list[21];
    forecast1Date.textContent = `${forecast1.dt_txt.split(" ")[0]}`
    forecast2Date.textContent = `${forecast2.dt_txt.split(" ")[0]}`
    forecast3Date.textContent = `${forecast3.dt_txt.split(" ")[0]}`

    forecast1Icon.setAttribute("src", `https://openweathermap.org/img/w/${forecast1.weather[0].icon}.png`)
    forecast2Icon.setAttribute("src", `https://openweathermap.org/img/w/${forecast2.weather[0].icon}.png`)
    forecast3Icon.setAttribute("src", `https://openweathermap.org/img/w/${forecast3.weather[0].icon}.png`)

    forecast1Description.textContent = `${capitilizeWords(forecast1.weather[0].description)}`;
    forecast2Description.textContent = `${capitilizeWords(forecast2.weather[0].description)}`;
    forecast3Description.textContent = `${capitilizeWords(forecast3.weather[0].description)}`;
}

function capitilizeWords(sentence)
{
    let description = sentence.split(" ");

    for (let i = 0; i < description.length; i++) {
        description[i] = description[i][0].toUpperCase() + description[i].substr(1);
    }
    description = description.join(" ")
    return description
}

if (weatherDegrees)
{
    apiFetchWeather(weatherAPI);
    apiFetchForecast(forecastAPI);
}



// --------------- FORM  ---------------------//
const fruitURL = "https://brotherblazzard.github.io/canvas-content/fruit.json"
const fruits1 = document.querySelector("#fruit1")
const fruits2 = document.querySelector("#fruit2")
const fruits3 = document.querySelector("#fruit3")

async function fetchFruits(url, formProcess = false)
{
    try {
        const response = await fetch(url)
        if (response.ok)
        {
            const data = await response.json();
            console.table(data);
            if (formProcess)
                processForm(data)
            else
            {
                showAllFruits(data);
            }
        
        } else {
            throw Error(await response.text());
        }

    } catch(error)
    {
        console.log(error);
    }
}


function startFormProcess(event)
{
    event.preventDefault(); 
    fetchFruits(fruitURL, true)
}

function showAllFruits(fruits)
{
    let indexCounter = 0
    fruits.forEach((fruit) => {
        let option1 = document.createElement("option");
        let option2 = document.createElement("option");
        let option3 = document.createElement("option");
        const name = `${fruit.name}`;
        const index = `${indexCounter}`
        option1.text = name;
        option1.setAttribute("value", index);
        option2.text = name;
        option2.setAttribute("value", index);
        option3.text = name;
        option3.setAttribute("value", index);
        fruits1.add(option1)
        fruits2.add(option2)
        fruits3.add(option3)
        indexCounter+= 1
    })
}

if (fruits1)
{
    fetchFruits(fruitURL)
}


function processForm(data)
{
    const thankYou = document.querySelector("#thankYou")
    const name = document.querySelector("#fname")
    const email = document.querySelector("#email")
    const phone = document.querySelector("#phone")
    const instructions = document.querySelector("#sinstructions")
    const fruit1 = data[parseInt(fruits1.options[fruits1.selectedIndex].getAttribute("value"))]
    const fruit2 = data[parseInt(fruits2.options[fruits2.selectedIndex].getAttribute("value"))]
    const fruit3 = data[parseInt(fruits3.options[fruits3.selectedIndex].getAttribute("value"))]
    const html = `<h2> Thank You For Your Submission! </h2>
                  <p> Your Drink is being processed </p>
                  <section id="applicantInfo">
                    <h3> Applicant Information: </h3>
                    <p> ${name.value}</p>
                    <p> ${email.value}</p>
                    <p> ${phone.value}</p>
                    <p> ${instructions.value}</p>

                    <h3> Chosen Fruits:</h3>
                    <p>${fruit1.name}</p>
                    <p>${fruit2.name}</p>
                    <p>${fruit3.name}</p>

                    <h3>Drink Nutritional Facts: </h3>
                    <p>${(fruit1.nutritions.calories + fruit2.nutritions.calories + fruit3.nutritions.calories).toFixed(0)} Calories</p>
                    <p>${(fruit1.nutritions.carbohydrates + fruit2.nutritions.carbohydrates + fruit3.nutritions.carbohydrates).toFixed(2)} Carbohydrates</p>
                    <p>${(fruit1.nutritions.fat + fruit2.nutritions.fat + fruit3.nutritions.fat).toFixed(2)} Fats</p>
                    <p>${(fruit1.nutritions.protein + fruit2.nutritions.protein + fruit3.nutritions.protein).toFixed(2)} Proteins</p>
                    <p>${(fruit1.nutritions.sugar + fruit2.nutritions.sugar + fruit3.nutritions.sugar).toFixed(2)} Sugars</p>
                    
                  </section>`

    thankYou.innerHTML = html;
    thankYou.classList.toggle("hidden")

    let drinksSubmitted = window.localStorage.getItem("drinks-submitted");
    if (drinksSubmitted == null)
    {
        drinksSubmitted = 0
    }
    let newSubmit = parseInt(drinksSubmitted);
    newSubmit += 1;
    localStorage.setItem("drinks-submitted", newSubmit);
    
}
const submitForm = document.querySelector("#drinkForm");
if (submitForm) {
    
    submitForm.addEventListener("submit", startFormProcess);
}


const orderedDrinks = document.querySelector("#drinksOrdered")

if (orderedDrinks)
{
    let drinksSubmitted = window.localStorage.getItem("drinks-submitted");
    if (drinksSubmitted == null)
    {
        drinksSubmitted = 0
    }
    orderedDrinks.innerHTML = `${drinksSubmitted}`
}


//  ------------- LAZY LOADING -------------- //

const imagesToLoad = document.querySelectorAll("img[data-src]");

const imgOptions = {
    threshold: 0,
    rootMargin: "0px 0px 50px 0px"
};

const loadImages = (image) => {
    image.setAttribute("src", image.getAttribute("data-src"));
    image.onload = () => {image.removeAttribute("data-src");};
};

if("IntersectionObserver" in window) {
    console.log("In")
    const imgObserver = new IntersectionObserver((items, observer) => {
        items.forEach((item) => {
            if (item.isIntersecting) {
                loadImages(item.target);
                observer.unobserve(item.target);
            }
        });
    }, imgOptions);


    imagesToLoad.forEach((img) => {
        imgObserver.observe(img);
    });
} else {
    console.log("Failed")
    imagesToLoad.forEach((item) => {
        loadImages(item);
    });
}