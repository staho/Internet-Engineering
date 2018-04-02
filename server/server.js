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
    cors = require('cors')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://' + cfg.mongodb.user + ':' + cfg.mongodb.password + '@' + cfg.mongodb.serverAddress)

app.use(cors({origin: 'http://localhost:3001',}))
app.use(auth.initialize())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


// let routes = require('./routes/authRoutes')
// routes(app, auth.authenticate)

let allRoutes = require('./routes/allRoutes')
allRoutes(app, auth.authenticate)

app.listen(port)

console.log("Server started on port: ", port)