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
        {forecast: "Overcast clouds", time: "Thursday, July 01, 2021"},    
        { forcast: 'Overcast clouds', time: 'Thursday, July 1, 2021' },
        { forcast: 'Scattered clouds', time: 'Friday, July 2, 2021' },
        { forcast: 'Clear Sky', time: 'Saturday, July 3, 2021' },
        { forcast: 'Broken clouds', time: 'Sunday, July 4, 2021' },
        { forcast: 'Scattered clouds', time: 'Monday, July 5, 2021' },
        { forcast: 'Clear Sky', time: 'Tuesday, July 6, 2021' },
        { forcast: 'Clear Sky', time: 'Wednesday, July 7, 2021' },
        { forcast: 'Few clouds', time: 'Thursday, July 8, 2021' },
        { forcast: 'Broken clouds', time: 'Friday, July 9, 2021' },
        { forcast: 'Clear Sky', time: 'Saturday, July 10, 2021' },
        { forcast: 'Clear Sky', time: 'Sunday, July 11, 2021' },
        { forcast: 'Clear Sky', time: 'Monday, July 12, 2021' },
        { forcast: 'Clear Sky', time: 'Tuesday, July 13, 2021' },
        { forcast: 'Clear Sky', time: 'Wednesday, July 14, 2021' },
        { forcast: 'Broken clouds', time: 'Thursday, July 15, 2021' },
        { forcast: 'Broken clouds', time: 'Friday, July 16, 2021' },
      ];
      
      const data = await fakeRequest(app)
        .get('/weather?latitude=47.6038321&longitude=-122.3300624')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(data.body).toEqual(expectation);
    });
  });



  });

