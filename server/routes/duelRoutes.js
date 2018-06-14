'use strict'

module.exports = (app, authenticate, wss) => {
    let duelController = require('../controller/duelController')

    app.route('/newDuel')
        .post(authenticate(), duelController.newDuel)
    
    app.route('/duels')
        .get(authenticate(), duelController.getUserDuels)

    app.route('/duel')
        .put(authenticate(), duelController.updateDuel)
}