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
    console.log("TUTAJ")    
    let strategy = new Strategy(params, (payload, done) => {
        console.log(payload)
        User.findOne({_id: payload._id}, (err, user) => {
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
        // if (user) {
        //     return done(null, {
        //         _id: user._id
        //     })
        // } else {
        //     return done()
        // }
    })

    passport.use(strategy)

    return {
        initialize: () => {
            console.log("initializing")
            return passport.initialize()
        },
        authenticate: () => {
            console.log("Authenticating")
            return passport.authenticate("jwt", cfg.jwtSession)
        }
    }
}