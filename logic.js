let searchedLoc;
let url;

const mainContainer = document.querySelector(".container-fluid");
const weatherCard = document.querySelector("#weather-card");

const displayIcon = document.querySelector("#displayIcon");
const displayTime = document.querySelector("#displayTime");
const displayCity = document.querySelector("#displayCity");
const displayCountry = document.querySelector("#displayCountry");
const displayTemperature = document.querySelector("#displayTemperature");
const displayCurrent = document.querySelector("#displayCurrent");
const displayHumidity = document.querySelector("#displayHumidity");
const displayWindSpeed = document.querySelector("#displayWindSpeed");
const displayWindDirection = document.querySelector("#displayWindDirection");

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    onPermissionGranted,
    onPermissionDenied
  );
} else {
  alert("Geolocation is not enabled in your browser!!");
}

function onPermissionGranted(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  
  url =
    "http://api.weatherstack.com/current?access_key=d00133fdf468944e924aa19bda5390e5&query=" +
    lat +
    "," +
    lon;

  fetch(url)
    .then(response => response.json())
    .then(data => {
       setData(data);
    })
    .catch(error => {
      alert(
        "Sorry, we couldn't forecast your weather right now. Please, check back after some time."
      );
      setWeatherContainerPosition("hidden");
    });

}

function onPermissionDenied() {
  alert(
    "Sorry, we won't be able to show your curent location's weather without location permission. You can use 'Search' feature instead. Thank you."
  );
  setWeatherContainerPosition("hidden");
}



const searchWeather = () =>{
		searchedLoc = document.querySelector("#searchBox").value;
		url =
		  "http://api.weatherstack.com/current?access_key=d00133fdf468944e924aa19bda5390e5&query=" +
		  searchedLoc;
	
		  fetch(url)
		  .then(response => response.json())
		  .then(data => {
		
			setData(data);
		  })
		  .catch(error => {
			alert(
			  "Sorry, we didn't find that place. Check the spelling or use correct 'City' name. Also, please check your data or wifi is on and connected."+error
			);
			setWeatherContainerPosition("hidden");
		  });
}
  

const setWeatherContainerPosition = (value) => {
  weatherCard.style.visibility = value;
}

const setData =  (data) => {
  displayIcon.src = data.current.weather_icons[0];
  displayTime.innerHTML = "<strong>Time</strong> : " + data.location.localtime;
  displayCity.innerHTML = data.location.name;
  displayCountry.innerHTML = data.location.country;
  displayTemperature.innerHTML = data.current.temperature + "&#8451;";
  displayCurrent.innerHTML = data.current.weather_descriptions[0];
  displayHumidity.innerHTML =
    "<strong>Humidity</strong> : " + data.current.humidity + "%";
  displayWindSpeed.innerHTML =
    "<strong>Wind Speed</strong> : " + data.current.wind_speed + " kph";
  displayWindDirection.innerHTML =
    "<strong>Wind Direction : " + data.current.wind_dir;

  setWeatherBackground(data.current.weather_descriptions[0]);
  setWeatherContainerPosition("visible");
}


const setWeatherBackground = (weatherCondition) => {
  switch (weatherCondition) {
    case "Sunny":
      mainContainer.style.background = "#FF9100";
      break;
    case "Clear":
      mainContainer.style.background = "#90CAF9";
      break;
    case "Partly cloudy":
      mainContainer.style.background = "#FFFF00";
      break;
    case "Cloudy":
      mainContainer.style.background = "#FFF9C4";
      break;
    case "Overcast":
      mainContainer.style.background = "#FFFDE7";
      break;
    case "Mist":
      mainContainer.style.background = "#69F0AE";
      break;
    case "Patchy rain possible":
    case "Patchy freezing drizzle possible":
    case "Patchy light drizzle":
    case "Light drizzle":
    case "Freezing drizzle":
    case "Heavy freezing drizzle":
    case "Patchy light rain":
    case "Light rain":
    case "Moderate rain at times":
    case "Moderate rain":
    case "Patchy light rain with thunder":
    case "Moderate or heavy rain with thunder":
      mainContainer.style.background = "#B0BEC5";
      break;
    case "Moderate or heavy rain shower":
    case "Heavy rain at times":
    case "Heavy rain":
    case "Torrential rain shower":
      mainContainer.style.background = "#546E7A";
      break;
    case "Patchy light snow":
    case "Light snow":
    case "Patchy moderate snow":
    case "Moderate snow":
    case "Light snow showers":
      mainContainer.style.background = "#9E9E9E";
      break;
    case "Patchy heavy snow":
    case "Heavy snow":
      mainContainer.style.background = "#BDBDBD";
      break;
    case "Ice pellets":
    case "Light showers of ice pellets":
    case "Moderate or heavy showers of ice pellets":
      mainContainer.style.background = "#E0E0E0";
      break;
    case "Patchy light rain with thunder":
    case "Moderate or heavy rain with thunder":
    case "Patchy light snow with thunder":
    case "Moderate or heavy snow with thunder":
      mainContainer.style.background = "#EEEEEE";
      break;
    case "Fog":
    case "Freezing fog":
      mainContainer.style.background = "#CFD8DC";
      break;

    default:
      mainContainer.style.background = "#00E676";
      break;
  }
}
