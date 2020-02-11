const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const verifyer = require('../middleware/TokenVerifyer');


router.get('/', (req, res)=>{
    res.send('Users are here');
});

router.post('/register', async (req,res) => {
    let user = new User({
        email:req.body.email,
        password: req.body.password
    });

    try{
        let payload = {subject: user._id}
        let token = jwt.sign(payload, 'secretKey');
        const registeredUser = await user.save();
        res.json({token});
    }catch(err){
        res.json(err);
    }

});

router.post('/login', (req, res)=>{
    
    User.findOne({email: req.body.email}, (err, user)=>{
        try{
            if(!user){
                res.status(401).send('invalid email');
            }else if(user.password !== req.body.password){
                res.status(401).send('invalid password');
            }else{
                let payload = {subject: user._id}
                let token = jwt.sign(payload, 'secretKey');
                res.status(200).send({token});
            }
        }catch(err){
            console.log(err);
        }
    });
});


module.exports = router;