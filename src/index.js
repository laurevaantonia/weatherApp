  //get Time
  function formatDate (timestamp) {
    let now = new Date (timestamp);
    let days = [
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
  let weekday = days[now.getDay()];
  let month = months[now.getMonth()];
  let hours = now.getHours();
  let minute = now.getMinutes();
  if (minute < 10 ){
    minute = `0${minute}`
  }
  if (hours < 10) {
    hours = `0${hours}`
  }
  let year =now.getFullYear();
  let time = document.querySelector("#time")
  let day = now.getDate()
  return  `${weekday}, ${month} ${day} ${year} - ${hours}:${minute}`
}
  // get search engine

  function search (city) {
  let apiKey = "b61934cde5be0cecf7eae593bdfe5740";
    let unit = "metric"
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
    axios.get(url).then(showTemperature)
  }
function showTemperature(response){
  let currentTemp = document.querySelector("#current-temperature")
  celciusTemperature = Math.round(response.data.main.temp);
  currentTemp.innerHTML =celciusTemperature;
  let cityname = document.querySelector("#city");
  cityname.innerHTML = response.data.name;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let windspeed = document.querySelector("#windspeed");
  windspeed.innerHTML = Math.round(response.data.wind.speed);
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
  let time = document.querySelector("#time");
  time.innerHTML = formatDate(response.data.dt *1000);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
  `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
 iconElement.setAttribute("alt", response.data.weather[0].description)
}

  function handleForm (event) {
    event.preventDefault();
    let city = document.querySelector("#search-bar").value
    search(city)
  }

  let searchform = document.querySelector("#search-form")
  searchform.addEventListener("submit",handleForm)

 
 
///   changing the Metric
function displayFahrenheit (event) {
     event.preventDefault();
    let temp = document.querySelector("#current-temperature");
    let Fahrenheit = (celciusTemperature * 9) / 5 + 32;
    temp.innerHTML = Math.round(Fahrenheit);
    celciusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
  }
let fahrenheitLink = document.querySelector("#Fahrenheit")
fahrenheitLink.addEventListener("click",displayFahrenheit)

function displayCelcius (event) {
     event.preventDefault();
    let temp = document.querySelector("#current-temperature");
    temp.innerHTML =celciusTemperature;
    celciusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
  }
let celciusLink = document.querySelector("#Celcius")
celciusLink.addEventListener("click", displayCelcius)

let celciusTemperature = null

 search("Vienna")


  // getting the current Button 


  function showCurrent (position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "b61934cde5be0cecf7eae593bdfe5740";
    let unit = "metric"
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
    axios.get(url).then(showTemperature)
  }

  function currentPosisiton (){
  navigator.geolocation.getCurrentPosition(showCurrent)
}

let currentButton = document.querySelector("#current")
currentButton.addEventListener("click", currentPosisiton)