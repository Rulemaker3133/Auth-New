const jwt = require('jsonwebtoken');
const {secret} = require('../config.js');

// Function for authorization by role
function roleMiddleware(roles) {
    return function(req, res, next) {
        if (req.method === 'OPTIONS') {
            next();
        }
        try {
            const token = req.headers.authorization.split(' ')[1] // Get the second part of bearer token
            console.log(token);
            if(!token) {
                return res.status(401).json({message:'Unauthorized user'});
            }
            const {role: userRoles} = jwt.verify(token, secret);
            let hasRole = false;
            for (let i = 0; i < userRoles.length; i++) {
                console.log(userRoles[i]);
                if (roles.includes(userRoles[i])) {
                    hasRole = true;
                }
            } 
            if (!hasRole) {
                return res.status(401).json({message:'Unauthorized access'});
            }
            next();
        } catch (error) {
            console.log(error);
            return res.status(401).json({message: 'Unauthorized user'});
        }
    }
}

module.exports = roleMiddleware;
