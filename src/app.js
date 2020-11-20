const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const app = express();

//paths for express config
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//handlebasrs engine and views location
app.set('view engine','hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//static directory
app.use(express.static(publicPath));

//routes
app.get('', (req, res)=>{
   res.render('index', {
       title: 'Application',
       name: 'Jeff'
   });
});

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About',
        name: 'Jeff'
    });
});

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help',
        name: 'Jeff'
    });
});

app.get('/weather', (req, res) => {

    geocode.search(req.query.address, (  { place_name, center} )=>{

        forecast.getForecast(  place_name,(data)=>{

            var weather_description = '';
            const descCount = data.weather_descriptions.length;
            for(i = 0; i < descCount; i++) {
                var desc = data.weather_descriptions[i];
                weather_description = weather_description + desc
                if(i <descCount-1){
                    weather_description = weather_description + ', ';
                }
            }
            const forecast = weather_description + '. It is currently ' + data.temperature + '. It feels like ' + data.feelslike;
            res.send({
                forecast: forecast,
                temperature: data.temperature,
                feelslike: data.feelslike,
                address:  place_name,
                lat: center[0],
                long: center[0]
            });
        });

    })
});

app.get('/products', (req, res) =>{

    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        }
    );

    console.log(req.query);
    res.send({
        products:[]
    });
}

});

app.get('/help/*', (req, res)=>{
    res.render('404',{
        title: '404',
        message: 'Help Article Not Found',
        name: 'Jeff'
    });
})

app.get('*', (req, res)=>{
    res.render('404',{
        title: '404',
        message: 'Page not found.',
        name: 'Jeff'
    });
})

app.listen(80, ()=>{
    console.log('Server started on port 80');
})
