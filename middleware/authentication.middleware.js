
const jwt = require("jsonwebtoken");


const key = process.env.JWT_SECRET_KEY;


const verifyTokenMiddleware = (req, res, next) => {

    const token = req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) return res.status(403).send("A token is required for authentication");

    try {
        const decoded = jwt.verify(token, key);
        req.user = decoded;        
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }

    return next();

}


module.exports = { verifyTokenMiddleware }
