const express = require('express')
const {Users,Reports,sequelize }=require('../models');
const router=express.Router()

router.get('/', (req, res) => {
    res.send("Reports server");
});



router.get('/getallreports', async (req, res) => {
  try {
    const reports = await sequelize.query(`
      SELECT 
          reports.*, 
          reportcategories.categoryname, 
          reported_users.email AS reportedemail, 
          reported_users.username AS reportedusername, 
          reporter_users.email AS reporteremail, 
          reporter_users.username AS reporterusername
      FROM 
          reports
          INNER JOIN reportcategories ON reports.reportcategorieid = reportcategories.idreportcategories
          INNER JOIN users AS reported_users ON reported_users.idusers = reports.reportedid
          INNER JOIN users AS reporter_users ON reporter_users.idusers = reports.reporterid
    `, { type: sequelize.QueryTypes.SELECT });

    return res.json(reports);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});
router.post('/deletereport', async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: 'Report ID is required' });
    }

    const report = await Reports.findByPk(id);
    if (!report) {
      return res.status(404).json({ error: 'Report not found' });
    }
    await report.destroy();

    return res.json({ message: `Report with ID ${id} deleted successfully` });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports=router