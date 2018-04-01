'use strict'

module.exports = (app, authenticate) => {
    let authRoutes = require('./authRoutes'),
        duelRoutes = require('./duelRoutes')

        authRoutes(app, authenticate)
        duelRoutes(app, authenticate)
}