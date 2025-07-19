// Set the current year
document.getElementById("currentyear").textContent = new Date().getFullYear();

// Set the last modified date
document.getElementById("lastModified").textContent = "Last Modified: " + document.lastModified;



//WIND CHILL
// Wind Chill for Central London
const apiKey = 'a9a02ba6aff6a8ec2242d7069915dbbc';
const city = 'London';
const units = 'metric'; // For Celsius

const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

fetch(url)
    .then(response => response.json())
    .then(data => {
        const temp = data.main.temp;
        const windSpeed = data.wind.speed;

        // One-line wind chill function
        const calculateWindChill = (t, s) =>
            (13.12 + 0.6215 * t - 11.37 * Math.pow(s, 0.16) + 0.3965 * t * Math.pow(s, 0.16)).toFixed(1) + '°C';

        let windChill = 'N/A';

        // Only call function if both conditions are met
        if (temp <= 10 && windSpeed > 2.8) {
            windChill = calculateWindChill(temp, windSpeed);
        } else {
            windChill = temp.toFixed(1) + '°C'; // fallback to temp
        }

        document.getElementById('wind-chill').textContent = `Wind Chill: ${windChill}`;
    })
    .catch(error => {
        console.error('Error fetching weather data:', error);
        document.getElementById('wind-chill').textContent = 'Wind Chill: Error';
    });
