const express = require('express')
//const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
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

  // Function to generate OTP
  function generateOTP() {
    const otpLength = 6;
    return Math.floor(100000 + Math.random() * 900000).toString().substr(0, otpLength);
  }

  // Configure nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ralphdaher6@gmail.com', // Your Gmail email address
        pass: 'bxgo qxdn rwts jwdb' // Your Gmail password
    }
  });

    // New route to send OTP to email and return it back to frontend
  router.post('/sendOTP', async (req, res) => {
    const { email } = req.body;

    try {
        // Generate OTP
        const otp = generateOTP();

        // Send OTP to email
        const mailOptions = {
            from: 'ralphdaher6@gmail.com',
            to: email,
            subject: 'Your OTP for registration',
            text: `Your OTP is: ${otp}`
        };

        await transporter.sendMail(mailOptions);

        console.log('sending otp...')

        // Send OTP back to frontend
        res.json({ otp: otp, message: 'OTP sent successfully' });
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ error: 'Failed to send OTP' });
    }
});
  
module.exports=router