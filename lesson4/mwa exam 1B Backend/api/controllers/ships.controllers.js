const mongoose = require("mongoose");
const Ship = mongoose.model(process.env.SHIP_MODEL);

const getAll = function(req, res) {
    Ship.find().exec(function(err, ships) {
        const response = {
            status: parseInt(process.env.REST_API_OK, 10),
            message: ships
        };
        if (err) {
            response.status = parseInt(process.env.REST_API_SYSTEM_ERROR, 10);
            response.message = err;
        }
        res.status(response.status).json(response.message);
    });
}

const getOne = function(req, res) {
    const shipId = req.params.shipId;
    Ship.findById(shipId).exec(function(err, ship) {
        const response = {
            status: parseInt(process.env.REST_API_OK, 10),
            message: ship
        };
        if (err) {
            response.status = parseInt(process.env.REST_API_SYSTEM_ERROR, 10);
            response.message = err;
        } else if (!ship) {
            response.status = parseInt(process.env.REST_API_RESOURCE_NOT_FOUND_ERROR, 10);
            response.message = {
                "message": process.env.REST_API_RESOURCE_NOT_FOUND_MESSAGE
            };
        }
        res.status(response.status).json(response.message);
    });
}

const geoSearch = function(req, res) {
    const lng = parseFloat(req.params.lng);
    const lat = parseFloat(req.params.lat);
    const distance = parseInt(req.params.distance) || 1000;
    const point = { type: "Point", coordinates: [lng, lat] }
    const query = {
        "coordinates": {
            $near: {
                $geometry: point,
                $maxDistance: distance
            }
        }
    }

    Ship.find(query).limit(5).exec(function(err, ships) {
        if (err) {
            console.log("Geo Error.", err);
            res.status(500).json(err);
        } else {
            console.log("Geo results", ships)
            res.status(200).json(ships)
        }
    })
}

const getAllPagination = function(req, res) {
    console.log("Get all pagination called")
    let offset = 0;
    let count = 1;
    let maxCount = 30;
    if (req.params.offset) {
        offset = parseInt(req.params.offset, 10)
    }
    if (req.params.count) {
        count = parseInt(req.params.count, 10)
    }
    if (count > maxCount) {
        console.log()
        res.status(400).json({ message: "count must be less than 30" })
    }
    if (isNaN(offset) || isNaN(count)) {
        console.log("Offset or count is not a number")
        res.status(400).json({ message: "offset and count must be digits." })
    }
    Ship.find().skip(offset).limit(count).exec(function(err, ships) {
        if (err) {
            res.status(500).json(err);
        } else if (ships) {
            res.status(200).json(ships)
        } else if (!ships) {
            res.status(404).json({ message: "no ships found." })
        }
    })
}

module.exports = {
    getAll: getAll,
    getOne: getOne,
    geoSearch: geoSearch,
    getAllPagination: getAllPagination
};