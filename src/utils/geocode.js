const request = require('request');

const search = (address, callback) => {
    const geoUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address +  '.json?access_token=pk.eyJ1IjoiZmxhdmVncmF2eSIsImEiOiJja2hvd3NtZ2UwNTh2MnJvMnc2Z3d0YmQzIn0.AxVRb7M5gW9kRJE2iv4WPg'
    const mapOptions = {
        url: geoUrl,
        json: true
    }
    request(mapOptions, (error, response) => {
        callback(response.body.features[0])
    });
};

module.exports = {
    search
}
