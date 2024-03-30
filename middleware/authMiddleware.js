const jwt = require('jsonwebtoken');
const {secret} = require('../config.js');

// Function for authorization token validation
function authMiddleware(req, res, next) {
    if (req.method === 'OPTIONS') {
        next();
    }
    try {
        
        const token = req.headers.authorization.split(' ')[1] // Get the second part of bearer token
        if(!token) {
            return res.status(401).json({message:'Unauthorized user'});
        }
        const data = jwt.verify(token, secret);
        req.user = data;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({message: 'Unauthorized user'});
    }
}

module.exports = authMiddleware;