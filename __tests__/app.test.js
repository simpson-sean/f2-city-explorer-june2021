require('dotenv').config();

const fakeRequest = require('supertest');
const app = require('../lib/app');


describe('app routes', () => {
  describe('routes', () => {

    test('returns location data', async() => {

      const expectation = 
        {
          "formatted_query": "Seattle, King County, Washington, USA",
          "latitude": "47.6038321",
          "longitude": "-122.3300624"
        }

      const data = await fakeRequest(app)
        .get('/location?search=seattle')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(data.body).toEqual(expectation);
    });

    
    test('returns weather data', async() => {

      const expectation = [

        {
          "forecast": "Partly cloudy until afternoon.",
          "time": "Tuesday, June 29, 2021"
        },
        {
          "forecast": "Mostly cloudy in the morning.",
          "time": "Wednesday, June 30, 2021"
        },

      ];
      
      const data = await fakeRequest(app)
        .get('/weather?latitude=47.6038321&longitude=-122.3300624')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(data.body).toEqual(expectation);
    });
  });



  });

