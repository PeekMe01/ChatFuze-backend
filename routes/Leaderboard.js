const express = require('express')
//const bcrypt = require('bcrypt');
const { Users } = require('../models');
const { FriendsList } = require('../models');
const router = express.Router()

router.get('/', (req, res) => {
  res.send("leaderboard server");
});


router.get('/global', async (req, res) => {
  try {
    const users = await Users.findAll({
      order: [
        ['rankpoints', 'DESC'],
        ['createdAt', 'ASC']
      ]
    });
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});


router.get('/local/:idusers', async (req, res) => {
  const { idusers } = req.params;
  try {
    const user = await Users.findOne({ where: { idusers: idusers } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const localUsers = await Users.findAll({
      where: { country: user.country },
      order: [
        ['rankpoints', 'DESC'],
        ['createdAt', 'ASC']
      ]
    });
    return res.json(localUsers);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
})


router.get('/friends/:idusers', async (req, res) => {
  const { idusers } = req.params;
  try {
    const usersfriends1 = await FriendsList.findAll({ where: { usersid1: idusers }, attributes: ['usersid2'] });
    const usersfriends2 = await FriendsList.findAll({ where: { usersid2: idusers }, attributes: ['usersid1'] });
    const usersfriends1Ids = usersfriends1.map(item => item.usersid2);
    const usersfriends2Ids = usersfriends2.map(item => item.usersid1);
    const allFriendsIds = usersfriends1Ids.concat(usersfriends2Ids);
    allFriendsIds.push(idusers);
    const allRanksFriendsUser = await Users.findAll({
      where: {
        idusers: allFriendsIds
      },
      order: [
        ['rankpoints', 'DESC'],
        ['createdAt', 'ASC']
      ]
    });
    res.json(allRanksFriendsUser);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
})

module.exports = router