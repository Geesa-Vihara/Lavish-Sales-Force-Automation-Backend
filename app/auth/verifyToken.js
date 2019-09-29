let jwt = require('jsonwebtoken');
const config = require('../../config/database.config');

const verifyToken=function(req,res,next){
    var token=req.headers['authorization'] || req.params.token;
    if(token.startsWith('Bearer')) {        
        token = token.slice(6, token.length);
      }
    if(!token){
        return res.status(404).send({message:"No token available"});
    }else{
        jwt.verify(token,config.secretOrKey,function(err,decoded){
            if(err){
                return res.status(404).send({message:"Failed to authenticate token"});
        
            }
            req.decoded=decoded;
            next();
            
        })
    }

}
module.exports=verifyToken;