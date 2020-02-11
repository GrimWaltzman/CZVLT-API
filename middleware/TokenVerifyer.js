module.exports = {
   verifyToken = (req, res, next)=>{ //Token verification, unused right now, will use it later, probably for comments and stuff
    if(!req.headers.authorization){
       return res.status(401).send('Unauthorized request');
    }
    let token = req.headers.authorization.split(' ')[1]
 
    if (token === 'null'){
       return res.status(401).send('Unauthorized request');
    }

    let payload = jwt.verify(token, 'secretKey');
    if(!payload){
        return res.status(401).send('Unauthorized request');
    }

    req.userId = payload.subject;
    console.log('token is valid');
    next();
 }
 
}