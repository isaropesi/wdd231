const apiKey = '41bf71ebe50e32751608769beb17aab9'; // Substitua pela sua chave da OpenWeatherMap
const city = 'Florianopolis,BR';
const weatherCurrent = document.getElementById('weather-current');
const weatherIcon = document.getElementById('weather-icon');
const weatherTemp = document.getElementById('weather-temp');
const weatherDesc = document.getElementById('weather-desc');
const weatherForecast = document.getElementById('weather-forecast');

async function fetchWeather() {
    // Current weather
    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    // 3-day forecast
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

    // Current
    const currentRes = await fetch(currentUrl);
    const currentData = await currentRes.json();
    if (currentData && currentData.weather && currentData.weather.length > 0) {
        // Remove weather icon usage
        weatherIcon.style.display = 'none';
        weatherTemp.textContent = `${Math.round(currentData.main.temp)}°C`;
        weatherDesc.textContent = currentData.weather[0].description;
    }

    // Forecast (3 days)
    const forecastRes = await fetch(forecastUrl);
    const forecastData = await forecastRes.json();
    if (forecastData && forecastData.list) {
        // Get next 3 days at 12:00
        const days = {};
        forecastData.list.forEach(item => {
            const date = new Date(item.dt_txt);
            if (date.getHours() === 12) {
                const day = date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
                if (!days[day] && Object.keys(days).length < 3) {
                    days[day] = item;
                }
            }
        });
        weatherForecast.innerHTML = '';
        Object.entries(days).forEach(([day, item]) => {
            const div = document.createElement('div');
            div.innerHTML = `
                <strong>${day}</strong><br>
                ${Math.round(item.main.temp)}°C<br>
                <span>${item.weather[0].description}</span>
            `;
            weatherForecast.appendChild(div);
        });
    }
}

fetchWeather();
