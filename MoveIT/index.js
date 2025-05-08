const express = require('express');
const app = express();

app.use(express.static("./public"));

let port = process.env.PORT || 3000;
const server = app.listen(port)

const io = require("./io/io.js")(server);

app.get("/", (req, res) => {    //Startseite
    res.sendFile(__dirname + "/public/pages/index.html");
})

app.get("/lobby_host", (req, res) => {      //Lobby für beigetretene Spieler
    res.sendFile(__dirname + "/public/pages/lobby_host.html");
})

app.get("/lobby", (req, res) => {       //Lobby für den Host
    res.sendFile(__dirname + "/public/pages/lobby_player.html");
})

app.get("/anleitung", (req, res) => {       //Anleitung
    res.sendFile(__dirname + "/public/pages/Spielanleitung-MoveIt.html");
})

app.get("/test", (req, res) => {        //zum testen von Dateien mit dem Namen test.html
    res.sendFile(__dirname + "/public/pages/test.html");
})

//