const jwt = require("jsonwebtoken");
/*
const authMiddleware = async(req, res, next) => {
    try {
        console.log("middleware start")
        const authorization = req.headers.authorization;
        console.log(authorization);

        if(!authorization){
            return res.status(401).json({
                msg: "token is missing"
            });
        }

        const parts = authorization.split(" ");
        const token = parts[1];

        console.log("token: ", token);
    
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
                req.userId = decoded.userId;
                console.log("middleware ended")
                next();

    } catch (error) {
        res.status(400).json({
            msg: "failed from auth side"
        })
    }
}
    */

const authMiddleware = async(req, res, next) => {
        const token = req.header("Authorization")?.replace("Bearer ", "");

    if(!token){
        res.status(403).json({
            msg: "unauthorized access"
        });
        return;
    }
    try {
    console.log("token: ", token);
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
        req.userId = decoded.userId;
        next();
        
} catch (error) {
    console.log(error);
    res.status(400).json({
        msg: "error while setting decoding jwt"
    })
}
}
module.exports = authMiddleware;