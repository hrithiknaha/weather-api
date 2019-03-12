const request = require ('request');

var getWeather = (lat, lng, callback) => {
    request({
        url : `https://api.darksky.net/forecast/84005a18e9d934b20348cd5af7ba6114/${lat},${lng}`,
        json: true
      }, (error, response, body) => {
        if(error){
          callback("Unable to connect to Darksky.io");
        } else if(response.statusCode === 404){
          callback("Unable to fetch weather.")
        } else if(response.statusCode = 200){
          callback(undefined, {
              temperature: body.currently.temperature,
              apparentTemperature: body.currently.apparentTemperature
            })
        }
    });
}

module.exports.getWeather = getWeather;
