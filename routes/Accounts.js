const express = require('express')
//const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const {Users,ResetPassword}=require('../models');
const router=express.Router()
const session = require('express-session');
const crypto = require('crypto');

router.use(session({
    secret: 'secret', 
    resave: false,
    saveUninitialized: true
}));
router.get('/', (req, res) => {
    res.send("account server");
});

router.post('/validate_username', async (req, res) => {
  const { tmpUsername } = req.body;
  const users = await Users.findAll({});
  let available=true;
  users.forEach(user => {
      if (user.username === tmpUsername) {
        available=false;
      }
  });
  
  return res.json({available:available});
});

router.post('/validate_email', async (req, res) => {
  const { tmpEmail } = req.body;
  const users = await Users.findAll({});
  let available=true;
  users.forEach(user => {
      if (user.email === tmpEmail) {
        available=false;
      }
  });
  
  return res.json({available:available});
});


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: "User doesn't exist" });
        }
        if (password===user.password) {
          req.session.user =user;
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


  function generateOTP() {
    const otpLength = 6;
    return Math.floor(100000 + Math.random() * 900000).toString().substr(0, otpLength);
  }
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'antoinekamel0@gmail.com', // Your Gmail email address
        pass: 'zxhj sjbh nhuw waau' // Your Gmail password
    }
  });
  router.post('/sendOTP', async (req, res) => {
    const { email } = req.body;

    try {
        const otp = generateOTP();
        const mailOptions = {
            from: 'antoinekamel0@gmail.com',
            to: email,
            subject: 'Your OTP for registration',
            text: `Your OTP is: ${otp}`
        };
        await transporter.sendMail(mailOptions);
        console.log('sending otp...')
        res.json({ otp: otp, message: 'OTP sent successfully' });
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ error: 'Failed to send OTP' });
    }
});

function generateUniqueToken() {
  return crypto.randomBytes(20).toString('hex');
}
async function sendResetPasswordEmail(email, token) {
  const mailOptions = {
    from: 'antoinekamel0@gmail.com',
    to: email,
    subject: 'Reset Your Password',
    text: `Click the following link to reset your password: https://example.com/resetpassword/${token}`
  };
  await transporter.sendMail(mailOptions);
}
router.post('/resetpassword', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await Users.findOne({ where: { email : email} });
    if (!user) {
      return res.json( 'User not found' );
    }
    const token = generateUniqueToken();
    await ResetPassword.create({email: email,token: token, userid: user.idusers });
    await sendResetPasswordEmail(email, token);
    return res.json( 'Reset password email sent successfully' );
  } catch (error) {
      return res.status(500).json({ error: 'Internal server error: ' + error.message });
    }
});
router.post('/resetpassword/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;
    if (password != confirmPassword) {
      return res.json( 'The password and confirm password do not match');
    }
    const resetPasswordRecord = await ResetPassword.findOne({ where: { token:token } });
    if (!resetPasswordRecord) {
      return res.json('Invalid or expired token');
    }
    const affectedRows = await Users.update(
      { password: password },
      { where: { email: resetPasswordRecord.email } }
    );
    if (affectedRows > 0) {
      await resetPasswordRecord.destroy();
      return res.json('Password updated successfully');
    }else {
      return res.json('Password not updated');
    }
  } catch (error) {
    return res.json('Internal server error');
  }
});  

module.exports=router