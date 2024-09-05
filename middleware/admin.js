// Middleware for handling auth
const jwt=require('jsonwebtoken');
const {jwtpass}=require('../config')
function adminMiddleware(req, res, next) {
    // admin auth logic
    // to check the headers and validate the admin from the admin DB. 
    const token=req.headers.authorization;
    const words=token.split(" ");
    const jtoken=words[1];

    try{
        const decodedvalue=jwt.verify(jtoken,jwtpass);
        if(decodedvalue.username)
        {
            next();
        }
        else{
            res.status(403).jdon({
                msg:"you are not authenticated"
            })
        }
    }
    catch(e)
    {
        res.json({
            msg:"Incorect"
        })
    }

    
}

module.exports = adminMiddleware;