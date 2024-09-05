
const jwt=require('jsonwebtoken');
const {jwtpass}=require('../config')
function userMiddleware(req, res, next) {
    //  user auth logic
    // to check the headers and validate the user from the user DB. 
    const token=req.headers.authorization;
    const word=token.split(" ");
    const jtoken=word[1];

    try{
        const decoded=jwt.verify(jtoken,jwtpass)
        if(decoded.username)
        {
            next();
        }
        else{
            res.status(403).json({
                msg:"you are not authenticated"
            })
        }

    }
    catch(e)
    {
        res.json({
            msg:"incorrect inputs"
        })
    }


}

module.exports = userMiddleware;