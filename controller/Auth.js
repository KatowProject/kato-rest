const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.token;
        jwt.verify(token, process.env.SECRET);
    } catch (err) {
        res.status(401).json({
            message: 'Token is Invalid'
        });
    }
}