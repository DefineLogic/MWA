require("../data/games-model")
const mongoose = require("mongoose");
const Game = mongoose.model(process.env.GAME_MODEL);


module.exports.getAll = function(req, res) {
    console.log("GetAll controller called");
    let offset = 0;
    let count = 9;
    let maxCount = 10;
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);

    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }
    if (count > maxCount) {
        console.log("Count greater than max.");
        res.status(400).json({ message: "count must be less than 10" });
    }
    // let offset = parseInt(req.query.offset) || 0;    
    // let count = parseInt(req.query.count) || 3;
    if (isNaN(offset) || isNaN(count)) {
        console.log("Offset or count is not a number.");
        res.status(400).json({ message: "offset and count must be digits." });
        return;
    }
    console.log("offset count", offset, count)
    Game.find().skip(offset).limit(count).exec(function(err, games) {
            if (err) {
                res.status(500).json(err);
            } else {
                if (games) {
                    res.status(200).json(games);
                } else {
                    res.status(404).json({ message: "No games found " })
                }

            }
        })
        // getGamesCollection().find().skip(offset).limit(count).toArray(function(err, games) {
        //     console.log("Found games", games);
        //     res.status(200).json(games);
        // })
}


module.exports.getOne = function(req, res) {
    var response = {};
    console.log("GetOne promise controller called", req.params.gameId);
    const gameId = req.params.gameId;
    let valid = mongoose.isValidObjectId(gameId);
    if (!valid) {
        res.status(400).json({ err: 'not valid id' });
        return;
    }
    Game.findById(gameId).exec().then(game => {
        response.status = 200;
        response.message = game;
    }).catch(err => {
        response.status = 500;
        response.message = err;
    }).finally(() => res.status(response.status).json(response.message));
}

module.exports.getOneNoPromise = function(req, res) {
    var response = {};
    console.log("GetOne controller called", req.params.gameId);
    const gameId = req.params.gameId;
    let valid = mongoose.isValidObjectId(gameId);
    if (!valid) {
        res.status(400).json({ err: 'not valid id' });
        return;
    }
    Game.findById(gameId).exec(function(err, game) {
        if (err) {
            response.status = 500;
            response.message = err;
            console.log("Error readin games");
        }
        if (game) {
            console.log("Found game", game);
            response.status = 200;
            response.message = game;
        } else {
            console.log("no game found.");
            response.status = 400;
            response.message = { error: 'No game found with given id.' };
        }
        res.status(response.status).json(response.message);
    })
}



module.exports.deleteGame = function(req, res) {
    console.log("DeleteGame controller called", req.params.gameId);
    const gameId = req.params.gameId;
    let valid = mongoose.isValidObjectId(gameId);
    if (!valid) {
        res.status(400).json({ err: 'not valid id' });
        return;
    }
    Game.findByIdAndDelete(gameId).exec(function(err, deletedgame) {
        const response = { status: 204, message: deletedgame };
        if (err) {
            console.log("Error finding game.");
            response.status = 500;
            response.message = err;
        } else if (!deletedgame) {
            console.log("Game id not found.")
            response.status = 404;
            response.message = { "message": "Game ID not found." };
        }
        res.status(response.status).json(response.message);
    })

}

module.exports.addGame = function(req, res) {
    console.log("Game AddOne request");
    const newGame = {
        title: req.body.title,
        year: req.body.year,
        rate: req.body.rate,
        price: req.body.price,
        minPlayers: req.body.minPlayers,
        maxPlayers: req.body.maxPlayers,
        publisher: { name: "NoName" },
        reviews: [],
        minAge: req.body.minAge,
        designers: [req.body.designers]
    }
    Game.create(newGame, function(err, game) {
        const response = {
            status: 201,
            message: game
        }
        if (err) {
            console.log("Error creating game");
            response.status = 500;
            response.message = err;
        }
        res.status(response.status).json(response.message);
    });
}

