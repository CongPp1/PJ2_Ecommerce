const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const verifyAccessToken = asyncHandler(async (req, res, next) => {
    if (req?.headers?.authorization?.startsWith('Bearer ')) {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.SECRET_KEY, (error, decode) => {
            if (error) {
                return res.status(401).json({ message: 'Invalid accessToken' });
            }
            req.user = decode;
            next();
        })
    } else {
        return res.status(401).json({ message: 'Require Authentication!!!' });
    }
});

module.exports = { verifyAccessToken };