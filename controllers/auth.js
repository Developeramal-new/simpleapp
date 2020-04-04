const express = require('express')

const router = express.Router()

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const user = require('../models/user')
const check = require('../middleware/check-auth')

router.post("/users", check, (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(hash => {
      const post = new user({
          userid : req.body.userid,
          password : hash
      });
      post.save().then(result => {
          console.log(result)
          res.status(201).json({
            message: 'User created',
            result: result
          });
      })
      .catch(err => {
          res.status(500).json({
              error: err
          })
      })
    })
  
})
router.post("/login", (req, res, next) => {
    let perc = null;
  user.findOne({userid: req.body.userid}).then(per => {
      if(!per){
          return res.status(401).json({
              message : "User not found"
          })
      }
      perc = per
      return bcrypt.compare(req.body.password, per.password)
  })
  .then(result => {
      if(!result){
          return res.status(401).json({
              message : "Wrong Password"
          })
      }
      const token = jwt.sign(
          {
              userid : perc.userid,
              id: perc._id
          },
          'secret_code',
          {
              expiresIn: "1h"
          }
      )
      res.status(200).json(
          { token: token }
      )
  })
  .catch(err => {
      return res.status(401).json({
          message : "Error in login"
      })
  })
});
router.get("/users", (req, res, next) => {
  user.find().then(doc => {
      console.log(doc)
      res.status(200).json({
          message: 'Users found successfully',
          users: doc
        });
  })
  
});

module.exports = router;