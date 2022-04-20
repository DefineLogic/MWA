require("../data/users-model")
const res = require("express/lib/response");
const mongoose = require("mongoose");
const User = mongoose.model(process.env.USER_MODEL);
const bcrypt = require("bcrypt")

module.exports.addUser = function(req, res) {
    console.log("User AddOne request");
    const response = { status: 201, message: {} }
    if (req && req.body && req.body.username && req.body.password) {
        bcrypt.genSalt(process.env.SALT_ROUNDS, (err, salt) => _generateHashedPasswordAndCreateUser(req, res, response, err, salt))
    } else {
        response.status = 400;
        response.message = { message: "Bad Request." }
        _sendResponse(res, response);
    }
}

_generateHashedPasswordAndCreateUser = function(req, res, response, err, salt) {
    if (err) {
        console.log("Error::", err)
        response.status = 500;
        response.message = err.message;
        _sendResponse(res, response);
    } else {
        bcrypt.hash(req.body.password, salt, (err, hashedPassword) => _createUser(req, res, response, err, hashedPassword))
    }
}

_createUser = function(req, res, response, err, hashedPassword) {
    if (err) {
        console.log("Errorrr:", err)
        response.status = 500;
        response.message = err.message;
        _sendResponse(res, response);
    } else {
        const newUser = {
            name: req.body.name,
            username: req.body.username,
            // password: req.body.password,
            password: hashedPassword
        };
        const response = { status: 201, message: [] };
        User.create(newUser)
            .then((data) => {
                _handleSuccess(data, response)
            })
            .catch((err) => {
                _handleError(err, response)
            })
            .finally(() => _sendResponse(res, response));
    }
}


module.exports.loginUser = function(req, res) {
    console.log("Login user called.")
    let username = req.body.username;
    let password = req.body.password;

}

_checkUserPassword = function(user, req, response) {
    if (!user) {
        console.log("Username not in the database;")
        response.status(401);
        response.message = "Unauthorized.";
    }
    if (bcrypt.compareSync(req.body.password, user.password)) {
        console.log("Login done.");
        response.status(401);
        response.message = "success";
    } else {
        console.log("Password Incorrect done.");
        response.status(401);
        response.message = "Unauthorized.";
    }
}


_sendResponse = function(res, response) {
    res.status(response.status).json(response.message);
}
_handleSuccess = function(message, response) {
    response.message = message;
}
_handleError = function(err, response) {
    response.status = 500;
    response.message = err;
}