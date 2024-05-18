const express = require('express')
const {FriendsList,Users,Rooms,Ranks,Feedbacks}=require('../models');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const nodemailer = require('nodemailer');
const router=express.Router()
const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1786765",
  key: "f55dcf58564041046663",
  secret: "9e76c59f41bd4199f4de",
  cluster: "ap2",
  useTLS: true
});
router.get('/', (req, res) => {
    res.send("settings server");
});
  

router.post('/updateusername', async (req, res) => {
    const { userid, username } = req.body;
    if (!userid || !username ) {
        return res.status(400).json({ error: 'User ID, old username, and new username are required' });
    }
    try {
        const user = await Users.findOne({ where: { idusers: userid } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // if (oldusername !== user.username) {
        //     return res.status(401).json({ error: 'Invalid old username' });
        // }
        const existingUser = await Users.findOne({ where: { username } });
        if (existingUser) {
            return res.status(409).json({ error: 'Username is already taken' });
        }
        const [numAffectedRows] = await Users.update(
            { username },
            { where: { idusers: userid } }
        );
        if (numAffectedRows === 1) {
            return res.status(200).json('Username updated successfully');
        } else {
            return res.status(410).json('Username not updated');
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/updatecountry', async (req, res) => {
    const { userid, country } = req.body;
    if (!userid || !country) {
        return res.status(400).json({ error: 'User ID and country are required' });
    }
    try {
        const [numAffectedRows] = await Users.update(
            { country: country },
            { where: { idusers: userid } }
        );
        if (numAffectedRows === 1) {
            return res.json('Country updated successfully');
        } else {
            return res.json('Country not updated');
        }
    } catch (error) {
        return res.status(500).json('Internal server error');
    }
});


router.post('/changepassword', async (req, res) => {
    const { userid, oldpassword, password } = req.body;
    if (!userid || !oldpassword || !password ) {
        return res.status(400).json({ error: 'User ID and oldpassword and password are required' });
    }
    try {
        const user = await Users.findOne({ where: { idusers: userid } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
		const passwordMatch = await bcrypt.compare(oldpassword, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Current password is incorrect!' });
        }
        if (typeof password !== 'string' || password.length < 8) {
            return res.status(400).json({ error: 'Password is too short!' });
        }
		 const hashedNewPassword = await bcrypt.hash(password, 10);
        const [numAffectedRows] = await Users.update(
            { password: hashedNewPassword },
            { where: { idusers: userid } }
        );
        if (numAffectedRows === 1) {
            return res.status(200).json({ message: 'Password updated successfully'});
        } else {
            return res.status(402).json( {error: 'Password not updated'});
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});


router.post('/updatebio', async (req, res) => {
    const { userid, bio } = req.body;

    if(bio.length>255){
        return res.status(500).json({ error: 'Bio too long' });
    }

    console.log(bio.length)

    try {
        const [numAffectedRows] = await Users.update(
            { bio: bio },
            { where: { idusers: userid } }
        );
        if (numAffectedRows === 1) {
            return res.json('Bio updated successfully');
        } else {
            return res.json('Bio not updated');
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Internal server error' });
    }
});
router.post('/sendfeedback', async (req, res) => {
    const { userid, message } = req.body;
    if (!message) {
        return res.status(400).json({ error: 'Message cannot be null or empty' });
    }
    try {
        const feedback = await Feedbacks.create({
            userdid:userid,
            message:message,
        });
        if(feedback)
        return res.json({ message: 'Feedback sent successfully' });
    else
    return res.json({ message: 'feedback not sent successfully' });
    } catch (error) {
        console.error('Error creating feedback:', error); 
        return res.status(500).json({ error: 'Internal server error' });
    }
});

    router.get('/getinsight/:idusers',async(req,res)=>{
        const {idusers}=req.params;
        try {
        const user = await Users.findOne({ where: { idusers: idusers } });
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }
        let rankpoints= user.rankpoints;
       const rank= await Ranks.findOne({
            where: {
              [Op.and]: [
                { minimumpoints: { [Op.lte]: rankpoints } },
                { maximumpoints: { [Op.gte]: rankpoints } }
              ]
            }
          })
          console.log('hihihiiubiibyyi')
          let rankname=rank.rankname;
		  
		  let ranknamepoints=await Ranks.findOne({
            where: {
             rankname:rankname
            }
          })
		 
		   const usersbyrankpoints = await Users.findAll({
					where: {
						rankpoints: {
										[Op.and]: [
										{ [Op.gte]: ranknamepoints.minimumpoints }, 
										{ [Op.lte]: ranknamepoints.maximumpoints } 
										]
									}
							},
					order: [['rankpoints', 'DESC']] 
					});
		  let userrankk=1;
		  for(let user of usersbyrankpoints){
			   if (user.idusers == idusers) {
                break;
            } else {
                userrankk++;
            }
		  }
		  /////////////////////////////
        const roomCount = await Rooms.count({
            where: {
                [Op.or]: [
                    { userdid1: idusers },
                    { userdid2: idusers }
                ]
            }
        });
        const friendsCount = await FriendsList.count({
            where: {
                [Op.or]: [
                    { usersid1: idusers },
                    { usersid2: idusers }
                ]
            }
        });
        const users = await Users.findAll({
            order: [['rankpoints', 'DESC']]
        });
		let usersRoomCounts=[];
		for(let i=0;i<users.length;i++){
			usersRoomCounts[i]=await Rooms.count({
            where: {
                [Op.or]: [
                    { userdid1: users[i].idusers },
                    { userdid2:  users[i].idusers }
                ]
            }
        });
		}
		const maxRoomCountPerUser = Math.max(...usersRoomCounts);
        let leaderboardnumber = 1;
        for (let user of users) {
            if (user.idusers == idusers) {
                break;
            } else {
                leaderboardnumber++;
            }
        }
        return res.status(200).json({ roomCount, friendsCount, leaderboardnumber,rankname,user,users,maxRoomCountPerUser,userrankk,usersbyrankpoints});
    }catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Internal server error' });
    }
    });

    // router.post('/instagramlink', async (req, res) => {
    //     try {
    //         const { idusers, instagramlink } = req.body;
    //         const instagramRegex = /^(?:https?:\/\/)?(?:www\.)?instagram\.com\/[a-zA-Z0-9_\.]+\/?$/;
    //         const isValidInstagramLink = instagramRegex.test(instalink);
            
    //         if (isValidInstagramLink) {
    //             await Users.update(
    //                 {instagramlink: instagramlink },
    //                 { where: { idusers : idusers} }
    //             );
    //             return res.json("Instagram link updated successfully");
    //         } else {
    //             return res.status(400).json("Invalid Instagram link format");
    //         }
    //     } catch (error) {
    //         return res.status(500).json({ error: error.message });
    //     }
    // });
    
    

    router.post('/facebooklink', async (req, res) => {
        const { facebooklink, imageurl ,userid } = req.body;
        console.log(req.body)
        if(!userid || !facebooklink || !imageurl){
            return res.status(400).json({ error: 'Facebook link or image cannot be null or empty' });
        }

        try {
            const [numAffectedRows] = await Users.update(
                { facebooklink: facebooklink, imageurl: imageurl },
                { where: { idusers: userid } }
            );
            if (numAffectedRows === 1) {
                return res.status(200).json('Facebook link updated successfully');
            } else {
                return res.status(405).json('Facebook link not updated');
            }
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    });

    router.post('/removeFacebookLink', async (req, res) => {
        const {userid} = req.body;
        if(!userid){
            return res.status(400).json({ error: 'userid cannot be null or empty' });
        }

        try {
            const [numAffectedRows] = await Users.update(
                { facebooklink: null, imageurl: null },
                { where: { idusers: userid } }
            );
            if (numAffectedRows === 1) {
                return res.status(200).json('Facebook link updated successfully');
            } else {
                return res.status(405).json('Facebook link not updated');
            }
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    })



//////
router.put('/updateStatus/:userId/:active', async (req, res) => {
  let { userId, active } = req.params;
  
  // Convert userId to integer
  userId = parseInt(userId);

  if (isNaN(userId) || !active) {
    return res.status(400).json({ error: 'Invalid user ID or status' });
  }

  try {
    const [numAffectedRows] = await Users.update(
      { active: active },
      { where: { idusers: userId } }
    );

    if (numAffectedRows === 1) {
		pusher.trigger("my-channel", "my-event", {
		  userId:userId,
		  active:active
		});
		
      return res.json('Status updated successfully');
	  
    } else {
      return res.json('Status not updated');
    }
  } catch (error) {
    console.error('Error updating user status:', error);
    return res.status(500).json('Internal server error');
  }
});


router.put('/updateProfilePicture', async (req,res) => {
    const {userid, profileURL} = req.body;
    console.log(req.body)
        if(!userid, !profileURL){
            return res.status(400).json({ error: 'userid cannot be null or empty' });
        }
        try {
            const [numAffectedRows] = await Users.update(
                { imageurl: profileURL },
                { where: { idusers: userid } }
            );
            if (numAffectedRows === 1) {
                return res.status(200).json('Profile picture updated successfully');
            } else {
                return res.status(405).json('Profile picture not updated');
            }
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }

})






  
module.exports=router