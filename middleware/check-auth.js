const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const KEY = 'DemoKey'


module.exports = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            throw new Error('Token Missing')
        }
        const token = req.headers.authorization.split(" ")[1];
        const decodes = jwt.verify(token, KEY);
        let currentUser = await User.findById(decodes.userID)
        req.userData = decodes;
        req.currentUser = currentUser
        next();
    } catch (e) {
        const error = new Error(e.message || 'Token verification failed')
        res.status(498).json(error);
    }
};