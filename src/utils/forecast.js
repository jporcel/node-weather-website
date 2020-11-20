const request = require('request');

const getForecast = (city, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c77fcf21da82eebb8290306318771cfb&query=' + city + '&units=f'
    const mapOptions = {
        url: url,
        json: true
    }
    request(mapOptions, (error, response) => {
        callback(response.body.current)
    });
};


module.exports = {
    getForecast
}
