const express = require('express')
const {Users,RoomRequests,Reports,ReportCategory,sequelize,Rooms }=require('../models');
const { Op } = require('sequelize');

module.exports = function(io) {
  const router=express.Router()

router.get('/', (req, res) => {
    res.send("Home server");
});

router.post('/addrequest', async (req, res) => {
    try {
      const { country, gender, minimumAge, maximumAge, intrests, userdid } = req.body;
  
      if (!country || !gender || !minimumAge || !maximumAge || !intrests || !userdid) {
        return res.status(400).json({ error: 'All fields are required' });
      }
      
      if (minimumAge > maximumAge) {
        return res.status(400).json({ error: 'Minimum age should be less than maximum age' });
      }
      const newRequest = await RoomRequests.create({
        country,
        gender,
        minimumAge,
        maximumAge,
        intrests,
        userdid
      });
      return res.json({ message: 'Request created successfully', data: newRequest });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });


  function calculateAge(dateOfBirthString) {
    const dob = new Date(dateOfBirthString);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - dob.getFullYear();
    if (currentDate.getMonth() < dob.getMonth() || (currentDate.getMonth() === dob.getMonth() && currentDate.getDate() < dob.getDate())) {
        // Subtract 1 from the age if the birthday hasn't occurred yet this year
        return age - 1;
    }
    return age;
}
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
  router.get('/matching/:requestid',async(req,res)=>{
    const {requestid}=req.params;
    let request = await RoomRequests.findByPk(requestid, {
      include: {
        model: Users,
        as: 'users'
      }
    });
    let matching=false;
    let attempts=10;
    while(!matching){
        const otherRequests = await RoomRequests.findAll({
          where: {
              id: { [Op.ne]: requestid }
          },
          include: {
            model: Users,
            as: 'users'
          }
        });
          for (const otherReq of otherRequests) {
          var countmatch=0;
          //check intrest country's
          if(request.country!=="global"){
              if(request.country===otherReq.users.country){
                  if(otherReq.country!=="global"){
                        if(otherReq.country===request.users.country){
                          countmatch++;
                        }
                  }else{
                    countmatch++;
                  }
              }
          }else{
                  if(otherReq.country!=="global"){
                      if(otherReq.country===request.users.country){
                        countmatch++;
                      }
                  }else{
                    countmatch++;
                  }
          }
          // check intrest gender
         if(request.gender===otherReq.users.gender && otherReq.gender===request.users.gender){
            countmatch++;
         }
         //check intrest ages
         if((request.minimumAge <= calculateAge(otherReq.users.dateOfBirth) && 
            request.maximumAge >= calculateAge(otherReq.users.dateOfBirth)) 
            &&
            (otherReq.minimumAge <= calculateAge(request.users.dateOfBirth) &&
            otherReq.maximumAge >= calculateAge(request.users.dateOfBirth))
          ){
            countmatch++;
          }
          //check intrest intrestsss
          let intrests=request.intrests;
          let seventyPercentMyIntrest = Math.floor(intrests.length * 0.7);
          let otherIntrests=otherReq.intrests;
          let seventyPercentOtherIntrests = Math.floor(otherIntrests.length * 0.7);
          let myIntrestCount=0;
          let otherIntrestCount=0;
          for (const intr of intrests) {
            let found = false;
            for (const otherIntr of otherIntrests) {
                if (intr === otherIntr) {
                    found = true;
                    break;
                }
            }
            if (found) {
              myIntrestCount++;
            } 
        }
        if(myIntrestCount>=seventyPercentMyIntrest){
          for (const otherIntr of otherIntrests ) {
            let found = false;
            for (const intr of intrests) {
                if (otherIntr === intr) {
                    found = true;
                    break;
                }
            }
            if (found) {
              otherIntrestCount++;
            } 
        }
          if(otherIntrestCount>=seventyPercentOtherIntrests)
            countmatch++;
        }
        //end results//
        if(countmatch==4){
          matching=true;
          // return res.json('countmatch:'+countmatch);
                      //add room remove requests from backend and send the room info to the front end
          const room = await Rooms.create({
            userdid1:request.userdid,
            userdid2:otherReq.userdid,
          });
          await RoomRequests.destroy({
            where: {
                [Op.or]: [
                    { userdid: request.userdid },
                    { userdid: otherReq.userdid }
                ]
            }
        });
         io.emit('roomCreated',room);
         return res.json(room)
        }
      }
      attempts--;
      if(attempts==0){
        await RoomRequests.destroy({
          where: {
              userdid: request.userdid
          }
      });      
        return res.json('No Matching Found');
      }
      await wait(3000);
    }


  })
  return router;
 }
//  module.exports=router