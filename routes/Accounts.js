const express = require('express')
//const bcrypt = require('bcrypt');
const {Users}=require('../models');
const router=express.Router()

router.get('/', (req, res) => {
    res.send("account server");
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: "User doesn't exist" });
        }
        if (password===user.password) {
            return res.json({ message: 'Login successful' });
        }
        return res.status(401).json({ error: 'Wrong password' });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
  
  router.post('/Register', async (req, res) => {
    const { email, username, password, dateOfBirth, country, gender } = req.body;
    try {
        await Users.create({
        email:email,
        username: username,
        password: password,
        dateOfBirth: dateOfBirth,
        country:country,
        gender:gender
      });
      res.json("success");
    } catch (error) {
      res.status(511).json({ error: "Failed to create user" });
    }
  });
  
module.exports=router