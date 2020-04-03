let searchedLoc;
let url;
let isItDay;

const mainContainer = document.querySelector(".container");
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
    "https://cors-anywhere.herokuapp.com/http://api.weatherstack.com/current?access_key=d00133fdf468944e924aa19bda5390e5&query=" +
    lat +
    "," +
    lon;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      setData(data);
    })
    .catch((error) => {
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

const searchWeather = () => {
  searchedLoc = document.querySelector("#searchBox").value;
  url =
    "https://cors-anywhere.herokuapp.com/http://api.weatherstack.com/current?access_key=d00133fdf468944e924aa19bda5390e5&query=" +
    searchedLoc;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      setData(data);
    })
    .catch((error) => {
      alert(
        "Sorry, we didn't find that place. Check the spelling or use correct 'City' name. Also, please check your data or wifi is on and connected."
      );
      setWeatherContainerPosition("hidden");
    });
};

const setWeatherContainerPosition = (value) => {
  weatherCard.style.visibility = value;
};

const setData = (data) => {
  isItDay = data.current.is_day.toLowerCase();
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

  setWeatherBackground(data.current.weather_descriptions[0], isItDay);
  setWeatherContainerPosition("visible");
};

const setWeatherBackground = (weatherCondition, isDay) => {
  mainContainer.className = "container";
  switch (weatherCondition) {
    case "Sunny":
      if (isDay === "yes") {
        mainContainer.classList.add("clear__day");
      } else {
        mainContainer.classList.add("clear__night");
      }

      break;
    case "Clear":
      if (isDay === "yes") {
        mainContainer.classList.add("clear__day");
      } else {
        mainContainer.classList.add("clear__night");
      }

      break;
    case "Partly cloudy":
      if (isDay === "yes") {
        mainContainer.classList.add("partly-cloudy__day");
      } else {
        mainContainer.classList.add("partly-cloudy__night");
      }

      break;
    case "Cloudy":
      if (isDay === "yes") {
        mainContainer.classList.add("cloudy__day");
      } else {
        mainContainer.classList.add("cloudy__night");
      }

      break;
    case "Overcast":
      if (isDay === "yes") {
        mainContainer.classList.add("haze__day");
      } else {
        mainContainer.classList.add("haze__night");
      }

      break;
    case "Mist":
      if (isDay === "yes") {
        mainContainer.classList.add("misty__day");
      } else {
        mainContainer.classList.add("misty__night");
      }

      break;
    case "Haze":
      if (isDay === "yes") {
        mainContainer.classList.add("haze__day");
      } else {
        mainContainer.classList.add("haze__night");
      }

      break;
    case "Patchy rain possible":
    case "Patchy freezing drizzle possible":
    case "Patchy light drizzle":
    case "Light drizzle":
    case "Freezing drizzle":
    case "Heavy freezing drizzle":
    case "Patchy light rain":
    case "Light rain":
    case "Light Rain":
    case "Moderate rain at times":
    case "Moderate rain":
    case "Patchy light rain with thunder":
    case "Moderate or heavy rain with thunder":
      if (isDay === "yes") {
        mainContainer.classList.add("light-rain__day");
      } else {
        mainContainer.classList.add("light-rain__night");
      }

      break;
    case "Moderate or heavy rain shower":
    case "Heavy rain at times":
    case "Heavy rain":
    case "Torrential rain shower":
      if (isDay === "yes") {
        mainContainer.classList.add("heavy-rain__day");
      } else {
        mainContainer.classList.add("heavy-rain__night");
      }

      break;
    case "Patchy light snow":
    case "Light snow":
    case "Patchy moderate snow":
    case "Moderate snow":
    case "Light snow showers":
      if (isDay === "yes") {
        mainContainer.classList.add("light-snow__day");
      } else {
        mainContainer.classList.add("light-snow__night");
      }

      break;
    case "Patchy heavy snow":
    case "Heavy snow":
      if (isDay === "yes") {
        mainContainer.classList.add("heavy-snow__day");
      } else {
        mainContainer.classList.add("heavy-snow__night");
      }

      break;
    case "Ice pellets":
    case "Light showers of ice pellets":
    case "Moderate or heavy showers of ice pellets":
      if (isDay === "yes") {
        mainContainer.classList.add("heavy-snow__day");
      } else {
        mainContainer.classList.add("heavy-snow__night");
      }

      break;
    case "Patchy light rain with thunder":
    case "Moderate or heavy rain with thunder":
    case "Patchy light snow with thunder":
    case "Moderate or heavy snow with thunder":
      if (isDay === "yes") {
        mainContainer.classList.add("light-rain__day");
      } else {
        mainContainer.classList.add("light-rain__night");
      }

      break;
    case "Fog":
    case "Freezing fog":
      if (isDay === "yes") {
        mainContainer.classList.add("foggy__day");
      } else {
        mainContainer.classList.add("foggy__night");
      }

      break;

    default:
      if (isDay === "yes") {
        mainContainer.classList.add("clear__day");
      } else {
        mainContainer.classList.add("clear__night");
      }

      break;
  }
};
