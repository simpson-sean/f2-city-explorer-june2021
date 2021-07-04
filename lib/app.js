// const client = require('./client.js');
const ensureAuth = require('./auth/ensure-auth');
const createAuthRoutes = require('./auth/create-auth-routes');

//Import
const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const request = require('superagent');
const { mungedLocationData } = require('./Utils/munge.js');
const { mungedWeatherData } = require('./Utils/munge.js');
const { mungedReviewsData } = require('./Utils/munge.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // http logging

// const authRoutes = createAuthRoutes();

// setup authentication routes to give user an auth token
// creates a /auth/signin and a /auth/signup POST route. 
// each requires a POST body with a .email and a .password


app.get('/location', async(req, res) => {
 
  try {

    const city = req.query.search;
    const data = await request.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.LOCATION}&q=${city}&format=json`);

    const mungedData = mungedLocationData(data.body);
    res.json(mungedData);
  } catch (e) {
      res.status(500).json( {message: e.message} )
  }
})

app.get('/weather', async(req, res) => {
 
  try {

    const lat = req.query.latitude;
    const lon = req.query.longitude;
    
    const weatherData = await request.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER}`);
  
    const mungeWeather = mungedWeatherData(weatherData.body); 
    res.json(mungeWeather);

  } catch (e) {
      res.status(500).json( {message: e.message} )
  }
})

app.get('/reviews', async(req, res) => {
 
  try {

    const lat = req.query.latitude;
    const lon = req.query.longitude;
    
    const reviewData = await request.get(`http://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${lon}`).set('Authorization', `Bearer ${process.env.YELP_REVIEWS}`);
  
    res.json(reviewData.body);
    // const mungeReviews = mungedReviewsData(reviewData.body); 
    // res.json(mungeReviews.body);
    

  } catch (e) {
      res.status(500).json( {message: e.message} )
  }
})



app.use(require('./middleware/error'));

module.exports = app;
