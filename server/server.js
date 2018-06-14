let express = require("express"),
    mongoose = require('mongoose'),
    User = require('./model/UserModel'),
    Duel = require('./model/DuelModel'),
    Tournament = require('./model/TournamentModel'),
    bodyParser = require('body-parser'),
    cfg = require("./config"),
    app = express(),
    port = process.env.port || 3000,
    auth = require('./auth')(),
    cors = require('cors'),
    myMiddleware = require('./middleware/middle'),
    webSocket = require('express-ws')(app)

mongoose.Promise = global.Promise
mongoose.connect('mongodb://' + cfg.mongodb.user + ':' + cfg.mongodb.password + '@' + cfg.mongodb.serverAddress)


app.use(cors({origin: 'http://localhost:3001',}))
app.use(auth.initialize())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'))


app.ws("/", (ws, req) => {
    ws.on('message', msg => {
        let msgJs = JSON.parse(msg)
        console.log(msgJs)

        if(msgJs.type === 'update'){
            console.log("Sth")
            ws.send(JSON.stringify({refresh: true}))
        }
        console.log("Msg ", msg)
    })
    // ws.send("XDDD")
    console.log('socket', req.testing)
})

let allRoutes = require('./routes/allRoutes')
allRoutes(app, auth.authenticate)

app.listen(port)

console.log("Server started on port: ", port)