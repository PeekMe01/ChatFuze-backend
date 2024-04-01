const express = require('express');
const app = express();
const cors = require("cors");
const path = require('path');

app.use(express.json());
app.use(cors());

const db = require('./models');

const expoAppIdentifier = "chatfuze-frontend";
const restrictAccess = (req, res, next) => {
  const requestIdentifier = req.headers['x-expo-app'];

  if (requestIdentifier && requestIdentifier === expoAppIdentifier) {
    next();
  } else {
    res.status(403).send('Access Forbidden');
  }
};

app.use(restrictAccess);

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Routers
const accountsRouter=require('./routes/Accounts')
app.use('/accounts',accountsRouter);

const leaderboardRouter=require('./routes/Leaderboard')
app.use('/leaderboard',leaderboardRouter);

const messagesRouter=require('./routes/Messages')
app.use('/messages',messagesRouter);

const profilesettingsRouter=require('./routes/ProfileSettings')
app.use('/settings',profilesettingsRouter);

const feedbacksRouter=require('./routes/Feedbacks')
app.use('/feedbacks',feedbacksRouter);
const reportsRouter=require('./routes/Reports')
app.use('/reports',reportsRouter);

app.get('/',(req,res)=>{
    return res.send("hello world");
})
db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server running on port 3001.");
    });
});

//////////////////////////////////////////////////////////////////////////////////////////
/*
const jwt = require('jsonwebtoken');

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'user' && password === 'pass') {
    const token = jwt.sign({ username }, 'your_secret_key');
	let id=1;

    res.json({ token,id });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});*/

// function verifyToken(req, res, next) {
 // const token = req.headers['authorization'];
 // if (typeof token !== 'undefined') {
   // jwt.verify(token, 'your_secret_key', (err, authData) => {
     // if (err) {
      //  res.status(403).json({ error: 'Forbidden' });
     // } else {
      //  req.authData = authData;
     //   next();
    //  }
   // });
  //} else {
  //  res.status(403).json({ error: 'Forbidden' });
 // }
//}
