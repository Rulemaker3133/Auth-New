const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const {
    getUsers,
    register,
    login
} = require('./controller.js');

router.get('/users', getUsers);
router.post('/register', [
    check('username', "User name can't be empty").notEmpty(),
    check('password', "Password needs to be in between 4-10 symbols").isLength({min: 4, max: 10})
], register);
router.post('/login', login);

module.exports = router;