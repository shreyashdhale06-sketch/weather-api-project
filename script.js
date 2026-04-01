async function getWeather() {
  const city = document.getElementById("city").value;

  try {
    // Step 1: Convert city to coordinates
    const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
    const geoData = await geoRes.json();

    if (!geoData.results) {
      document.getElementById("result").innerHTML = "City not found!";
      return;
    }

    const lat = geoData.results[0].latitude;
    const lon = geoData.results[0].longitude;

    // Step 2: Get weather data
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
    );
    const weatherData = await weatherRes.json();

    const temp = weatherData.current_weather.temperature;
    const wind = weatherData.current_weather.windspeed;

    document.getElementById("result").innerHTML = `
      <h2>${city}</h2>
      <p>Temperature: ${temp} °C</p>
      <p>Wind Speed: ${wind} km/h</p>
    `;
  } catch (error) {
    document.getElementById("result").innerHTML = "Error fetching data!";
    console.log(error);
  }
}