// const client = require('./client.js');
const ensureAuth = require('./auth/ensure-auth');
const createAuthRoutes = require('./auth/create-auth-routes');

//Import
const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // http logging

const authRoutes = createAuthRoutes();

// setup authentication routes to give user an auth token
// creates a /auth/signin and a /auth/signup POST route. 
// each requires a POST body with a .email and a .password


app.get('/location', async(req, res) => {

   //const city = req.query.search;
    const data = [
      {
      "formatted_query": "Seattle, King County, Washington, USA",
      "latitude": "47.6038321",
      "longitude": "-122.3300624"
      }
  ];
    res.json(data);

});



app.use(require('./middleware/error'));

module.exports = app;
