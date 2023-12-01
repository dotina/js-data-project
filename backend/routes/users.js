// This file contains all API endpoints for interacting with the "users" collection in the MongoDB database
const express = require('express');
const router = express.Router();
// import bcrypt for comparing password to hashed password
const bcrypt = require('bcrypt');
// import JWT (JSON Web Token) to create a web token to the user after a successful login - allows user to make API calls
const jwt = require('jsonwebtoken');

// import users data model schema
const Users = require('../models/users');
const saltRounds = 10; // or another number you prefer

const org = process.env.ORG_ID;

// API endpoint to handle login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Users.findOne({ username: username, org: org });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const payload = {
      name: user.name,
      role: user.role
    };

    // token expires in 30 days. This is not best security practice but still demonstrates how JWT work
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json('Server error '+err);
  }
});

// API create users
router.post('/create', async (req, res) => {
  const usersCreation = new Users({
    username: req.body.username,
    password: await bcrypt.hash(req.body.password, saltRounds),
    role: req.body.role,
    org: org
  });

  try {
   const dd = await usersCreation.save();
   res.json(dd)
  } catch (err) {
    res.status(500).json('Server error '+err);
  }
});

// get all users view
router.get('/', async (req,res) =>{
  Users.find()
  .then(data => res.send(data))
  .catch(err => res.json(err))
})

module.exports = router;
