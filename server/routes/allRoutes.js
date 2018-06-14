'use strict'

module.exports = (app, authenticate, wss) => {
    let authRoutes = require('./authRoutes'),
        duelRoutes = require('./duelRoutes'),
        tournamentRoutes = require('./tournamentsRoutes')

        authRoutes(app, authenticate)
        duelRoutes(app, authenticate, wss)
        tournamentRoutes(app, authenticate)
}