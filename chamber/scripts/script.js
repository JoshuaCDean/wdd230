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
const headFullDate = new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(
	now
);
headerDate.innerHTML = `<em>${headFullDate}</em>`;



if (now.getDay() == 1 || now.getDay() == 2) {
    const banner = document.querySelector("#banner");
    banner.style.display = "block";
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