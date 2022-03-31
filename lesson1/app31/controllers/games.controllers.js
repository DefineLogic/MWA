const gamesData = require("../data/games.json");

module.exports.getAll = function(req, res) {
    console.log("GetAll controller called");
    let offset = parseInt(req.query.offset) || 0;
    let count = parseInt(req.query.count) || 5;
    console.log("offset count", offset, count)
    const pageGames = gamesData.slice(offset, offset + count);
    //console.log(req, res);
    // res.status(200).json({ 'jsonData': 'GET' });
    res.status(200).json({ pageGames });

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