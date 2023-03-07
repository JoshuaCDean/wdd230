const bData = "json/data.json"

//Burger Menu
function toggleMenu() {
    document.getElementById("primaryNav").classList.toggle("open");
    document.getElementById("hamburgerBtn").classList.toggle("open");
    document.getElementById("burgerBox").classList.toggle("open");
    document.getElementById("headerLogo").classList.toggle("close");
    document.getElementById("headerTextInfo").classList.toggle("close");
    document.getElementById("social-logo-box").classList.toggle("close");
    document.getElementById("head-date-holder").classList.toggle("close");
}

const x = document.getElementById("hamburgerBtn");

x.onclick = toggleMenu;



//Header Date
const headerDate = document.querySelector("#headerCurTime");
const now = new Date();
const headFullDate = new Intl.DateTimeFormat("en-UK", { dateStyle: "full" }).format(
	now
);
headerDate.innerHTML = `<em>${headFullDate}</em>`;



if (now.getDay() == 1 || now.getDay() == 2) {
    const banner = document.querySelector("#banner");
    if (!banner == null)
    {
        
    banner.style.display = "block";
    }
}





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
const todayDate = now.getDate();
let daySinceLastVisit = 0
if (!lastVisit == NaN)
{
    daySinceLastVisit = math.ceil((lastVisit.getTime() - todayDate.getTime())/ (1000*3600*24))
}

localStorage.setItem("last-visit", todayDate);
if (visitDays)
{
    visitDays.textContent = `${daySinceLastVisit} `;
}


// Join Hidden Date Time
const forumDateTime = document.querySelector("#forumDateTime");
const dateandTime = `Date: ${now.getDate()} Time: ${now.getTime()}`;
if (forumDateTime) {
    forumDateTime.innerHTML = dateandTime;
}


// Directory Setup

async function GetBusinessData()
{
    const response = await fetch(bData);
    const data = await response.json();
    console.table(data.businesses);
    displayBusinesses(data.businesses);
}

function displayBusinesses(businesses)
{
    const cards = document.querySelector(".cards")
    if (cards)
    {
        businesses.forEach((business) => {
            let card = document.createElement("section");
            let name = document.createElement("h2");
            let portrait = document.createElement("img");
            let link = document.createElement("a");
            let number = document.createElement("p");

            name.textContent = `${business.name}`;
            portrait.setAttribute("src", business.image);
            portrait.setAttribute("alt", `Picture of ${business.name}`);
            portrait.setAttribute("loading", "lazy");
            portrait.setAttribute("width", 300);
            portrait.setAttribute("height", 200);
            link.textContent = "Website";
            link.setAttribute("href", business.website);
            number.textContent = `${business.phonenumber}`;

            card.appendChild(name);
            card.appendChild(portrait);
            card.appendChild(link);
            card.appendChild(number);
            cards.appendChild(card);
        })
    }
}

GetBusinessData();


// Scrolling Checker

console.log("Starting")

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