const express = require('express')
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const { Users, ResetPassword, VerificationRequest, Rooms, sequelize } = require('../models');
const router = express.Router()
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
// const API_URL = '192.168.1.30:3001';
const API_URL = '192.168.0.102:3000';
const multiparty = require('multiparty');
const path = require('path');
const fs = require('fs');

//file uploads
const multer = require('multer');
const { where } = require('sequelize');

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Save uploaded files to 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original filename
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // Limit file size to 10MB (adjust as needed)
  }
});

router.get('/', (req, res) => {
  res.send("account server");
});

router.post('/ban_user', async (req, res) => {
  try {
    const { idusers, reason } = req.body;
    if(!reason){
      return res.status(404).json({ message: 'Please provide a reason' });
    }
    const user = await Users.findByPk(idusers);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await user.update({ isbanned: true, rankpoints: 0, rankid: 1, imageurl: 'https://firebasestorage.googleapis.com/v0/b/chatfuze-e6658.appspot.com/o/ChatFuze%2FProfile%2Fbanned_user_pfp.png?alt=media&token=d56fc241-27f5-4e66-a403-a6eef744b350' });

    if (user.email) {
      const mailOptions = {
        from: 'ralphdaher6@gmail.com',
        to: user.email,
        subject: 'ChatFuze Account Banned',
        text: reason
      };
      await transporter.sendMail(mailOptions);
    } else {
      return res.status(400).json({ message: 'User email not found' });
    }
    return res.status(200).json({ message: 'User has been successfully banned' });
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'An error occurred while banning the user' });
  }
});

router.post('/unban_user', async (req, res) => {
  try {
    const { idusers, reason } = req.body;
    if(!reason){
      return res.status(404).json({ message: 'Please provide a reason' });
    }
    const user = await Users.findByPk(idusers);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await user.update({ isbanned: false, imageurl: null });

    if (user.email) {
      const mailOptions = {
        from: 'ralphdaher6@gmail.com',
        to: user.email,
        subject: 'ChatFuze Account Unbanned',
        text: reason
      };
      await transporter.sendMail(mailOptions);
    } else {
      return res.status(400).json({ message: 'User email not found' });
    }
    return res.status(200).json({ message: 'User has been successfully unbanned' });
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'An error occurred while unbanning the user' });
  }
});

router.post('/removeprofilepicture', async (req, res) => {
  try {
    const { idusers } = req.body;
    const user = await Users.findByPk(idusers);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await user.update({imageurl:null})
    const mailOptions = {
      from: 'ralphdaher6@gmail.com',
      to: user.email,
      subject: 'ChatFuze Profile Picture Removed',
      text: 'After careful review done by the admins, we decided to remove your profile picture because it was deemed as inappropriate.'
    };
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: 'Profile Picture has been removed successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'An error occurred while removing profile picture' });
  }
});


router.post('/validate_username', async (req, res) => {
  try {
    const { tmpUsername } = req.body;
    if (typeof tmpUsername != 'string') {
      return res.status(400).json({ error: "Invalid username format." });
    }
    const existingUser = await Users.findOne({ where: { username: tmpUsername } });
    const available = !existingUser;
    return res.json({ available });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error." });
  }
});


