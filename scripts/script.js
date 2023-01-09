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

document.getElementById("currentdate").textContent = fulldate;


function minTwoDigits(n) {
    return (n < 10 ? '0' : '') + n;
}