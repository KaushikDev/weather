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
var displayForecastDay0ImageIcon = document.getElementById("displayForecastDay0ImageIcon");
var displayForecastDay1 = document.getElementById("displayForecastDay1");
var displayForecastDay2 = document.getElementById("displayForecastDay2");
var displayForecastDay3 = document.getElementById("displayForecastDay3");

var day1 = document.getElementById("day1");


if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(onPermissionGranted, onPermissionDenied);
   } else {
	alert('Geolocation not enabled in your browser.');
   }

function onPermissionGranted(position){
	var lat = position.coords.latitude;
	var lon = position.coords.longitude;
	console.log(lat, lon);

	apiByPlaceName="https://crossorigin.me/https://api.apixu.com/v1/forecast.json?key=c07a6d9c3d874f3cbd451147171606&q="+lat+","+lon+"&days=5";
    
	$.getJSON(apiByPlaceName, function(data){
		displayIcon.src = "https:"+data.current.condition.icon;
		displayTime.innerHTML = '<strong>Time</strong> : '+data.location.localtime;
		displayCity.innerHTML = data.location.name;
		displayCountry.innerHTML = data.location.country;
		displayTemperature.innerHTML = data.current.temp_c+'&#8451;';
		displayCurrent.innerHTML = "Current : "+data.current.condition.text;
		displayHumidity.innerHTML = '<strong>Humidity</strong> : '+data.current.humidity+"%";
		displayWindSpeed.innerHTML = '<strong>Wind Speed</strong> : '+data.current.wind_kph+" kph" ;
		displayWindDirection.innerHTML = '<strong>Wind Direction : '+data.current.wind_dir;
		
		displayForecastDay0.innerHTML = '<strong>Forecast</strong> : '+data.forecast.forecastday[0].day.condition.text;

		displayForecastDay0ImageIcon.src = "https:"+data.forecast.forecastday[0].day.condition.icon;


		displayForecastDay1.innerHTML = '<label>'+data.forecast.forecastday[1].date+'</label><img src="https:'+data.forecast.forecastday[1].day.condition.icon+'"><span class="average">'+Math.floor(data.forecast.forecastday[1].day.avgtemp_c)+'&#8451;'+'</span><div class="insideMiniCard"><span class="low">'+Math.floor(data.forecast.forecastday[1].day.mintemp_c)+'&#8451;'+'</span><span class="high">'+Math.floor(data.forecast.forecastday[1].day.maxtemp_c)+'&#8451;'+'</span></div>';

		displayForecastDay2.innerHTML = '<label>'+data.forecast.forecastday[2].date+'</label><img src="https:'+data.forecast.forecastday[2].day.condition.icon+'"><span class="average">'+Math.floor(data.forecast.forecastday[2].day.avgtemp_c)+'&#8451;'+'</span><div class="insideMiniCard"><span class="low">'+Math.floor(data.forecast.forecastday[2].day.mintemp_c)+'&#8451;'+'</span><span class="high">'+Math.floor(data.forecast.forecastday[2].day.maxtemp_c)+'&#8451;'+'</span></div>';


		displayForecastDay3.innerHTML = '<label>'+data.forecast.forecastday[3].date+'</label><img src="https:'+data.forecast.forecastday[3].day.condition.icon+'"><span class="average">'+Math.floor(data.forecast.forecastday[3].day.avgtemp_c)+'&#8451;'+'</span><div class="insideMiniCard"><span class="low">'+Math.floor(data.forecast.forecastday[3].day.mintemp_c)+'&#8451;'+'</span><span class="high">'+Math.floor(data.forecast.forecastday[3].day.maxtemp_c)+'&#8451;'+'</span></div>';


		displayForecastDay4.innerHTML = '<label>'+data.forecast.forecastday[4].date+'</label><img src="https:'+data.forecast.forecastday[4].day.condition.icon+'"><span class="average">'+Math.floor(data.forecast.forecastday[4].day.avgtemp_c)+'&#8451;'+'</span><div class="insideMiniCard"><span class="low">'+Math.floor(data.forecast.forecastday[4].day.mintemp_c)+'&#8451;'+'</span><span class="high">'+Math.floor(data.forecast.forecastday[4].day.maxtemp_c)+'&#8451;'+'</span></div>';

		
		
		
		setWeatherBackground(data.current.condition.text);
		setSearchContainerPosition();
		setWeatherContainerPosition();
	}).fail(function() { 
		alert("Sorry, we couldn't forecast your weather right now. Please, check back after some time.");
		weatherContainer.style.visibility = "hidden";
	});

}

function onPermissionDenied(){
	alert("Sorry, we won't be able to show your curent location's weather without location. You can use search feature to search for a location. Thank you.");
	weatherContainer.style.visibility = "hidden";
}

