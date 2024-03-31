const express = require('express')
//const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const {Users,ResetPassword,VerificationRequest}=require('../models');
const router=express.Router()
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
// const API_URL = '192.168.1.30:3001';
const API_URL = '192.168.64.161:3000';
const multiparty = require('multiparty');
const path = require('path');
const fs = require('fs');

//file uploads
const multer = require('multer');

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


router.post('/validate_username', async (req, res) => {
  try {
    const { tmpUsername } = req.body;
    if (typeof tmpUsername != 'string' ) {
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
            const user = await Users.findOne({ where: { email } });
            if (!user) {
                return res.status(404).json({ error: "User doesn't exist" });
            }
            if (password===user.password) {
                let id=user.idusers;
                let username=user.username;
                const token = jwt.sign({ username }, 'your_secret_key');
                return res.json({ message: 'Login successful',token,id });
            }
            else {
              return res.status(401).json({ error: 'Wrong password' });
          }
      } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/idphoto', upload.single('image'), async (req, res) => {
  // console.log(req)
  // let form = new multiparty.Form();

  // form.parse(req, function(err, fields, files) {
  //    Object.keys(fields).forEach(function(name) {
  //         console.log('got field named ' + name);
  //     });
  // });

  console.log(req.body)


  return res.status(509).json({ message: 'success' });
})

router.post('/verify_user', async (req, res) => {
  const { idverificationrequests, imagepath, userid, accepted } = req.body;
    try {
      const [numAffectedRows] = await Users.update(
          { verified: accepted },
          { where: { idusers: userid } }
      );
      if (numAffectedRows === 1) {

        const filePath = path.join("uploads", imagepath);
        fs.unlinkSync(filePath);
        // Find the user by ID
        const verificationRequest = await VerificationRequest.findByPk(idverificationrequests);

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
      console.log(error)
      return res.status(500).json({ error: 'Internal server error' });
  }
  
})

router.post('/register', upload.single('image'), async (req, res) => {
  const { email, username, password, dateOfBirth, country, gender } = req.body;
  if (!email || !username || !password || !dateOfBirth || !country || !gender) {
    console.log(req.body)
      return res.status(400).json({ error: "All fields are required" });
  }
  if (password.length < 8) {
    return res.status(400).json({ error: 'Password should be at least 8 characters long' });
}
    try {
        const user = await Users.create({
            email,
            username,
            password,
            dateOfBirth,
            country,
            gender
        });
        let id=user.idusers;
        let username1=user.username;
        const token = jwt.sign({ username1 }, 'your_secret_key', { expiresIn: '24h' });

        const imagepath = req.file.filename;
        const userid = id;
        const verificationRequest = await VerificationRequest.create({
          imagepath,
          userid
        });

        return res.status(200).json({ message: 'success',token,id });
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
            to: email,
            subject: 'Your OTP for registration',
            text: `Your OTP is: ${otp}`
        };
        await transporter.sendMail(mailOptions);
        // console.log(otp)
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
    const user = await Users.findOne({ where: { email : email} });
    if (!user) {
      return res.status(500).json({ error: 'User not found' });
    }
    const token = generateUniqueToken();
    await ResetPassword.create({email: email,token: token, userid: user.idusers });
    console.log('here')
    await sendResetPasswordEmail(email, token);
    // console.log(`http://192.168.148.161:3000/resetpassword/${token}`)
    return res.status(200).json({message: 'Reset password email sent successfully' });
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
      return res.status(404).json( {error: 'The password and confirm password do not match'});
    }
    const resetPasswordRecord = await ResetPassword.findOne({ where: { token:token } });
    if (resetPasswordRecord==null) {
      return res.status(404).json({ error: 'Invalid or expired token'});
    }
    const affectedRows = await Users.update(
      { password: password },
      { where: { email: resetPasswordRecord.email } }
    );
    if (affectedRows > 0) {
      await resetPasswordRecord.destroy();
      return res.status(200).json({message: 'Password updated successfully'});
    }else {
      return res.status(500)({error: 'Password not updated'});
    }
  } catch (error) {
    return res.status(500)({error: 'Internal server error'});
  }
});  


module.exports=router