require('dotenv').config()
const { Console } = require("console");
const express = require("express");;[]

const app = express();
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: true }))


const https = require("https")
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");

})
app.post("/", function (req, res) {
    const city = req.body.CityName;
    const apiKEY = process.env.API;


    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKEY + "&units=metric"
    https.get(url, function (response) {
        console.log(response.statusCode);
        response.on("data", function (data) {
            const weatherdata = JSON.parse(data)
            const temp = weatherdata.main.temp
            const overcast = weatherdata.weather[0].description
            const icon = weatherdata.weather[0].icon
            const ImageUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
            console.log(overcast)
            console.log(temp)

            res.write("<h1> The temperature in " + city + " is " + temp + " degree celsius..</h1>")
            res.write("<img src=" + ImageUrl + ">")
            res.send();
        })
    })
})










app.listen(3000, function () {
    console.log("server is running")
})