var currentCity = document.getElementById('currentCity');
var currentTemp = document.getElementById('currentTemp');
var windSpeed = document.getElementById('windSpeed');
var currentUVI = document.getElementById('uvi');
var currentHum = document.getElementById('humidity');
var cityInputEl = document.getElementById('city');
var userFormEl = document.getElementById('user-form')
var key = '1eec8ff5f151483ae61036bcfff1b27e'

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
    var icon = data.current.weather[0].main;
    var date = data.current.dt;

    // display current weather information
    var newDate = moment.unix(date).format('L');
    console.log(icon);   
    currentCity.textContent = cityName + " (" + newDate + ")";     
    currentTemp.textContent = 'Temp: ' + temp + '\xB0 F';            
    windSpeed.textContent = 'Wind: ' + wind + ' MPH';        
    currentUVI.textContent = 'UVI: ' + uvi;       
    currentHum.textContent = 'Humidity: ' + humidity + ' %';
    
    // get next five day weather information and build cards displaying that
    for(var i = 1; i < 6; i++){
        var date = data.daily[i].dt;
        var newDate = moment.unix(date).format('L');
        var tempTomorrow = data.daily[i].humidity;
        console.log("tomorrow humidity " + tempTomorrow);
        console.log(newDate);
        var futureCard = $('.card-holder')
            .append('<div class="col-sm-2"> <div class="card forecastCard"> <h4 class="card-header" id="forecastDate"> ' + newDate + ' <ul class="list-group list-group-flush"></h4></div></div>')

    }
        
        
}
// function fiveDay(name){
//     var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + name + '&appid=' + key;
//     fetch(apiUrl)
//     .then(function(response){
//         return response.json();
//     })
//     .then(function(data){
//         console.log(data);
//     })
// }


var formSubmitHandler = function(event){
    event.preventDefault();
    
    var cityVal = cityInputEl.value.trim();
    // console.log(cityVal)
    
    if(cityVal){
        getCityCoord(cityVal);
        // fiveDay(cityVal)
        cityInputEl.value = "";
        
    } else {
        alert("Please enter a valid city name")
    }
}






    // var date = data.daily[1].dt;
    // var newDate = moment.unit(date).format('L');

    // var futureCard = $('.card-holder')
    //     .append('<div class="card"> <div class="card"> <h4 class="card-header" id="forecastDate">' + newDate + '</h4></div></div>')
    

// function iconSet(icon){
//     var currentCity = document.getElementById('currentCity');
//     if(icon === 'Clear'){
//         currentCity.addClass('bi bi-brightness-high')
//     }

// }

userFormEl.addEventListener("submit",formSubmitHandler);
