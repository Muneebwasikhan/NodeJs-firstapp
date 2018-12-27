const express = require('express');
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//load user modal
const User = require("../../Model/user");
const keys = require("../../config/keys");

//route         get /api/users/test
//description   tests users route
//access        public
router.get('/test',(req,res) => res.json({name: "muneeb",status: "users works" }));


//route         post /api/users/register
//description   Regiter user
//access        public
router.post('/register',(req,res) => {
  User.findOne({email: req.body.email})
    .then(user => {
      if(user){
        return res.status(400).json({email: "Email already exits"})
      }else{

        const avatar = gravatar.url(req.body.email,{
          s: '200', //size
          r: 'pg', //rating
          d: 'mm', //default 
        })
        const newUser = new User({
          email: req.body.name,
          email: req.body.email,
          avatar,
          password: req.body.password
        });

        bcrypt.genSalt(10,(err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            
            if(err) throw err;
            newUser.password = hash;
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
              
          })
        })

      }
    })
});

//route         post /api/users/login
//description   login user
//access        public
router.post(("/login"),(req,res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({email})
    .then(user => {
      if(!user){
        return res.status(404).json({email: "user not foud"});
       
      }

      bcrypt.compare(password, user.password).then(isMatch => {
        if(isMatch){
          // res.send({status:"success",...user._doc});
          const payload = {id: user.id, name: user.name, avatar: user.avatar};

          //user matched
          //sign token
  
          jwt.sign(payload,
            keys.secrectOrKey,
            {expiresIn: 3600},
            (err,token) => {
              res.send({
                success: true,
                token: "bearer " + token 
              })
            });
        }
        else{
          return res.status(400).json({password: "invalid password"});
        }
      })

    })



})



module.exports = router;