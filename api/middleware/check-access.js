module.exports = async (req, res, next) => {
    try {
        if (req.currentUser.role !== 'ADMIN') {
            throw new Error('You are not authorized')
        }
        next();
    } catch (e) {
        const error = new Error(e.message)
        res.status(498).json(error);
    }
};