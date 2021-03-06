/** @format */

//get Time
function formatDate(timestamp) {
	let now = new Date(timestamp);
	let days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
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
		"December",
	];
	let weekday = days[now.getDay()];
	let month = months[now.getMonth()];
	let hours = now.getHours();
	let minute = now.getMinutes();
	if (minute < 10) {
		minute = `0${minute}`;
	}
	if (hours < 10) {
		hours = `0${hours}`;
	}
	let year = now.getFullYear();
	let time = document.querySelector("#time");
	let day = now.getDate();
	return `${weekday}, ${month} ${day} ${year} - ${hours}:${minute}`;
}

function formatDay(timestamp) {
	let date = new Date(timestamp * 1000);
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
	return day;
}
// Creating the Forcast

function displayForecast(response) {
	let forcast = response.data.daily;
	let forecastElement = document.querySelector("#forecast");
	let forecastHTML = "";
	forcast.forEach(function (forcastday, index) {
		if (index < 5) {
			forecastHTML =
				forecastHTML +
				`
      <div class="col forcast-days">
        <div class="weather-forcast-date">${formatDay(forcastday.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
						forcastday.weather[0].icon
					}@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="hightest-temperature"> ${Math.round(
						forcastday.temp.max
					)} </span> /
          <span class="lowest-temperature "> ${Math.round(
						forcastday.temp.min
					)} </span>
        </div>
      </div>
  `;
		}
	});
	forecastElement.innerHTML = forecastHTML;
	forecastElement.innerHTML = forecastHTML;
}

function getForecast(coords) {
	let apiKey = "b61934cde5be0cecf7eae593bdfe5740";
	let unit = "metric";
	let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&exclude={part}&appid=${apiKey}&units=${unit}`;
	axios.get(apiUrl).then(displayForecast);
}

function displayPollen(response) {
	let grass = document.querySelector("#grass");
	grass.innerHTML = response.data.data[0].Risk.grass_pollen;
	let tree = document.querySelector("#tree");
	tree.innerHTML = response.data.data[0].Risk.tree_pollen;
	let weed = document.querySelector("#weed");
	weed.innerHTML = response.data.data[0].Risk.weed_pollen;
}

function getPollen(coords) {
	const options = {
		method: "GET",
		url: "https://api.ambeedata.com/latest/pollen/by-lat-lng",
		params: { lat: coords.lat, lng: coords.lon },
		headers: {
			"x-api-key": "n2wGin6Yrd4x3PcyCMxB25GIUdAoUSy6CesEeIPi",
			"Content-type": "application/json",
		},
	};
	axios.request(options).then(displayPollen);
}

// get search engine

function search(city) {
	let apiKey = "b61934cde5be0cecf7eae593bdfe5740";
	let unit = "metric";
	let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
	axios.get(url).then(showTemperature);
}
function showTemperature(response) {
	let currentTemp = document.querySelector("#current-temperature");
	celciusTemperature = Math.round(response.data.main.temp);
	currentTemp.innerHTML = celciusTemperature;
	let cityname = document.querySelector("#city");
	cityname.innerHTML = response.data.name;
	let humidity = document.querySelector("#humidity");
	humidity.innerHTML = response.data.main.humidity;
	let windspeed = document.querySelector("#windspeed");
	windspeed.innerHTML = Math.round(response.data.wind.speed);
	let description = document.querySelector("#description");
	description.innerHTML = response.data.weather[0].description;
	let time = document.querySelector("#time");
	time.innerHTML = formatDate(response.data.dt * 1000);
	let iconElement = document.querySelector("#icon");
	iconElement.setAttribute(
		"src",
		`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
	);
	iconElement.setAttribute("alt", response.data.weather[0].description);
	getForecast(response.data.coord);
	getPollen(response.data.coord);
}

function handleForm(event) {
	event.preventDefault();
	let city = document.querySelector("#search-bar").value;
	search(city);
}

let searchform = document.querySelector("#search-form");
searchform.addEventListener("submit", handleForm);

let celciusTemperature = null;

search("Vienna");

// getting the current Button

function showCurrent(position) {
	let lat = position.coords.latitude;
	let lon = position.coords.longitude;
	let apiKey = "b61934cde5be0cecf7eae593bdfe5740";
	let unit = "metric";
	let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
	axios.get(url).then(showTemperature);
}

function currentPosisiton() {
	navigator.geolocation.getCurrentPosition(showCurrent);
}

let currentButton = document.querySelector("#current");
currentButton.addEventListener("click", currentPosisiton);
