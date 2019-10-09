const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')
const {username, password} = require('../config.json')

const Music = require("./models/Music")

mongoose.connect(`mongodb+srv://${username}:${password}@muizz-bot-jchyj.mongodb.net/Muizz-bot`)
    .then(() => {
        console.log('Database connected')
    })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use ((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Header", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    next();
})

app.post("/api/music", (req, res, next) => {
    console.log(req.body)
    const music = new Music({
        title: req.body.title,
        url: req.body.url
    })
    music.save()
    res.status(201).json({
        message: "Music added successfully",
        data: music
    })
})

app.get("/api/music", (req, res, next) => {
    Music.find().then(documents => {
        console.log(documents)
        res.status(200).json({
            message: "OK",
            musics: documents
        })
    })
})

app.use((req, res, next) => {
    res.send('Hello from express !')
})

module.exports = app;