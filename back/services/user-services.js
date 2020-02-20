const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const {
    User
} = require('../models/user');


const registerNewUser = (req, res) => {
    User.find({
            email: req.body.email
        })
        .then(userFound => {
            if (userFound.length >= 1) {
                return res.status(409).send("This user already exists")
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) console.log(err)
                    else {

                        let user = new User({
                            email: req.body.email,
                            password: hash
                        });

                        user.save((error, registeredSuccessfully) => {
                            if (error) console.log(error)
                            else {
                                let payload = {
                                    subject: registeredSuccessfully._id
                                }
                                let token = jwt.sign(payload, "secretKey")
                                res.status(200).send({
                                    token
                                })
                            }
                        })

                    }
                })
            }
        })
}


const loginUser = (req, res) => {
    User.find({
            email: req.body.email
        })
        .then(user => {
            if (user.length < 1) {
                return res.status(401).send("Invalid email")
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json("Auth failed")
                }
                if (result) {
                    let payload = {
                        subject: user._id
                    }
                    let token = jwt.sign(payload, "secretKey")
                    return res.status(200).send({
                        token
                    })
                }
                res.status(401).send("Auth failed")
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
}



module.exports = {
    registerNewUser,
    loginUser
}