const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const config = require(__config_dir+`/app.config.json`);
const helper = require(__class_dir + '/helper.class.js');

class _authCheck{
    verifyRefreshBodyField(req, res, next){
        if (req.body && req.body.refresh_token) {
            return next();
        } else {
            return res.status(400).send({error: 'need to pass refresh_token field'});
        }
    };
    
    validRefreshNeeded(req, res, next){
        let b = Buffer.from(req.body.refresh_token, 'base64');
        let refresh_token = b.toString();
        let hash = '';//crypto.createHmac('sha512', req.jwt.refreshKey).update(req.jwt.userId + secret).digest("base64");
        if (hash === refresh_token) {
            req.body = req.jwt;
            return next();
        } else {
            return res.status(400).send({error: 'Invalid refresh token'});
        }
    };
    
    
    validJWTNeeded(req, res, next){
        if (req.headers['authorization']) {
            try {
                let authorization = req.headers['authorization'].split(' ');
                if (authorization[0] !== 'Bearer') {
                    return res.status(401).send();
                } else {
                    req.jwt = jwt.verify(authorization[1], config.jwt.keys);
                    console.log(req.jwt)
                    return next();
                }
    
            } catch (err) {
                return helper.sendResponse(res, {status:false,message:'Unauthorization'},401);
            }
        } else {
            return helper.sendResponse(res,  {status:false,message:'Unauthorization'},401);
        }
    };
}
module.exports = new _authCheck();