const express = require('express');
const app = express();
const cors = require("cors");
const path = require('path');

 const http = require('http');
 const { Server } = require('socket.io');

 const server = http.createServer(app);
 const io = new Server(server,{
        cors:{
          origin:"http://localhost:3000", //change the origin
          methods:["GET","POST"]
        }
 });

app.use(express.json());
app.use(cors());

const db = require('./models');

// const expoAppIdentifier = "chatfuze-frontend";
// const restrictAccess = (req, res, next) => {
//   const requestIdentifier = req.headers['x-expo-app'];

//   if (requestIdentifier && requestIdentifier === expoAppIdentifier) {
//     next();
//   } else {
//     res.status(403).send('Access Forbidden');
//   }
// };

// app.use(restrictAccess);

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

function calculateTimeDifference(st, t) {
  const startDate = new Date(st);
  const endDate = new Date(t);

  const difference = Math.abs(endDate - startDate);
  const minutesDifference = Math.floor(difference / 60000);
  const secondsDifference = Math.floor((difference % 60000) / 1000);

  return { minutes: minutesDifference, seconds: secondsDifference };
}

io.on('connection', (socket) => {

  socket.on('roomCreated', (data) => {
       console.log(`/// Room created ///${data}`);
       let st = new Date(data.createdAt);
       let t = new Date(new Date().getTime() + (3 * 60 + 5) * 60 * 1000);  
       //if you want to change the minutes change the number 5 to 1
       
       const interval = setInterval(() => {
        const newSt = new Date(new Date(st).getTime() + 1000); 
        let newtime=calculateTimeDifference(newSt, t);
        st = newSt.toISOString(); 
       
        io.emit('updateTime',{data,newtime});
        if (newtime.minutes === 0 && newtime.seconds === 0) {
            clearInterval(interval);
        }
    }, 1000);

       return () => clearInterval(interval);
     
  });
  socket.on('roomDestroyed',(data)=>{
      socket.emit('roomDestroyed',data)
  })
  
});



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

const homeRouter=require('./routes/Home')(io)
app.use('/home',homeRouter);

app.get('/',(req,res)=>{
    return res.send("hello world");
})
db.sequelize.sync().then(() => {
    server.listen(3001, () => {
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
