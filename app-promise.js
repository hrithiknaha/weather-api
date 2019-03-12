const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodedAddress}&key=5a92cf3af1154e6a9b3d9c9286fb8dc8`;

axios.get(geocodeUrl).then((response) => {
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find that address.');
  }

  var lat = response.data.results[0].geometry.lat;
  var lng = response.data.results[0].geometry.lng;
  var weatherUrl = `https://api.forecast.io/forecast/84005a18e9d934b20348cd5af7ba6114/${lat},${lng}`;
  console.log(response.data.results[0].formatted);
  return axios.get(weatherUrl);
}).then((response) => {
  var temperature = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;
  console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`);
}).catch((e) => {
  if (e.code === 'ENOTFOUND') {
    console.log('Unable to connect to API servers.');
  } else {
    console.log(e.message);
  }
});
