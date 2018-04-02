'use strict'

module.exports = (app, authenticate) => {
    let tournamentController = require('../controller/tournamentController')

    app.route('/tournament')
        .get(authenticate(), tournamentController.allTournaments)
        .post(authenticate(), tournamentController.createTournament)
        .put(authenticate(), tournamentController.updateTournament)

}