router.post('/validate_email', async (req, res) => {
  try {
    const { tmpEmail } = req.body;
    const existingUser = await Users.findOne({ where: { email: tmpEmail } });
    const available = !existingUser;
    return res.json({ available });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error." });
  }
});


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || typeof email !== 'string' || !password || typeof password !== 'string') {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    tmpEmail = email.toLowerCase()
    const user = await Users.findOne({ where: { email: tmpEmail } });
    if (!user) {
      return res.status(404).json({ error: "User doesn't exist" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      let id = user.idusers;
      let username = user.username;
      const token = jwt.sign({ username }, 'your_secret_key');
      return res.json({ message: 'Login successful', token, id });
    }
    else {
      return res.status(401).json({ error: 'Wrong password' });
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Internal server error' });
  }
});
router.get('/totalrooms', async (req, res) => {
  try {
    const totalRooms = await Rooms.count();

    return res.json(totalRooms);
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});
router.get('/getNonVerifiedUsers', async (req, res) => {
  try {
    const users = await Users.findAll({ where: { verified: false } });

    return res.json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});
router.get('/getProbablyVerifiedUsers', async (req, res) => {
  try {
    const users = await sequelize.query(
      `SELECT verificationrequests.*, users.idusers, users.email, users.username, users.dateOfBirth, users.country, users.gender
     FROM verificationrequests, users
     WHERE verificationrequests.userid = users.idusers
     AND users.verified = false;`,
      { type: sequelize.QueryTypes.SELECT }
    );
    return res.json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/checkIdVerification', async (req, res) => {
  const { userid } = req.body;
  try {
    if (!userid) {
      return res.status(405).send('All fields are required');
    }
    const IDVerificationRequest = await VerificationRequest.findOne({ where: { userid: userid } })

    const user = await Users.findOne({ where: { idusers: userid } })

    if (IDVerificationRequest) {
      return res.status(200).json({ hasIDVerificationRequest: true, userAlreadyVerified: user.verified });
    } else {
      return res.status(200).json({ hasIDVerificationRequest: false, userAlreadyVerified: user.verified });
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Internal server error' });
  }
})

router.post('/applyForIDVerification', async (req, res) => {
  const { userid, imageURL } = req.body;
  try {
    if (!userid, !imageURL) {
      return res.status(405).send('All fields are required');
    }
    const verificationRequest = await VerificationRequest.create({
      imagepath: imageURL,
      userid
    });

    if (verificationRequest) {
      return res.status(200).json({ message: 'ID verification request created successfully' });
    } else {
      return res.status(400).json({ error: 'Failed to create an ID verification request' });
    }

  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Internal server error' });
  }
})

router.post('/verify_user', async (req, res) => {
  const { idverificationrequests, imagepath, userid, accepted } = req.body;
  try {
    const [numAffectedRows] = await Users.update(
      { verified: accepted },
      { where: { idusers: userid } }
    );
    if (numAffectedRows === 1) {
      const verificationRequest = await VerificationRequest.findByPk(idverificationrequests);
      const user = await Users.findOne({ where: { idusers: userid } });
      const mailOptions = {
        from: 'ralphdaher6@gmail.com',
        to: user.email,
        subject: 'ID Verification',
        text: accepted ? `Your account has been succesfully verified!` : `Your account was sadly not verified due to conflits in your id and the info you provided when creating your account.`
      };
      await transporter.sendMail(mailOptions);

      if (!verificationRequest) {
        return res.status(404).send('User not found');
      }
      // Delete the user
      await verificationRequest.destroy();

      return res.json('User has been updated.');
    } else {
      return res.json('User has not been updated.');
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }

})

router.post('/register', async (req, res) => {
  const { imageURL, email, username, password, dateOfBirth, country, gender } = req.body;
  if (!imageURL || !email || !username || !password || !dateOfBirth || !country || !gender) {
    return res.status(400).json({ error: "All fields are required" });
  }
  if (password.length < 8) {
    return res.status(400).json({ error: 'Password should be at least 8 characters long' });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await Users.create({
      email: email.toLowerCase(),
      username,
      password: hashedPassword,
      dateOfBirth,
      country,
      gender
    });
    let id = user.idusers;
    let username1 = user.username;
    const token = jwt.sign({ username1 }, 'your_secret_key', { expiresIn: '24h' });

    // const imagepath = req.file.filename;
    const userid = id;
    const verificationRequest = await VerificationRequest.create({
      imagepath: imageURL,
      userid
    });

    return res.status(200).json({ message: 'success', token, id });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: "Failed to create user" });
  }
});


function generateOTP() {
  const otpLength = 6;
  return Math.floor(100000 + Math.random() * 900000).toString().substr(0, otpLength);
}


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ralphdaher6@gmail.com', // Your Gmail email address
    pass: 'bxgo qxdn rwts jwdb' // Your Gmail password
  },
  tls: {
    rejectUnauthorized: false
  }
});


router.post('/sendOTP', async (req, res) => {
  const { email } = req.body;
  try {
    const otp = generateOTP();
    const mailOptions = {
      from: 'ralphdaher6@gmail.com',
      to: email.toLowerCase(),
      subject: 'Your OTP for registration',
      text: `Your OTP is: ${otp}`
    };
    await transporter.sendMail(mailOptions);
    res.json({ otp: otp, message: 'OTP sent successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send OTP' });
  }
});


function generateUniqueToken() {
  return crypto.randomBytes(20).toString('hex');
}


async function sendResetPasswordEmail(email, token) {
  const mailOptions = {
    from: 'ralphdaher6@gmail.com',
    to: email,
    subject: 'Reset Your Password',
    text: `Click the following link to reset your password: http://${API_URL}/resetpassword/${token}`
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw error;
  }

}

router.post('/resetpassword', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
    const user = await Users.findOne({ where: { email: email } });
    if (!user) {
      return res.status(500).json({ error: 'User not found' });
    }
    const token = generateUniqueToken();
    await ResetPassword.create({ email: email, token: token, userid: user.idusers });
    await sendResetPasswordEmail(email, token);
    // console.log(`http://192.168.148.161:3000/resetpassword/${token}`)
    return res.status(200).json({ message: 'Reset password email sent successfully' });
  } catch (error) {
    console.log(error)
    return res.status(501).json({ error: 'Internal server error: ' + error.message });
  }
});


router.post('/resetpassword/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;
    if (password.length < 8) {
      return res.status(400).json({ error: 'Password should be at least 8 characters long' });
    }
    if (password != confirmPassword) {
      return res.status(404).json({ error: 'The password and confirm password do not match' });
    }
    const resetPasswordRecord = await ResetPassword.findOne({ where: { token: token } });
    if (resetPasswordRecord == null) {
      return res.status(404).json({ error: 'Invalid or expired token' });
    }
    const hashedNewPassword = await bcrypt.hash(password, 10);
    const affectedRows = await Users.update(
      { password: hashedNewPassword },
      { where: { email: resetPasswordRecord.email } }
    );
    if (affectedRows > 0) {
      await resetPasswordRecord.destroy();
      return res.status(200).json({ message: 'Password updated successfully' });
    } else {
      return res.status(500)({ error: 'Password not updated' });
    }
  } catch (error) {
    return res.status(500)({ error: 'Internal server error' });
  }
});


module.exports = router