const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

function verifyToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        console.log("token", req)
        return res.status(403).json({ message: 'Failed', data: "none" });
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            console.error("jwt----",err)
            return res.status(401).json({ message: 'Failed' });
        }
        req.userId = decoded.userId;
        next();
    });
}


module.exports = verifyToken;