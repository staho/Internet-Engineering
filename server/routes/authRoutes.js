'use strict'

module.exports = app => {
    let auth = require('../controller/authController')

    app.route('/login')
        .post(auth.login)
    
    app.route('/register')
        .post(auth.register)
}