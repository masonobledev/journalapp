// let express = require("express");
//let router  = express.Router();
// let sequelize = require("../db");
// let User = sequelize.import("../models/user.js");

//****OR*****/

const router = require('express').Router();
const User = require('../db').import('../models/user'); 
//10.2
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

/* ***********************************

*** USER SIGNUP ***

************************************** */
router.post('/create', function (req, res) {

    User.create({
        // email: "user@email.com",
        // password: "password1234"

        //dynamic code update of above
        email: req.body.user.email,
        password: bcrypt.hashSync(req.body.user.password, 13)
    })
    .then(
        function createSuccess(user) {
            //10.3
            let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});
            
            //9.2.5 
            res.json({
                user: user,

                //10.3
                message: 'User successfully created!',
                sessionToken: token
            });
            //res.send("This is our user/create endpoint!")
        }
    )
    //code from 9.2.6
    .catch(err => res.status(500).json({ error: err}))
});

//9.3.2
router.post('/login', function(req, res) {

    //9.3.3
    User.findOne({
        where: {
            email: req.body.user.email
        }
    })
    //9.3.4
    .then(function loginSuccess(user) {
        //9.3.6
        if (user) {
            
            
            res.status(200).json({
                user: user
            })
        
        } else {

            res.status(500).json({ error: 'User does not exist.'})
        
        }
    })
    .catch(err => res.status(500).json({ error: err}))
});

module.exports = router;