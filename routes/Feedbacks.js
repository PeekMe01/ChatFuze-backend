const express = require('express')
//const bcrypt = require('bcrypt');
const { Users, Feedbacks, sequelize } = require('../models');
const router = express.Router()





router.get('/', (req, res) => {
  res.send("feedback server");
});

router.get('/getallfeedbacks', async (req, res) => {
  try {
    const feedbacks = await sequelize.query(
      `SELECT users.email, users.username, feedbacks.*
   FROM feedbacks,users
   where feedbacks.userdid = users.idusers`,
      { type: sequelize.QueryTypes.SELECT }
    );
    return res.json(feedbacks);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});
router.post('/deletefeedback', async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ error: 'Feedback ID is required' });
    }
    const feedback = await Feedbacks.findByPk(id);
    if (!feedback) {
      return res.status(404).json({ error: 'Feedback not found' });
    }
    await feedback.destroy();
    return res.json({ message: `Feedback with ID ${id} deleted successfully` });

  } catch (error) {
    console.error('Error deleting feedback:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});



module.exports = router