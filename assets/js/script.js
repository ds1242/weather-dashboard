function getWeather(){
    var apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&units=imperial&exclude=hourly,daily&appid=1eec8ff5f151483ae61036bcfff1b27e';
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
        console.log("unable to connect to openweathermap")
    });
}

function setCurrentWeather(data){
    var temp = data.current.temp;
        var wind = data.current.wind_speed;
        var uvi = data.current.uvi;
        var humidity = data.current.humidity;
        var icon = data.current.weather[0].main;

        console.log(icon);
        
        var currentCity = document.getElementById('currentCity');
        
        var currentTemp = document.getElementById('currentTemp');
        currentTemp.textContent = 'Temp: ' + temp + '\xB0 F';
        console.log(currentTemp);
        var windSpeed = document.getElementById('windSpeed');
        windSpeed.textContent = 'Wind: ' + wind + ' MPH';

        var currentUVI = document.getElementById('uvi');
        currentUVI.textContent = 'UVI: ' + uvi;

        var currentHum = document.getElementById('humidity')
        currentHum.textContent = 'Humidity: ' + humidity + ' %';
}


function iconSet(icon){
    var currentCity = document.getElementById('currentCity');
    if(icon === 'Clear'){
        currentCity.addClass('bi bi-brightness-high')
    }

}


getWeather();