const gamesData = require("../data/games.json");
const dbConnection = require("../data/dbconnection");
require("../data/games-model")
const ObjectId = require("mongodb").ObjectId;
const mongoose = require("mongoose");
const Game = mongoose.model(process.env.GAME_MODEL);

const getGamesCollection = function() {
    return dbConnection.get().collection("games");
}
module.exports.getAll = function(req, res) {
    console.log("GetAll controller called");
    let offset = parseInt(req.query.offset) || 0;
    let count = parseInt(req.query.count) || 3;
    console.log("offset count", offset, count)
    Game.find().skip(offset).limit(count).exec(function(err, games) {
            res.status(200).json(games);
        })
        // getGamesCollection().find().skip(offset).limit(count).toArray(function(err, games) {
        //     console.log("Found games", games);
        //     res.status(200).json(games);
        // })
}

// module.exports.getGame = function(req, res) {
//     console.log("GetOne controller called", req.params.gameId);
//     const gameId = req.params.gameId;
//     getGamesCollection().findOne({ _id: ObjectId(gameId) }, function(err, game) {
//         console.log("Found game", game);
//         res.status(200).json(game);
//     })
// }


module.exports.getOne = function(req, res) {
    console.log("GetOne controller called", req.params.gameId);
    const gameId = req.params.gameId;
    Game.findById(gameId).exec(function(err, game) {
        console.log("Found game", game);
        res.status(200).json(game);
    })
}


module.exports.getPublisher = function(req, res) {
    console.log("GetPublisher controller called", req.params.gameId);
    const gameId = req.params.gameId;
    Game.findById(gameId).exec(function(err, game) {
        console.log("Found game", game);
        res.status(200).json(game.publisher);
    })
}

module.exports.deleteGame = function(req, res) {
    console.log("DeleteGame controller called", req.params.gameId);
    const gameId = req.params.gameId;
    ObjectId(gameId, function(err, res) {
        getGamesCollection().deleteOne({ _id: res }, function(err, object) {
            if (err) {
                res.status(400).json({ error: "Game id null" })
                return;
            } else if (object.deletedCount == 0) {
                res.status(404).json({ error: "No document found to delete" })
            }
            console.log("Document deleted for id", gameId);
            res.status(200).json({ "status": "document deleted successfully" });

        })
    })

}

module.exports.addGame = function(req, res) {
    console.log("AddOne controller called");

    res.status(200).json(req.body);
}