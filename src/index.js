function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperatue");
  let temperatue = response.data.temperature.current;
  let cityElement = document.querySelector("#city-details");
  let cityDescription = document.querySelector("#description");
  let cityHumidity = document.querySelector("#humidity");
  let cityWindSpeed = document.querySelector("#wind-speed");
  let cityTime = document.querySelector("#time");

  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  cityTime.innerHTML = formatDate(date);
  cityElement.innerHTML = response.data.city;
  cityDescription.innerHTML = response.data.condition.description;
  cityHumidity.innerHTML = `${response.data.temperature.humidity}%`;
  cityWindSpeed.innerHTML = `${response.data.wind.speed}km/h`;
  temperatureElement.innerHTML = Math.round(temperatue);
  iconElement.innerHTML = `
     <img
       src="${response.data.condition.icon_url}"
       alt=""
       class="app-temp-icon"
     />`;
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
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
function displayForecast() {
  let foreCastElement = document.querySelector("#forecast");

  let days = ["Tue", "Wed", "Thur", "fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml = forecastHtml +`
   <div class="weather-forecast-day">
     <div class="weather-forecast-date">${day}</div>
     <div class="weather-forecast-icon">☀</div>
     <div class="weather-forecast-temperatures">
       <div class="weather-temperature">
         <strong>15°</strong>
       </div>
       <div class="weather-temperature">13°</div>
     </div>
   </div>
 `;
  });
  foreCastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("paris");
displayForecast();
