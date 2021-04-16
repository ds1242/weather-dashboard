var currentCity = document.getElementById('currentCity');
var currentTemp = document.getElementById('currentTemp');
var windSpeed = document.getElementById('windSpeed');
var currentUVI = document.getElementById('uvi');
var currentHum = document.getElementById('humidity');
var cityInputEl = document.getElementById('city');
var userFormEl = document.getElementById('user-form')
var key = '1eec8ff5f151483ae61036bcfff1b27e'

// use openweather api to get city geo coords
function getCityCoord(name){
    var geoApiUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + name + '&limit=1&appid=' + key;
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
        var cityVal = data[0].name;
        getWeather(cityVal, lat, lon);
    })
}

function getWeather(cityName, lat, lon){
    
    var apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&exclude=hourly&appid=' + key;
    fetch(apiUrl)
    .then(function(response){
        // response.json();
        return response.json();

    })
    .then(function(data){
        console.log(data);
        setCurrentWeather(cityName, data);
        
    })
    .catch(function(error){        
        console.log("Unable to connect to OpenWeatherMap")
    });
}

// load the current weather information into 
function setCurrentWeather(cityName, data){
    // get current weather information
    var temp = data.current.temp;
    var wind = data.current.wind_speed;
    var uvi = data.current.uvi;
    var humidity = data.current.humidity;
    var icon = data.current.weather[0].icon;
    var date = data.current.dt;

    // display current weather information
    var newDate = moment.unix(date).format('L');
    // add city name with date and then append current weather icon 
    currentCity.textContent = cityName + " (" + newDate + ")";  
    $('#currentCity').append('<img src="http://openweathermap.org/img/w/' + icon + '.png"/>') 
    currentTemp.textContent = 'Temp: ' + temp + '\xB0 F';            
    windSpeed.textContent = 'Wind: ' + wind + ' MPH';        
    currentUVI.textContent = 'UVI: ' + uvi;       
    currentHum.textContent = 'Humidity: ' + humidity + ' %';

    // clear card holder if searching for a new city
    $('.card-holder').empty();

    // get next five day weather information and build cards displaying that
    for(var i = 1; i < 6; i++){
        // get data needed to display for five day forecast
        var date = data.daily[i].dt;
        var newDate = moment.unix(date).format('L');
        var futureHum= data.daily[i].humidity;
        var futureTemp = data.daily[i].temp.max;
        var futureWind = data.daily[i].wind_speed;
        var weatherIcon = data.daily[i].weather[0].icon;
        // display next five days in cards
        $('.card-holder')
            .append('<div class="card col-sm-2 forecastCard"> <h4 class="card-header" id="forecastDate"> ' + newDate + ' </h4><ul class="list-group list-group-flush">'
                + '<li class="list-group-item"><img src="http://openweathermap.org/img/w/' + weatherIcon + '.png" /> </li>'
                + '<li class="list-group-item"> Temp: ' + futureTemp + '</li>' 
                + '<li class="list-group-item"> Humidity: ' + futureHum + '</li>' 
                + '<li class="list-group-item"> Wind: ' + futureWind + '</li></ul></div></div>')
    }      
}

function storeCityVal(name){
    var searchHistory = document.querySelector("#search-history")
    var historyButton = document.createElement("button")
    historyButton.type = "submit";
    historyButton.className ='btn';
    historyButton.textContent = name;

    searchHistory.appendChild(historyButton);

}

// user enters city value and kicks off pulling 
var formSubmitHandler = function(event){
    event.preventDefault();
    // get value that user enters
    var cityVal = cityInputEl.value.trim(); 
    // if a valid input is entered   
    if(cityVal){
        getCityCoord(cityVal);
        storeCityVal(cityVal);
        cityInputEl.value = "";        
    } else {
        alert("Please enter a valid city name")
    }
}


userFormEl.addEventListener("submit",formSubmitHandler);
