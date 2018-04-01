'use strict'

module.exports = (app, authenticate) => {
    let duelController = require('../controller/duelController')

    app.route('/newDuel')
        .post(authenticate(), duelController.newDuel)
    
    // app.route('/register')
    //     .post(auth.register)

    // app.route('/profile')
    //     .get(authenticate(), auth.profile)
}