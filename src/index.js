  //get Time
  function formatDate (timestamp){
    let now = new Date (timestamp)
  let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday"]
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
  ]
  let weekday = days[now.getDay()];
  let month = months[now.getMonth()];
  let hour = now.getHours();
   if (hour < 10 ){
    let hour = `0${hour}`
  }
  let minute = now.getMinutes();
  if (minute < 10 ){
    let minute = `0${minute}`
  }
  let year =now.getFullYear();
  let time = document.querySelector("#time")
  let day = now.getDate()
  return  `${weekday}, ${month} ${day} ${year} - ${hour}:${minute}`
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
  currentTemp.innerHTML =Math.round(response.data.main.temp)
  let cityname = document.querySelector("#city");
  cityname.innerHTML = response.data.name
  let humidity = document.querySelector("#humidity")
  humidity.innerHTML = response.data.main.humidity
  let windspeed = document.querySelector("#windspeed")
  windspeed.innerHTML = Math.round(response.data.wind.speed)
  let description = document.querySelector("#description")
  description.innerHTML = response.data.weather[0].description
  let time = document.querySelector("#time")
  time.innerHTML = formatDate(response.data.dt *1000)
}

  function handleForm (event) {
    event.preventDefault();
    let city = document.querySelector("#search-bar").value
    search(city)
  }

  let searchform = document.querySelector("#search-form")
  searchform.addEventListener("submit",handleForm)

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
 
  /*/ Changing the Metric
  function showCelcius (event) {
     event.preventDefault();
    let temp = document.querySelector("#current-temperature");
    temp.innerHTML = 17;
  }
let Celcius = document.querySelector("#Celcius")
Celcius.addEventListener("click", showCelcius)

function showFahrenheit (event) {
     event.preventDefault();
    let temp = document.querySelector("#current-temperature");
    temp.innerHTML = 66;
  }
let Fahrenheit = document.querySelector("#Fahrenheit")
Fahrenheit.addEventListener("click",showFahrenheit)*/