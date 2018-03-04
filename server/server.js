let express = require("express"),
    mongoose = require('mongoose'),
    User = require('./model/UserModel'),
    bodyParser = require('body-parser'),
    cfg = require("./config"),
    app = express(),
    port = process.env.port || 3000,
    auth = require('./auth')()

mongoose.Promise = global.Promise
mongoose.connect('mongodb://' + cfg.mongodb.user + ':' + cfg.mongodb.password + '@ds253468.mlab.com:53468/ie-app')

app.use(auth.initialize())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


let routes = require('./routes/authRoutes')
routes(app, auth.authenticate)

app.listen(port)

console.log("Server started on port: ", port)