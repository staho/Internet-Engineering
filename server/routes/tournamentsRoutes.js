'use strict'

module.exports = (app, authenticate) => {
    let auth = require('../controller/tournamentController')

    app.route('/login')
        .post(auth.login)
    
    app.route('/register')
        .post(auth.register)

    app.route('/profile')
        .get(authenticate(), auth.profile)
}