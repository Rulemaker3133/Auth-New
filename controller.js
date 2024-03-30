const Role = require('./models/role.model.js');
const User = require('./models/user.model.js');
const bcrypt = require('bcryptjs');
const { secret } = require('./config.js'); // extracting secret value from the secret object
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

const generateToken = (id, role) => { // generate token for user
    const payload = {
        id,
        role
    }
    return jwt.sign(payload, secret, { expiresIn: '24h' });

}

const getUsers = async (req, res) => { // get all users list
    try {   
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.log(error);
        res.status(400).json({message: 'Error while trying find users'});
    }

}

const register = async (req, res) => { // register new user
    try {
        const errors = validationResult(req);  
        if (!errors.isEmpty()) {
            return res.status(400).json({message: "Registration error", errors})
        }
        const {username, password} = req.body;
        const user = await User.findOne({username});
        if (user) {
            res.status(400).json({message: 'User is already existing'});
        }
        const userRole = await Role.findOne({name: "admin"});
        const hashPassword = bcrypt.hashSync(password, 7);
        const newUser = new User({username, password: hashPassword, role: [userRole.name]});
        await newUser.save();
        res.status(200).json(newUser);
    } catch (error) {
        console.log(error);
        res.status(400).send({message: 'Error while trying create user'});
    } 
}

const login = async (req, res) => { // login user
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});
        if (!user) {
            res.status(400).json({message: 'There is no such user'});
        }
        const validPassword = bcrypt.compareSync(password, user.password);
        if(!validPassword) { 
            res.status(400).json({message: 'Incorrect password'});
        }
        const token = generateToken(user._id, user.role);
        res.json({token});
    } catch (error) {
        console.log(error);
        res.status(400).json({message: 'Error while trying login'});
    }
}

module.exports = {
    getUsers,
    register,
    login
};
