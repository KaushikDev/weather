var searchedLoc;
var apiByPlaceName;

var searchContainer = document.getElementById("searchContainer");
var searchContainerWidth = searchContainer.clientWidth;

var weatherContainer = document.getElementById("weatherContainer");
var weatherContainerHeight = weatherContainer.clientHeight;
var weatherContainerWidth = weatherContainer.clientWidth;


 $("document").ready(function(){
 
 //+++++++++++'Weather by searched location' section begins here. Workflow : Search for the required location using search box, find weather of the required location using the weather api+++++++++  
   $("#searchBtn").on("click", function(){

	
		searchedLoc = document.getElementById("searchBox").value;
		console.log(searchedLoc);
		
	
    
		apiByPlaceName="https://api.apixu.com/v1/forecast.json?key=c07a6d9c3d874f3cbd451147171606&q="+searchedLoc;
    
		$.getJSON(apiByPlaceName, function(data){
			document.getElementById("displayIcon").src = "https:"+data.current.condition.icon;
			document.getElementById("displayTime").innerHTML = 'Time : '+data.location.localtime;
			document.getElementById("displayCity").innerHTML = data.location.name;
			document.getElementById("displayCountry").innerHTML = data.location.country;
			document.getElementById("displayTemperature").innerHTML = data.current.temp_c+'&#8451;';
			document.getElementById("displayCurrent").innerHTML = data.current.condition.text;
			document.getElementById("displayHumidity").innerHTML = 'Humidity : '+data.current.humidity+"%";
			document.getElementById("displayWindSpeed").innerHTML = 'Wind Speed : '+data.current.wind_kph+" kph" ;
			document.getElementById("displayWindDirection").innerHTML = 'Wind Direction : '+data.current.wind_dir;
			// document.getElementById("displayForecast").innerHTML = 'Forecast : '+data.forecast.forecastday[0].day.condition.text;
			document.getElementById("displayForecast").innerHTML = '<strong>Forecast</strong> : '+data.forecast.forecastday[0].day.condition.text+'<img src="https:'+data.forecast.forecastday[0].day.condition.icon+'">';
			
			// console.log('Forecast : '+data.forecast.forecastday[0].day.condition.text+'<img src="https:'+data.forecast.forecastday[0].day.condition.icon+'">');
			setWeatherBackground(data.current.condition.text);
			setSearchContainerPosition();
			setWeatherContainerPosition();
		}).fail(function() { 
			alert("Oops, we couldn't find this place. Please try with a valid 'CITY' name. Thanks.");
			weatherContainer.style.visibility = "hidden";
		});
	 	 
   });

});


function setWeatherContainerPosition(){
	weatherContainer.style.visibility = "visible";
	
	

}

function setSearchContainerPosition(){
	searchContainer.style.top = 0;
	
}


function setWeatherBackground(weatherCondition){
	switch (weatherCondition) {
		case "Sunny":
			document.body.style.backgroundImage = 'url("images/sunny-min.jpg")';
			break;
		case "Clear":
			document.body.style.backgroundImage = 'url("images/clear-min.jpg")';
			break;
		case "Partly cloudy":
			document.body.style.backgroundImage = 'url("images/partlycloudy-min.jpg")';
			break;
		case "Cloudy":
			document.body.style.backgroundImage = 'url("images/cloudy-min.jpg")';
			break;
		case "Overcast":
			document.body.style.backgroundImage = 'url("images/overcast-min.jpg")';
			break;
		case "Mist":
			document.body.style.backgroundImage = 'url("images/fog-min.jpg")';
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
			document.body.style.backgroundImage = 'url("images/drizzle-min.jpg")';
			break;
		case "Moderate or heavy rain shower":	
		case "Heavy rain at times":
		case "Heavy rain":
		case "Torrential rain shower":
			document.body.style.backgroundImage = 'url("images/rain-min.jpg")';
			break;
		case "Patchy light snow":
		case "Light snow":
		case "Patchy moderate snow":
		case "Moderate snow":
		case "Light snow showers":
			document.body.style.backgroundImage = 'url("images/snow-min.jpg")';
			break;
		case "Patchy heavy snow":
		case "Heavy snow":
			document.body.style.backgroundImage = 'url("images/heavysnow-min.jpg")';
			break;
		case "Ice pellets":
		case "Light showers of ice pellets":
		case "Moderate or heavy showers of ice pellets":
			document.body.style.backgroundImage = 'url("images/hail-min.jpg")';
			break;
		case "Patchy light rain with thunder":
		case "Moderate or heavy rain with thunder":
		case "Patchy light snow with thunder":
		case "Moderate or heavy snow with thunder":
			document.body.style.backgroundImage = 'url("images/thunderstorm-min.jpg")';
			break;
		case "Fog":
		case "Freezing fog":
			document.body.style.backgroundImage = 'url("images/fog-min.jpg")';
			break;

		default:
			document.body.style.backgroundImage = 'url("images/default.jpg")';
			break;
	}
}
   