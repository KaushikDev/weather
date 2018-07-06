var longi;
var lati;
var x = document.getElementById("position");
var searchedLoc;
var longitude;
var latitude;

 $("document").ready(function(){
 
 //+++++++++++'Weather by coordinates' section begins here. Workflow : Search for coordinates using a suitable api, convert coordinates into location using reverse geocode api, find weather of the required location using the weather api+++++++++    
   $("#useCurrent").on("click", function(){
	x.innerHTML="";
	var geoAPI="http://ip-api.com/json";
	document.getElementById("clearBtn").disabled= false;
	cleanSlate();
		
			$.getJSON(geoAPI, function(data){
			longitude = data.lon;
			longi = longitude.toFixed(6);
			latitude = data.lat;
			lati = latitude.toFixed(6);
			x.innerHTML = "Location identified as : "+lati+" , "+longi;
			var geoCodeAPI = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+lati+","+longi+"&key=AIzaSyCw2PTn1URdm2BPGU5daVOHDpav8KcqOOs" ;
					$.getJSON(geoCodeAPI, function(geoData){
						var placeName = geoData.results[0].address_components[4].long_name;
						var apiByLatLong = "https://api.apixu.com/v1/forecast.json?key=c07a6d9c3d874f3cbd451147171606&q="+placeName;
						
								$.getJSON(apiByLatLong, function(data){
									document.getElementById("displayIcon").src = "https:"+data.current.condition.icon;
									document.getElementById("displayTime").innerHTML = 'Current Time   : '+data.location.localtime;
									document.getElementById("displayCity").innerHTML = 'City           : '+data.location.name;
									document.getElementById("displayCountry").innerHTML = 'Country        : '+data.location.country;
									document.getElementById("displayTemperature").innerHTML = 'Temperature    : '+data.current.temp_c+'C / '+	data.current.temp_f+'F';
									document.getElementById("displayCurrent").innerHTML = 'Current        : '+data.current.condition.text;
									document.getElementById("displayForecast").innerHTML = 'Forecast       : '+data.forecast.forecastday[0].day.condition.text;
									document.getElementById("displayHumidity").innerHTML = 'Humidity       : '+data.current.humidity+"%";
									document.getElementById("displayWindSpeed").innerHTML = 'Wind Speed     : '+data.current.wind_mph+" mph / "+data.current.wind_kph+" kph" ;
									document.getElementById("displayWindDirection").innerHTML = 'Wind Direction : '+data.current.wind_dir;
								});
					});
   
    
			}).fail(function() { 
				x.innerHTML = "Sorry, we are unable to track your current location right now. Please use 'Search a Location' feature.";
				
			});
		
  
   
   
   });
//+++++++++++'Weather by coordinates' section ends here...
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++'Weather by searched location' section begins here. Workflow : Search for the required location using search box, find weather of the required location using the weather api+++++++++  
   $("#searchBtn").on("click", function(){
		x.innerHTML="";
		cleanSlate();
		document.getElementById("clearBtn").disabled= false;
		//document.getElementById("showWeather").disabled= false;
		searchedLoc = document.getElementById("searchBox").value;
		console.log(searchedLoc);
    
		var apiByPlaceName="https://api.apixu.com/v1/forecast.json?key=c07a6d9c3d874f3cbd451147171606&q="+searchedLoc;
    
		$.getJSON(apiByPlaceName, function(data){
			document.getElementById("displayIcon").src = "http:"+data.current.condition.icon;
			document.getElementById("displayTime").innerHTML = 'Current Time   : '+data.location.localtime;
			document.getElementById("displayCity").innerHTML = 'City           : '+data.location.name;
			document.getElementById("displayCountry").innerHTML = 'Country        : '+data.location.country;
			document.getElementById("displayTemperature").innerHTML = 'Temperature    : '+data.current.temp_c+'C / '+data.current.temp_f+'F';
			document.getElementById("displayCurrent").innerHTML = 'Current        : '+data.current.condition.text;
			document.getElementById("displayForecast").innerHTML = 'Forecast       : '+data.forecast.forecastday[0].day.condition.text;
			document.getElementById("displayHumidity").innerHTML = 'Humidity       : '+data.current.humidity+"%";
			document.getElementById("displayWindSpeed").innerHTML = 'Wind Speed     : '+data.current.wind_mph+" mph / "+data.current.wind_kph+" kph" ;
			document.getElementById("displayWindDirection").innerHTML = 'Wind Direction : '+data.current.wind_dir;
			
		
		}).fail(function() { 
			x.innerHTML = "Oops, we couldn't find this place. Please try with a valid 'CITY' name. Thanks.";
		
		});
	 	 
   });
   
 });
   

  
function init(){
document.getElementById("searchManual").style.visibility="hidden";
document.getElementById("clearBtn").disabled= true;
}

function showHide(){
if(document.getElementById("useManual").innerHTML==='<i class="fa fa-globe" aria-hidden="true"></i> Search a Location'){
clean();
document.getElementById("useManual").innerHTML='<i class="fa fa-globe" aria-hidden="true"></i> Close Manual Search';
document.getElementById("searchManual").style.visibility="visible";
}
else if(document.getElementById("useManual").innerHTML==='<i class="fa fa-globe" aria-hidden="true"></i> Close Manual Search'){
document.getElementById("useManual").innerHTML='<i class="fa fa-globe" aria-hidden="true"></i> Search a Location';
clean();
document.getElementById("searchManual").style.visibility="hidden";
}
}

function clean(){
document.getElementById("clearBtn").disabled= true;
//document.getElementById("showWeather").disabled= true;
document.getElementById("searchBox").value="";
document.getElementById("position").innerHTML="";
cleanSlate();
lati='';
longi='';
}

function cleanSlate(){
document.getElementById("displayIcon").src="spot_weather.jpg";
document.getElementById("displayTime").innerHTML ="";
document.getElementById("displayCity").innerHTML="";
document.getElementById("displayCountry").innerHTML="";
document.getElementById("displayTemperature").innerHTML="";
document.getElementById("displayCurrent").innerHTML="";
document.getElementById("displayForecast").innerHTML="";
document.getElementById("displayHumidity").innerHTML="";
document.getElementById("displayWindSpeed").innerHTML="";
document.getElementById("displayWindDirection").innerHTML="";
}
