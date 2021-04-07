  //get Time
  let now = new Date ()
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
  let minute = now.getMinutes();
  let year =now.getFullYear();
  let time = document.querySelector("#time")
  let day = now.getDate()
  time.innerHTML = `${weekday}, ${month} ${day} ${year} - ${hour}:${minute}`

  // get search engine

  function search (city) {
  let apiKey = "b61934cde5be0cecf7eae593bdfe5740";
    let unit = "metric"
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
    axios.get(url).then(showTemperature)
  }
function showTemperature(response){
  let temp= Math.round(response.data.main.temp)
  let currentTemp = document.querySelector("#current-temperature")
  currentTemp.innerHTML = temp
   let result = document.querySelector("#city");
  result.innerHTML = response.data.name
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