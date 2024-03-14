const express = require('express')
const {FriendsList,Users,Messages}=require('../models');
const { Op } = require('sequelize');
const router=express.Router()
router.get('/', (req, res) => {
    res.send("Messages server");
});

router.get('/friends/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const friendsListUsers = await FriendsList.findAll({
            where: {
                [Op.or]: [ 
                    { usersid1: id },
                    { usersid2: id }
                ]
            }
        });
        const allUserIds = friendsListUsers.flatMap(user => [user.usersid1, user.usersid2]);
        const friendsIds = allUserIds.filter(userId => userId !== Number(id));
        const friendsUsers = await Users.findAll({
            where: { idusers: friendsIds },
            order: [['updatedAt', 'DESC']]
        });
        return res.json(friendsUsers);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/friendss/:userid1/:userid2',async(req,res)=>{
    const {userid1,userid2}=req.params;
    try{
        const allMessages = await Messages.findAll({
            where: {
              [Op.or]: [
                {
                  [Op.and]: [
                    { senderid: userid1 },
                    { receiverid: userid2 }
                  ]
                },
                {
                  [Op.and]: [
                    { senderid: userid2 },
                    { receiverid: userid1 }
                  ]
                }
              ]
            }
          });
          res.json(allMessages);
    }catch(error){
        return res.status(500).json({ error: 'Internal server error' });
    }
});

  
module.exports=router