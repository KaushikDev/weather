var searchedLoc;
var apiByPlaceName;

var searchContainer = document.getElementById("searchContainer");
var searchContainerWidth = searchContainer.clientWidth;

var weatherContainer = document.getElementById("weatherContainer");
var weatherContainerHeight = weatherContainer.clientHeight;
var weatherContainerWidth = weatherContainer.clientWidth;


var displayIcon = document.getElementById("displayIcon");
var displayTime = document.getElementById("displayTime");
var displayCity = document.getElementById("displayCity");
var displayCountry = document.getElementById("displayCountry");
var displayTemperature = document.getElementById("displayTemperature");
var displayCurrent = document.getElementById("displayCurrent");
var displayHumidity = document.getElementById("displayHumidity");
var displayWindSpeed = document.getElementById("displayWindSpeed");
var displayWindDirection = document.getElementById("displayWindDirection");
var displayForecastDay0 = document.getElementById("displayForecastDay0");
var displayForecastDay1 = document.getElementById("displayForecastDay1");
var displayForecastDay2 = document.getElementById("displayForecastDay2");
var displayForecastDay3 = document.getElementById("displayForecastDay3");

var day1 = document.getElementById("day1");


 $("document").ready(function(){
	
	

//+++++++++++'Weather by searched location' section begins here. Workflow : Search for the required location using search box, find weather of the required location using the weather api+++++++++  
   $("#searchBtn").on("click", function(){

		searchedLoc = document.getElementById("searchBox").value;
		apiByPlaceName="https://api.apixu.com/v1/forecast.json?key=c07a6d9c3d874f3cbd451147171606&q="+searchedLoc+"&days=4";
    
		$.getJSON(apiByPlaceName, function(data){
			displayIcon.src = "https:"+data.current.condition.icon;
			displayTime.innerHTML = 'Time : '+data.location.localtime;
			displayCity.innerHTML = data.location.name;
			displayCountry.innerHTML = data.location.country;
			displayTemperature.innerHTML = data.current.temp_c+'&#8451;';
			displayCurrent.innerHTML = data.current.condition.text;
			displayHumidity.innerHTML = 'Humidity : '+data.current.humidity+"%";
			displayWindSpeed.innerHTML = 'Wind Speed : '+data.current.wind_kph+" kph" ;
			displayWindDirection.innerHTML = 'Wind Direction : '+data.current.wind_dir;
			displayForecastDay0.innerHTML = '<strong>Today\'s Forecast</strong> : '+data.forecast.forecastday[0].day.condition.text+'<img src="https:'+data.forecast.forecastday[0].day.condition.icon+'">';
			

			
			displayForecastDay1.innerHTML = '<div>'+data.forecast.forecastday[1].date+'</div><img src="https:'+data.forecast.forecastday[1].day.condition.icon+'"><div class="row"><div class="col-xs-4" style="color:aqua">'+Math.floor(data.forecast.forecastday[1].day.mintemp_c)+'&#8451;'+'</div><div class="col-xs-4"  style="font-size:13px">'+Math.floor(data.forecast.forecastday[1].day.avgtemp_c)+'&#8451;'+'</div><div class="col-xs-4" style="color:red">'+Math.floor(data.forecast.forecastday[1].day.maxtemp_c)+'&#8451;'+'</div></div>';



			displayForecastDay2.innerHTML = '<div>'+data.forecast.forecastday[2].date+'</div><img src="https:'+data.forecast.forecastday[2].day.condition.icon+'"><div class="row"><div class="col-xs-4" style="color:aqua">'+Math.floor(data.forecast.forecastday[2].day.mintemp_c)+'&#8451;'+'</div><div class="col-xs-4"  style="font-size:13px">'+Math.floor(data.forecast.forecastday[2].day.avgtemp_c)+'&#8451;'+'</div><div class="col-xs-4" style="color:red">'+Math.floor(data.forecast.forecastday[2].day.maxtemp_c)+'&#8451;'+'</div></div>';
			
			
			
			
			
			setWeatherBackground(data.current.condition.text);
			setSearchContainerPosition();
			setWeatherContainerPosition();
		}).fail(function() { 
			alert("Please check your data or wifi is on and connected.");
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
   