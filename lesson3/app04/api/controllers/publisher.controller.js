const gamesData = require("../data/games.json");
require("../data/games-model")
const mongoose = require("mongoose");
const Game = mongoose.model(process.env.GAME_MODEL);


module.exports.getPublisher = function(req, res) {
    console.log("GetPublisher controller called", req.params.gameId);
    const gameId = req.params.gameId;
    Game.findById(gameId).exec(function(err, game) {
        console.log("Found game", game);
        res.status(200).json(game.publisher);
    })
}

module.exports.addOne = function(req, res) {
    console.log("Add One Publisher Controller");
    const gameId = req.params.gameId;
    Game.findById(gameId).select("publisher").exec(function(err, game) {
        console.log("Found game ", game);
        const response = {
            status: 200,
            message: game
        }
        if (err) {
            console.log("Error finding game");
            response.status = 500;
            response.message = err;
        } else if (!game)
            console.log("Error finding game");
        response.status = 404;
        response.message = { "message": "Game ID not found " + gameId };
        if (game) {
            _addPublisher(req, res, game)
        } else
            res.status(response.status).json(response.message);
    })
}

const _addPublisher = function(req, res, game) {
    console.log("bodyyyyyyy", req.body)
    game.publisher.name = req.body.name;
    game.publisher.country = req.body.country
    game.publisher.established = req.body.established
        // game.publisher.location = req.body.location;
        // game.publisher.location.coordinates = [parseFloat(req.body.lng),
        //     parseFloat(req.body.lat)
        // ]
    game.save(function(err, updatedGame) {
        const response = { status: 200, message: [] };
        if (err) {
            response.status = 500;
            response.message = err;
        } else
            response.status = 201;
        response.message = game.publisher;
        res.status(response.status).json(response.message)
    });
}

// const _addPublisher = function(req, res, game) {
//     console.log(req.body)
//     const newLocation = { coordinates: [req.body.location.coordinates[0], req.body.location.coordinates[1]] };
//     console.log("lcationnnnn", newLocation)
//     const newPublisher = {
//         name: req.body.name,
//         country: req.body.country,
//         established: req.body.established,
//         location: newLocation
//     }
//     game.publisher = newPublisher;
//     Game.findByIdAndUpdate(game.id, game, function(err, updatedGame) {
//         const response = { status: 200, message: [] };
//         if (err) {
//             response.status = 500;
//             response.message = err;
//         } else {
//             response.status = 200;
//             response.message = game.publisher;
//         }
//         res.status(response.status).json(response.message);
//     })
// }