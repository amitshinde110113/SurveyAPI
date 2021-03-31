var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const KEY = 'DemoKey'
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel')
const mongoose = require('mongoose')



/*  users signup. */
router.post('/signup', async function (req, res, next) {
  const users = await UserModel.find().count()
  const hash = await bcrypt.hash(req.body.password, 10)
  if (!users) {
    req.body.role = 'ADMIN'
    getUser(req, hash).save().then(async (result) => {
      res.status(201).json({
        message: 'Registered successfully.',
        user: result,
      });
    }).catch(err => {
       
      res.status(400).json(err);
    });
  } else {
    UserModel.find({ email: req.body.email }).exec().then(async (result) => {

      if (result.length >= 1) {
        res.status(403).json({ message: 'Already exist.' })
      } else {

        getUser(req, hash).save().then(async (result) => {
          res.status(201).json({
            message: 'Registered successfully.',
            user: result,
          });
        }).catch(err => {
           
          res.status(400).json(err);
        });
      }
    });

  }

});









/*  users login. */
router.post('/login', async function (req, res, next) {
  UserModel.findOne({ email: req.body.email }).exec()
    .then(async (result) => {
      const match = await bcrypt.compare(req.body.password, result.password);
      if (match) {
        const token = jwt.sign({ email: result.email, userID: result._id, type: result.type }, KEY,
          {
            expiresIn: "1d"
          });
        result['loginStatus'] = 'Success';
        res.status(200).json({ user: result, token: token, loginStatus: 'Success' });
      } else {
        res.status(401).json({ message: 'Please enter valid credentials.' })
      }
    })
    .catch(err => {
       
      res.status(404).json(err);
    });
});






const getUser = (req, hash,) => {
  const user = new UserModel({
    _id: new mongoose.Types.ObjectId(),
    email: req.body.email,
    name: req.body.name,
    password: hash,
    role: req.body.role || 'USER'
  });
  return user;
}

module.exports = router;
