const express = require("express");
const https = require("https");
var bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");   
});

app.post("/", function(req,res){
    const city = req.body.city;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=b2c934e8fa10c0b08936a2f56bf04b6e&units=metric";
    https.get(url, function(response){

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageurl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<h1>Temperature at "+city+" is "+temp+" Degree Celcius </h1>");
            res.write("<h3>The desciption is "+description+"</h3>");
            res.write("<img src="+imageurl+">");
            res.send();
        });

    });

});



app.listen(3000, function(){
    console.log("Port is working on 3000");
});