var currentCity = document.getElementById('currentCity');
var currentTemp = document.getElementById('currentTemp');
var windSpeed = document.getElementById('windSpeed');
var currentUVI = document.getElementById('uvi');
var currentHum = document.getElementById('humidity');
var cityInputEl = document.getElementById('city');
var userFormEl = document.getElementById('user-form')


function getCityCoord(name){
    var geoApiUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + name + '&limit=1&appid=1eec8ff5f151483ae61036bcfff1b27e'
    fetch(geoApiUrl)
    .then(function(response){
        if(response.ok){
            return response.json();
        } else {
            alert("Error: " + response.statusText);
        }
    })
    .then(function(data){
        var lat = data[0].lat;
        var lon = data[0].lon;
        getWeather(lat, lon);
    })
}

function getWeather(lat, lon){
    
    var apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&exclude=hourly&appid=1eec8ff5f151483ae61036bcfff1b27e';
    fetch(apiUrl)
    .then(function(response){
        // response.json();
        return response.json();

    })
    .then(function(data){
        console.log(data);
        setCurrentWeather(data);
    })
    .catch(function(error){        
        console.log("Unable to connect to OpenWeatherMap")
    });
}

// load the current weather information into 
function setCurrentWeather(data){
    var temp = data.current.temp;
        var wind = data.current.wind_speed;
        var uvi = data.current.uvi;
        var humidity = data.current.humidity;
        var icon = data.current.weather[0].main;

        console.log(icon);   
             
        currentTemp.textContent = 'Temp: ' + temp + '\xB0 F';            
        windSpeed.textContent = 'Wind: ' + wind + ' MPH';        
        currentUVI.textContent = 'UVI: ' + uvi;       
        currentHum.textContent = 'Humidity: ' + humidity + ' %';
}
var formSubmitHandler = function(event){
    event.preventDefault();
    
    var cityVal = cityInputEl.value.trim();
    // console.log(cityVal)
    
    if(cityVal){
        getCityCoord(cityVal);
        cityInputEl.value = "";
        currentCity.textContent = cityVal;
    } else {
        alert("Please enter a valid city name")
    }
}

// function iconSet(icon){
//     var currentCity = document.getElementById('currentCity');
//     if(icon === 'Clear'){
//         currentCity.addClass('bi bi-brightness-high')
//     }

// }

userFormEl.addEventListener("submit",formSubmitHandler);
// getWeather();