const mongoose = require("mongoose");
require("../data/sitcoms-model")
const Sitcom = mongoose.model(process.env.SITCOM_MODEL);

module.exports.sitcomsAddOne = function (req, res) {
    console.log("Sitcom AddOne called.");
    const newSitcom = {
        title: req.body.title,
        aired: req.body.aired,
        imdbRating: req.body.imdbRating,
        totalSeasons: req.body.totalSeasons,
        totalEpisodes: req.body.totalEpisodes,
        production: {productionTitle: "NoName"}
    };

    Sitcom.create(newSitcom, function (err, sitcom) {
        const response = {status: 201, message: sitcom};
        if (err) {
            console.log("Error creating sitcom");
            response.status = 500;
            response.message = err;
        }
        res.status(response.status).json(response.message);
    })
}
module.exports.sitcomsGetAll = function (req, res) {
    console.log("Get All Sitcoms called.")
    const response = {status: 200, message: []}
    let offset = 0;
    let count = 1;
    let maxCount = 2;
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if (count > maxCount) {
        console.log("Count greater Than max.");
        res.status(400).json({error: "Count is greater than max Count."});
    }

    if (isNaN(offset) || isNaN(count)) {
        console.log("offset or count is not a number.");
        res.status(400).json({error: "Count or Offset is not a number."});
    }
    console.log("offset count", offset, count);
    Sitcom.find().skip(offset).limit().exec(function(err,sitcoms){
        if(err){
            console.log("Error:",err);
            response.staus = 500;
            response.message = err;
        }else if(sitcoms){
            console.log("Found sitcoms:",sitcoms)
            response.staus = 200;
            response.message = sitcoms;
        }else if(!sitcoms){
            console.log("No sitcoms found")
            response.staus = 404;
            response.message = "No sitcoms found."
        }
        res.status(response.status).json(response.message);
    })


}


module.exports.sitcomsGetOne = function (req, res) {
    const sitcomId = req.params.sitcomId;
    const response = {status: 200, message: []}
    console.log("Sitcom GetOne called.");
    let valid = mongoose.isValidObjectId(sitcomId);
    if (!valid) {
        res.status(400).json({error: 'Not a Valid id'});
    }
    Sitcom.findById(sitcomId).exec(function (err, sitcom) {
        if (err) {
            console.log("Error finding game");
            response.status = 500;
            response.message = err;
        } else if (!sitcom) {
            console.log("Sitcom id not found");
            response.status = 404;
            response.message = {message: "Sitcom ID not found"}
        } else if (sitcom) {
            console.log("Found sitcom", sitcom);
            response.status = 200;
            response.message = sitcom;
        }
        res.status(response.status).json(response.message);
    })
}

module.exports.sitcomsDeleteOne = function (req, res) {
    const sitcomId = req.params.sitcomId;
    const response = {status: 200, message: []}
    console.log("Sitcom GetOne called.");
    let valid = mongoose.isValidObjectId(sitcomId);
    if (!valid) {
        res.status(400).json({error: 'Not a Valid id'});
    }
    Sitcom.findByIdAndDelete(sitcomId).exec(function (err,sitcom) {
        if (err) {
            console.log("Error finding game");
            response.status = 500;
            response.message = err;
        } else if (sitcom) {
            console.log("Deleted sitcom successfully");
            response.status = 200;
            response.message = {"message":"Sitcom with given id deleted successfully"};
        }else if (sitcom==null) {
            console.log(" Sitcom with id not found.");
            response.status = 200;
            response.message = {"message":"Sitcom with given id already deleted or not found."};
        }
        res.status(response.status).json(response.message);
    })
}

module.exports.sitcomsUpdateOne = function (req, res) {
    const sitcomId = req.params.sitcomId;
    const response = {status: 200, message: []}
    console.log("Sitcom UpdateOne called.");
    let valid = mongoose.isValidObjectId(sitcomId);
    if (!valid) {
        res.status(400).json({error: 'Not a Valid id'});
    }
    Sitcom.findById(sitcomId).exec(function (err, sitcom) {
        if (err) {
            console.log("Error finding sitcom");
            response.status = 500;
            response.message = err;
        } else if (!sitcom) {
            console.log("Error finding sitcom")
            response.status = 400;
            response.message = {"message": "Sitcom Id not found" + sitcomId}
        }
        if (sitcom) {
            console.log("Found sitcom", sitcom);
            _updateSitcom(req, res, sitcom);
        } else {
            res.status(response.status).json(response.message);
        }
    })
}

const _updateSitcom = function (req, res, sitcom) {
    sitcom.title  = req.body.title || sitcom.title;
    sitcom.aired =  req.body.aired || sitcom.aired;
    sitcom.imdbRating  =  req.body.imdbRating || sitcom.imdbRating ;
    sitcom.totalSeasons  =  req.body.totalSeasons || sitcom.totalSeasons;
    sitcom.totalEpisodes  = req.body.totalEpisodes || sitcom.totalEpisodes  ;
    sitcom.production  =   req.body.production || sitcom.production;

    Sitcom.findByIdAndUpdate(sitcom.id,sitcom,function (err, updatedSitcom ) {
        const response = {status: 200, message: []};
        if (err) {
            response.status = 500;
            response.message = err;
        } else {
            response.status = 200;
            response.message = sitcom;
        }
        res.status(response.status).json(response.message);
    })

}