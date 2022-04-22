const jwt = require("jsonwebtoken")
const util = require("util")


// module.exports.authenticateCallback = function(req, res, next) {
//     const response = {
//         status: 403,
//         message: "No Token Provided"
//     }
//     const headerExists = req.headers.authorization;
//     if (headerExists) {
//         const token = req.headers.authorization.split(" ")[1];
//         // jwt.verify(token, process.env.JWT_PASSWORD)
//         //     .then(() => { next(); })
//         //     .catch(err => _invalidAuthorisationToken(err, response))
//         jwt.verify(token, process.env.JWT_PASSWORD, function(err, result) {
//             if (err) {
//                 _invalidAuthorisationToken(err, response);
//             } else {
//                 next();
//             }
//         })
//     } else {
//         _sendResponse(res, response);
//     }
// }

module.exports.authenticate = function(req, res, next) {
    const response = {
        status: 403,
        message: "No Token Provided"
    }
    const headerExists = req.headers.authorization;
    if (headerExists) {
        const token = req.headers.authorization.split(" ")[1];
        const jwtVerifyPromise = util.promisify(jwt.verify, { context: jwt });
        jwtVerifyPromise(token, process.env.JWT_PASSWORD)
            .then(() => { next(); })
            .catch(err => _invalidAuthorisationToken(err, res, response))
    } else {
        _sendResponse(res, response);
    }
}

// module.exports.authenticateAysncUse = async function(req, res, next) {
//     try {
//         const response = {
//             status: 403,
//             message: "No Token Provided"
//         }
//         const headerExists = req.headers.authorization;
//         if (headerExists) {
//             const token = req.headers.authorization.split(" ")[1];
//             await jwt.verify(token, process.env.JWT_PASSWORD)
//             if (err) {} else {
//                 next();
//             }
//         } else {
//             _sendResponse(res, response);
//         }
//     } catch (err) {
//         _invalidAuthorisationToken(err, response);

//     }
// }

_invalidAuthorisationToken = function(error, res, response) {
    console.log(error);
    response.status = 401;
    response.message = "Unauthorized."
    this._sendResponse(res, response);
}

_sendResponse = function(res, response) {
    res.status(response.status).json(response.message);
}