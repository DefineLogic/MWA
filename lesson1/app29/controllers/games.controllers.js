const gamesData = require("../data/games.json");



module.exports.getAll = function(req, res) {
    console.log("GetAll controller called");
    //console.log(req, res);
    // res.status(200).json({ 'jsonData': 'GET' });
    res.status(200).json({ gamesData });

}