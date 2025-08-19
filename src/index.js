function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperatue");
   let temperatue= response.data.temperature.current;
   let cityElement = document.querySelector("#city-details");
  

   cityElement.innerHTML = response.data.city;
   temperatureElement.innerHTML = Math.round(temperatue);
}

function searchCity(city) {
  let apiKey = "2d2b3bf3aa9770ff0e33400b5b8o403t";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  

  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("paris");