$("document").ready(function(){
//+++++++++++'Weather by searched location' section begins here. Workflow : Search for the required location using search box, find weather of the required location using the weather api+++++++++  
   $("#searchBtn").on("click", function(){

		searchedLoc = document.getElementById("searchBox").value;
		apiByPlaceName="https://crossorigin.me/https://api.apixu.com/v1/forecast.json?key=c07a6d9c3d874f3cbd451147171606&q="+searchedLoc+"&days=5";
    
		$.getJSON(apiByPlaceName, function(data){
			displayIcon.src = "https:"+data.current.condition.icon;
			displayTime.innerHTML = '<strong>Time</strong> : '+data.location.localtime;
			displayCity.innerHTML = data.location.name;
			displayCountry.innerHTML = data.location.country;
			displayTemperature.innerHTML = data.current.temp_c+'&#8451;';
			displayCurrent.innerHTML = "Current : "+data.current.condition.text;
			displayHumidity.innerHTML = '<strong>Humidity</strong> : '+data.current.humidity+"%";
			displayWindSpeed.innerHTML = '<strong>Wind Speed</strong> : '+data.current.wind_kph+" kph" ;
			displayWindDirection.innerHTML = '<strong>Wind Direction : '+data.current.wind_dir;
			
			displayForecastDay0.innerHTML = '<strong>Forecast</strong> : '+data.forecast.forecastday[0].day.condition.text;

			displayForecastDay0ImageIcon.src = "https:"+data.forecast.forecastday[0].day.condition.icon;


			displayForecastDay1.innerHTML = '<label>'+data.forecast.forecastday[1].date+'</label><img src="https:'+data.forecast.forecastday[1].day.condition.icon+'"><div class="insideMiniCard"><span class="low">'+Math.floor(data.forecast.forecastday[1].day.mintemp_c)+'&#8451;'+'</span><span class="average">'+Math.floor(data.forecast.forecastday[1].day.avgtemp_c)+'&#8451;'+'</span><span class="high">'+Math.floor(data.forecast.forecastday[1].day.maxtemp_c)+'&#8451;'+'</span></div>';

			displayForecastDay2.innerHTML = '<label>'+data.forecast.forecastday[2].date+'</label><img src="https:'+data.forecast.forecastday[2].day.condition.icon+'"><div class="insideMiniCard"><span class="low">'+Math.floor(data.forecast.forecastday[2].day.mintemp_c)+'&#8451;'+'</span><span class="average">'+Math.floor(data.forecast.forecastday[2].day.avgtemp_c)+'&#8451;'+'</span><span class="high">'+Math.floor(data.forecast.forecastday[2].day.maxtemp_c)+'&#8451;'+'</span></div>';


			displayForecastDay3.innerHTML = '<label>'+data.forecast.forecastday[3].date+'</label><img src="https:'+data.forecast.forecastday[3].day.condition.icon+'"><div class="insideMiniCard"><span class="low">'+Math.floor(data.forecast.forecastday[3].day.mintemp_c)+'&#8451;'+'</span><span class="average">'+Math.floor(data.forecast.forecastday[3].day.avgtemp_c)+'&#8451;'+'</span><span class="high">'+Math.floor(data.forecast.forecastday[3].day.maxtemp_c)+'&#8451;'+'</span></div>';


			displayForecastDay4.innerHTML = '<label>'+data.forecast.forecastday[4].date+'</label><img src="https:'+data.forecast.forecastday[4].day.condition.icon+'"><div class="insideMiniCard"><span class="low">'+Math.floor(data.forecast.forecastday[4].day.mintemp_c)+'&#8451;'+'</span><span class="average">'+Math.floor(data.forecast.forecastday[4].day.avgtemp_c)+'&#8451;'+'</span><span class="high">'+Math.floor(data.forecast.forecastday[4].day.maxtemp_c)+'&#8451;'+'</span></div>';

			
			
			
			setWeatherBackground(data.current.condition.text);
			setSearchContainerPosition();
			setWeatherContainerPosition();
		}).fail(function() { 
			alert("Sorry, we didn't find that place. Check the spelling or use correct 'City' name. Also, please check your data or wifi is on and connected.");
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
			document.body.style.background = '#FC814A';
			break;
		case "Clear":
			document.body.style.background = '#AFE5EC';
			break;
		case "Partly cloudy":
			document.body.style.background = '#78B5BC';
			break;
		case "Cloudy":
			document.body.style.background = '5D8C92';
			break;
		case "Overcast":
			document.body.style.background = '#E7E7E7';
			break;
		case "Mist":
			document.body.style.background = '#E7E7E7';
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
			document.body.style.background = '#9B97B2';
			break;
		case "Moderate or heavy rain shower":	
		case "Heavy rain at times":
		case "Heavy rain":
		case "Torrential rain shower":
			document.body.style.background = '#716E82';
			break;
		case "Patchy light snow":
		case "Light snow":
		case "Patchy moderate snow":
		case "Moderate snow":
		case "Light snow showers":
			document.body.style.background = '#E8E4E8';
			break;
		case "Patchy heavy snow":
		case "Heavy snow":
			document.body.style.background = '#D1CDD1';
			break;
		case "Ice pellets":
		case "Light showers of ice pellets":
		case "Moderate or heavy showers of ice pellets":
			document.body.style.background = '#BAB6BA';
			break;
		case "Patchy light rain with thunder":
		case "Moderate or heavy rain with thunder":
		case "Patchy light snow with thunder":
		case "Moderate or heavy snow with thunder":
			document.body.style.background = '#FFFAFF';
			break;
		case "Fog":
		case "Freezing fog":
			document.body.style.background = '#FFFCFF';
			break;

		default:
			document.body.style.background = '#FFFDFF';
			break;
	}
}
   
