'use strict'

module.exports = (app, authenticate) => {
    let duelController = require('../controller/duelController')

    app.route('/newDuel')
        .post(authenticate(), duelController.newDuel)
    
    app.route('/duels')
        .get(authenticate(), duelController.getUserDuels)

    app.route('/duel')
        .put(authenticate(), duelController.updateDuel)
}