// module.exports.replaceOne = function(req, res) {
//     console.log("fullUpdateOne controller called.");
//     const response = {
//         status: 200,
//         message: {}
//     }
//     const gameId = req.params.gameId;
//     let valid = mongoose.isValidObjectId(gameId);
//     if (!valid) {
//         res.status(400).json({ err: 'not valid id' });
//     }
//     Game.findById(gameId).exec(function(err, game) {
//         if (err) {
//             response.status = 500;
//             response.message = err;
//             console.log("Error readin games");
//         }
//         if (game) {
//             console.log("Found game");
//             game.title = req.body.title;
//             game.year = req.body.year;
//             game.rate = req.body.rate;
//             game.price = req.body.price;
//             game.minPlayers = req.body.minPlayers;
//             game.maxPlayers = req.body.maxPlayers;
//             game.minAge = req.body.minAge;
//             game.publisher = req.body.publisher;
//             game.designers = req.body.designers;
//             game.save(function(err, savedGame) {
//                 if (err) {
//                     console.log("Error reading Games");
//                     res.status(500).json(err);
//                 }
//             })
//             response.status = 200;
//             response.message = game;
//         } else {
//             console.log("no game found.");
//             response.status = 400;
//             response.message = { error: 'No game found with given id.' };
//         }
//         res.status(response.status).json(response.message);
//     })

// }

module.exports.findByGeoocation = function(req, res) {
    const lng = parseFloat(req.query.lng)
    const lat = parseFloat(req.query.lat)
    const distance = parseInt(req.query.distance) || 1000;
    const point = { type: "Point", coordinates: [lng, lat] }
    const query = {
        "publisher.location.coordinates": {
            $near: {
                $geometry: point,
                $minDistance: 0,
                $maxDistance: distance
            }
        }
    }
    Game.find(query).exec(function(err, games) {
        if (err) {
            console.log("Geo error", err);
            res.status(500).json(err);
        } else {
            console.log("Geo results", games);
            res.status(200).json(games)
        }
    })
}

module.exports.fullUpdateOne = function(req, res) {
    console.log("Full Update One Game Controller.")
    gameUpdate = function(req, res, game, response) {
        game.title = req.body.title;
        game.year = req.body.year;
        game.rate = req.body.rate;
        game.price = req.body.price;
        game.minPlayers = req.body.minPlayers;
        game.minAge = req.body.minAge;
        game.designers = req.body.designers;
        if (req.body.name) {
            console.log("Name passed.");
            game.publisher = { name: req.body.name };
        } else {
            console.log("No Name passed");
            game.publisher = { name: "NoName" }
        }
        game.reviews = [];
        game.save(function(err, UpdatedGame) {
            if (err) {
                response.status = 500;
                response.message = err;
            }
            res.status(response.status).json(response.message)
        });
    }
    _updateOne(req, res, gameUpdate);

}

module.exports.partialUpdateOne = function(req, res) {
    console.log("Full update one game controller.")
    gameUpdate = function(req, res, game, response) {
        game.title = req.body.title || game.title;
        game.year = req.body.year || game.year;
        game.rate = req.body.rate || game.rate;
        game.price = req.body.price || game.price;
        game.minPlayers = req.body.minPlayers || game.minPlayers;
        game.maxPlayers = req.body.maxPlayers || game.maxPlayers;
        game.minAge = req.body.minAge || game.minAge;
        game.designers = req.body.designers || game.designers;
        game.publisher = req.body.publisher || game.publisher;
        game.reviews = req.body.reviews || game.reviews;

        game.save(function(err, updatedGame) {
            if (err) {
                response.status = 500;
                response.message = err;
            }
            res.status(response.status).json(response.message);
        })
    }
    _updateOne(req, res, game, Update);
}




const _updateOne = function(req, res, updateGameCallBack) {
    console.log("Update One Game Controller");
    const gameId = req.params.gameId;
    let valid = mongoose.isValidObjectId(gameId);
    if (!valid) {
        res.status(400).json({ err: 'not valid id' });
    }
    Game.findById(gameId).exec(function(err, game) {
        const response = { status: 204, message: game };
        if (err) {
            console.log("Error finding game")
        } else if (!game) {
            console.log("Game ID not found.")
            response.status = 500;
            response.message = { "messsage": "Game Id not found." }
        }
        if (response.status !== 204) {
            res.status(response.status).json(response.message);
        } else {
            updateGameCallBack(req, res, game, response)
        }
    })
}