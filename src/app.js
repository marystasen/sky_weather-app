//current data
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
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
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function displayForecast() {
  let forecastElement = document.querySelector("#daily-forecast");

  let forecastHTML = `<div class="row">`;

  let days = ["Wed", "Thu", "Fri", "Sat", "Sun", "Mon"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
            <div class="forecast-date">
            ${day}
            </div>
            <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/broken-clouds-day.png" alt="" width="50" />
            <div class="forecast-temperature">
              <span class="temp-max">
            28º 
            </span>
            <span class="temp-min">
             11º
             </span>
            </div>
          </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayTemperature(responce) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  temperatureElement.innerHTML = Math.round(responce.data.temperature.current);
  cityElement.innerHTML = responce.data.city;
  descriptionElement.innerHTML = responce.data.condition.description;
  humidityElement.innerHTML = responce.data.temperature.humidity;
  windElement.innerHTML = Math.round(responce.data.wind.speed);
  dateElement.innerHTML = `Last updated:
   ${formatDate(responce.data.time * 1000)}`;
  iconElement.setAttribute("src", responce.data.condition.icon_url);
  iconElement.setAttribute("alt", responce.data.condition.description);

  console.log(responce.data);
}

function search(city) {
  let apiKey = "cf5ea9841oaacf10033cdea44t6f44bb";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}
search("London");
displayForecast();

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
