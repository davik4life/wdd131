const temperature = 31;
const windSpeed = 12;

function calculateWindChill(tempCelsius, windSpeedKmh) {
    return 13.12 + 0.6215 * tempCelsius - 11.37 * windSpeedKmh ** 0.16 + 0.3965 * tempCelsius * windSpeedKmh ** 0.16;
}

const currentYearElement = document.getElementById("currentyear");
currentYearElement.textContent = new Date().getFullYear();

const lastModifiedElement = document.getElementById("lastModified");
lastModifiedElement.textContent = `Last modified: ${document.lastModified}`;

const windChillElement = document.getElementById("wind-chill");
if (temperature <= 10 && windSpeed > 4.8) {
    windChillElement.textContent = `${calculateWindChill(temperature, windSpeed).toFixed(1)} °C`;
} else {
    windChillElement.textContent = "N/A";
}
