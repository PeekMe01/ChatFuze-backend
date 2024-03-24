const express = require('express')
const {FriendsList,Users,Rooms,Ranks}=require('../models');
const { Op } = require('sequelize');
const nodemailer = require('nodemailer');
const router=express.Router()

router.get('/', (req, res) => {
    res.send("settings server");
});
  

router.post('/updateusername', async (req, res) => {
    const { userid, oldusername, username } = req.body;
    if (!userid || !username || !oldusername) {
        return res.status(400).json({ error: 'User ID, old username, and new username are required' });
    }
    try {
        const user = await Users.findOne({ where: { idusers: userid } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (oldusername !== user.username) {
            return res.status(401).json({ error: 'Invalid old username' });
        }
        const existingUser = await Users.findOne({ where: { username } });
        if (existingUser) {
            return res.status(409).json({ error: 'Username is already taken' });
        }
        const [numAffectedRows] = await Users.update(
            { username },
            { where: { idusers: userid } }
        );
        if (numAffectedRows === 1) {
            return res.json('Username updated successfully');
        } else {
            return res.json('Username not updated');
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
        if (oldpassword !== user.password) {
            return res.status(401).json({ error: 'Current password is incorrect!' });
        }
        if (typeof password !== 'string' || password.length < 8) {
            return res.status(400).json({ error: 'Password is too short!' });
        }
        const [numAffectedRows] = await Users.update(
            { password: password },
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
          let rankname=rank.rankname;
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
        let leaderboardnumber = 1;
        for (let user of users) {
            if (user.idusers == idusers) {
                break;
            } else {
                leaderboardnumber++;
            }
        }
        return res.json({ roomCount, friendsCount, leaderboardnumber,rankname,user});
    }catch (error) {
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
    
    

    // router.post('/facebooklink', async (req, res) => {
    //     const { idusers, facebooklink } = req.body;
    //     const facebookRegex = /^(?:https?:\/\/)?(?:www\.)?facebook\.com\/[a-zA-Z0-9_\.]+\/?$/;
    //     const isValidFacebookLink = facebookRegex.test(facebooklink);
    //     if (isValidFacebookLink) {
    //          await Users.update(
    //             { facebooklink: facebooklink },
    //             { where: { idusers: idusers } }
    //         );
    //         return res.json("Facebook link Updated");
    //     } else {
    //         return res.json("Not a valid Facebook link");
    //     }
    // });

  
module.exports=router