let passport = require('passport'),
    passportJWT = require('passport-jwt'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    cfg = require("./config.js"),
    ExtractJwt = passportJWT.ExtractJwt,
    Strategy = passportJWT.Strategy,
    params = {
        secretOrKey: cfg.jwtSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }

module.exports = () => {
       
    let strategy = new Strategy(params, (payload, done) => {
        console.log(payload)
        User.findById(payload._id, (err, user) => {
            if (err) {
                return done(new Error("User not found"), null);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
                // or you could create a new account
            }
        })
    })

    passport.use(strategy)

    return {
        initialize: () => {
            // console.log("initializing")
            return passport.initialize()
        },
        authenticate: () => {
            // console.log("Authenticating")
            return passport.authenticate("jwt", cfg.jwtSession)
        }
    }
}