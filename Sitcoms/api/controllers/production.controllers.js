const mongoose = require("mongoose");
const Sitcom = mongoose.model(process.env.SITCOM_MODEL);
require("../data/sitcoms-model")


module.exports.productionAdd = function (req, res) {
    console.log("Production Add called");
    const sitcomId = req.params.sitcomId;
    let valid = mongoose.isValidObjectId(sitcomId);
    if (!valid) {
        res.status(400).json({error: 'Not a Valid id'});
    }
    Sitcom.findById(sitcomId).select("production").exec(function (err, sitcom) {
        const response = {status: 200, message: []};
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
            _addProduction(req, res, sitcom);
        } else {
            res.status(response.status).json(response.message);
        }
    })
}

module.exports.productionGet = function (req, res) {
    console.log("Production Get called");
    const sitcomId = req.params.sitcomId;
    let valid = mongoose.isValidObjectId(sitcomId);
    if (!valid) {
        res.status(400).json({error: 'Not a Valid id'});
    }
    Sitcom.findById(sitcomId).select("production").exec(function (err, sitcom) {
        const response = {status: 200, message: []};
        if (err) {
            console.log("Error finding sitcom");
            response.status = 500;
            response.message = err;
        } else if (!sitcom) {
            console.log("Error finding sitcom")
            response.status = 400;
            response.message = {"message": "Sitcom Id not found" + sitcomId}
        }else if (sitcom) {
            console.log("Found sitcom", sitcom);
            response.status = 200;
            response.message = {"message": sitcom.production}
        }
        res.status(response.status).json(response.message);
    })
}

module.exports.productionDelete = function (req, res) {
    console.log("Production Delete called");
    const sitcomId = req.params.sitcomId;
    let valid = mongoose.isValidObjectId(sitcomId);
    if (!valid) {
        res.status(400).json({error: 'Not a Valid id'});
    }
    Sitcom.findById(sitcomId).select("production").exec(function (err, sitcom) {
        const response = {status: 200, message: []};
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
            _deleteProduction(req,res,sitcom);
        } else {
            res.status(response.status).json(response.message);
        }
    })
}

module.exports.productionUpdate = function (req, res) {
    console.log("Production Update called");
    const sitcomId = req.params.sitcomId;
    let valid = mongoose.isValidObjectId(sitcomId);
    if (!valid) {
        res.status(400).json({error: 'Not a Valid id'});
    }
    Sitcom.findById(sitcomId).select("production").exec(function (err, sitcom) {
        const response = {status: 200, message: []};
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
            _updateProduction(req,res,sitcom);
        } else {
            res.status(response.status).json(response.message);
        }
    })
}

const _addProduction = function (req, res, sitcom) {
    const newProduction = {
        productionTitle: req.body.productionTitle,
        location: req.body.location
    }
    sitcom.production = newProduction;
    Sitcom.findByIdAndUpdate(sitcom.id,sitcom,function (err, updatedSitcom ) {
        const response = {status: 200, message: []};
        if (err) {
            response.status = 500;
            response.message = err;
        } else {
            response.status = 200;
            response.message = sitcom.production;
        }
        res.status(response.status).json(response.message);
    })
}

const _deleteProduction = function (req, res, sitcom) {
    sitcom.production = {}
    Sitcom.findByIdAndUpdate(sitcom.id,sitcom,function (err, deletedSitcom ) {
        const response = {status: 200, message: []};
        if (err) {
            response.status = 500;
            response.message = err;
        } else {
            response.status = 200;
            response.message = {message:"Production deleted successfully."}
        }
        res.status(response.status).json(response.message);
    })
}

const _updateProduction = function (req, res, sitcom) {
    sitcom.production.productionTitle = req.body.productionTitle || sitcom.production.productionTitle;
    sitcom.production.location = req.body.location || sitcom.production.location;

    Sitcom.findByIdAndUpdate(sitcom.id,sitcom,function (err, updatedSitcom ) {
        const response = {status: 200, message: []};
        if (err) {
            response.status = 500;
            response.message = err;
        } else {
            response.status = 200;
            response.message = sitcom.production;
        }
        res.status(response.status).json(response.message);
    })
}
