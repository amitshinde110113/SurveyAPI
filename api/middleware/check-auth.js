const jwt = require('jsonwebtoken');
const { getUser } = require('../data/managers/userModelManager');
const { jwtSecret } = require('../../config')

module.exports = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            throw new Error('Token Missing')
        }
        const token = req.headers.authorization.split(" ")[1];
        const decodes = jwt.verify(token, jwtSecret);
        let currentUser = await getUser({ _id: decodes.userID })
        req.userData = decodes;
        req.currentUser = currentUser
        next();
    } catch (e) {
        const error = new Error(e.message || 'Token verification failed')
        res.status(498).json(error);
    }
};