
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
    
    return mungedForecast;
};


function mungedReviewsData(yelpResponse) {
    console.log(yelpResponse);
    const reviews = yelpResponse.businesses;

    const mungeReviews = reviews.map(review => {
        return {
            name: review.name,
            image_url: review.image_url,
            price: review.price,
            rating: review.rating,
            url: review.url,
        }

    })
    return mungeReviews;
    
}


module.exports = {
    mungedLocationData,
    mungedWeatherData,
    mungedReviewsData
};