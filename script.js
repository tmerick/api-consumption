// 1576fd927f90cc36e9f592833b4f7dc6

// https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=1576fd927f90cc36e9f592833b4f7dc6

const searchInput = document.querySelector('.city-input');
const searchBtn = document.querySelector('.search button');
const imgIcon = document.querySelector('.tempo-icon');
const climaDisplay = document.querySelector('.tempo')
const errorDisplay = document.querySelector(".error");

const apiKey = "1576fd927f90cc36e9f592833b4f7dc6"
const  apiUrl= "https://api.openweathermap.org/data/2.5/weather?&units=metric&q="

climaDisplay.style.display = "none";

async function checkTemp(city) {
  errorDisplay.style.display = "none";

  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if(response.status == 404){
      errorDisplay.style.display = "block";
      climaDisplay.style.display = "none";
      return;
  }

  let data = await response.json();

  console.log(data)

  document.querySelector(".city").innerText = data.name
  document.querySelector(".temp").innerText = Math.round(data.main.temp) + "ºc"
  document.querySelector(".umidade").innerText = data.main.humidity + "%"
  document.querySelector(".wind").innerText = data.wind.speed + "Km/h"

  const condicaoClima = data.weather[0].main;

    if (condicaoClima == "Clear") {
      imgIcon.src = "img/clear.png";
  }
  else if (condicaoClima == "Clouds"){
      imgIcon.src = "img/clouds.png";
  }
  else if (condicaoClima == "Rain"){
      imgIcon.src = "img/rain.png";
  }
  else if (condicaoClima == "Drizzle"){
      imgIcon.src = "img/drizzle.png";
  }
  else if (condicaoClima == "Mist" || condicaoClima == "Fog"){
      imgIcon.src = "img/mist.png";
  }
  else if (condicaoClima == "Snow"){
      imgIcon.src = "img/snow.png";
  }
  else {
      imgIcon.src = "img/clouds.png";
  }

climaDisplay.style.display = "block";
errorDisplay.style.display = "none";

}

searchBtn.addEventListener('click' , () => {
  checkTemp(searchInput.value)
});

searchInput.addEventListener('keyup', (event) => {
  if (event.key == "Enter" && searchInput.value){
    checkTemp(searchInput.value);
  }
})
