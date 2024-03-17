const express = require('express');
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());




const db = require('./models');

// Routers
const accountsRouter=require('./routes/Accounts')
app.use('/accounts',accountsRouter);

const leaderboardRouter=require('./routes/Leaderboard')
app.use('/leaderboard',leaderboardRouter);

const messagesRouter=require('./routes/Messages')
app.use('/messages',messagesRouter);

const profilesettingsRouter=require('./routes/ProfileSettings')
app.use('/settings',profilesettingsRouter);

app.get('/',(req,res)=>{
    return res.send("hello world");
})
db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server running on port 3001.");
    });
});
