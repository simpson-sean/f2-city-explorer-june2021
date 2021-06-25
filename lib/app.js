// const client = require('./client.js');
const ensureAuth = require('./auth/ensure-auth');
const createAuthRoutes = require('./auth/create-auth-routes');

//Import
const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const request = require('superagent');
const { mungeLocationData } = require('./Utils/munge.js');

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

    const mungedData = mungeLocationData(data.body);
    res.json(mungedData);
  } catch (e) {
      res.status(500).json( {message: e.message} )
  }
})

app.get('/weather', async(req, res) => {
 
  try {
    const weatherData = [
      
      {
        "forecast": "Partly cloudy until afternoon.",
        "time": "Tuesday, June 29, 2021"
      },
      {
        "forecast": "Mostly cloudy in the morning.",
        "time": "Wednesday, June 30, 2021"
      },
    ];
    
    res.json(weatherData);

  } catch (e) {
      res.status(500).json( {message: e.message} )
  }
})



app.use(require('./middleware/error'));

module.exports = app;
