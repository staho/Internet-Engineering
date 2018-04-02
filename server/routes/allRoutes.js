'use strict'

module.exports = (app, authenticate) => {
    let authRoutes = require('./authRoutes'),
        duelRoutes = require('./duelRoutes'),
        tournamentRoutes = require('./tournamentsRoutes')

        authRoutes(app, authenticate)
        duelRoutes(app, authenticate)
        tournamentRoutes(app, authenticate)
}