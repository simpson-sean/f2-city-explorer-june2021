
function mungedLocationData(locationResponse) {
    
    const locationItem = locationResponse[0];

    return {
        formatted_query: locationItem.display_name,
        latitude: locationItem.lat,
        longitude: locationItem.lon

    };
}

function mungedWeatherData(weatherResponse) {
    const forecasts = weatherResponse.data;
    
    const mungedForecast = forecasts.map(forecast => {
        return {
            forecast: forecast.weather.description,
            time: new Date(forecast.ts * 1000).toLocaleDateString('en-US', {
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
            })
           
        };
        
    });
    console.log(mungedForecast);
    return mungedForecast;
};


// mungedYelpData()


module.exports = {
    mungedLocationData,
    mungedWeatherData
};