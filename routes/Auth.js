const express = require('express');
const router = express.Router();
const schema = require('../models/auth');
const Joi = require('joi');
const monk = require('monk');
const db = monk(process.env.MONGO_URI);
const users = db.get('users');
const bcrypt = require('bcryptjs');

router.post('/signUp', async (req, res) => {
  try {
    const user = await schema.validateAsync(req.body);
    if (user) {
      // check if email alreay exist
      const isExist = await users.findOne({ email: req.body.email });
      if (isExist) {
        return res.status(422).json({
          message: 'Hey, email already present!',
        });
      }
      // hash the password
      const secPass = await bcrypt.hash(req.body.password, 10);
      user.password = secPass;

      user.created_on = new Date().toLocaleString();
      const savedUser = await users.insert(user);
      return res.status(201).json({
        message: 'User Registration Done!',
        data: savedUser,
      });
    }
    return res.status(422).json({
      message: 'try, to sign up with proper credentials!',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Some Internal Server Error!',
      error: error.message,
    });
  }
});

module.exports = router;
