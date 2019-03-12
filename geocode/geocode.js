const request = require('request');

var geocodeAddress = (address, callback) => {
  var encodedAddress = encodeURIComponent(address);

  request({
    url: `https://api.opencagedata.com/geocode/v1/json?q=${encodedAddress}&key=5a92cf3af1154e6a9b3d9c9286fb8dc8`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to Google servers.');
    } else if (body.status.code === 404) {
      callback('Unable to find that address.');
    } else if (body.status.code === 200) {
      callback(undefined, {
        address: body.results[0].formatted,
        latitude: body.results[0].geometry.lat,
        longitude: body.results[0].geometry.lng
      });
    }
  });
};

module.exports.geocodeAddress = geocodeAddress;


