const gamesData = require("../data/games.json");
const dbConnection = require("../data/dbconnnection");

module.exports.getAll = function(req, res) {
    console.log("GetAll controller called");
    const db = dbConnection.get();
    //console.log("db", db);
    const techCollection = db.collection("technology");
    techCollection.find().toArray(function(err, docs) {
        console.log("Found technologies", docs);
        res.status(200).json(docs);
    })
}

module.exports.getGame = function(req, res) {
    console.log("GetOne controller called");
    const gameIndex = req.params.gamesIndex;
    console.log("gameIndex::::::::;", gameIndex)
    res.status(200).json(gamesData[gameIndex]);

}

module.exports.addOne = function(req, res) {
    console.log("AddOne controller called");
    res.status(200).json(req.body);
}