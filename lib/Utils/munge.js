
function mungeLocationData(locationResponse) {
    
    const locationItem = locationResponse[0];

    return {
        formatted_query: locationItem.display_name,
        latitude: locationItem.lat,
        longitude: locationItem.lon

    };
}

function mungeWeatherData(weatherResponse) {

    const weatherItem = weatherResponse[0];

    return {
        forecast: weatherItem.weather.description, 
        time: weatherItem.datetime,
    };
};

// mungeYelpData()


module.exports = {
    mungeLocationData,
    mungeWeatherData,
};