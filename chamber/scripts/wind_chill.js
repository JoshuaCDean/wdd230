function calculateWindChill()
{
    const degrees = parseInt(document.querySelector("#weatherDegrees").innerHTML); 
    const windSpeed = parseFloat(document.querySelector("#windSpeed").innerHTML);
    let windChill = "N/A";
    if (degrees <= 50 && windSpeed > 3.0)
    {
        windChill = (35.74 + (0.6215*degrees)-(35.75*(windSpeed**0.16)) + (0.4275*degrees*(windSpeed**0.16))).toFixed(1)
    }
    
    document.querySelector("#windChill").innerHTML = `${windChill} &#176;F`;
}


calculateWindChill();