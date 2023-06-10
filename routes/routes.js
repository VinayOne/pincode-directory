const express = require("express");
const app = express();
const cors = require("cors");

const router = express.Router();
const LocalityPincode = require("../models/locality-pincodes");

app.use(cors());

router.route('/getstates').get(async (req, res) => {
  const result = await LocalityPincode.distinct('State');
  res.status(200).json({result: result});
});

router.route('/getdistricts').post(async (req, res) => {
  const result = await LocalityPincode.find({'State' : req.body.stateName}).distinct('District');
  res.status(200).json({result: result});
});

router.route('/getpostoffices').post(async (req, res) => {
  const result = await LocalityPincode.find({'District' : req.body.districtName}).distinct('PostOffice');
  res.status(200).json({result: result});
});

router.route('/getpincode').post(async (req, res) => {
  const result = await LocalityPincode.find({'PostOffice' : req.body.po});
  res.status(200).json({result: result});
});

router.route('/getpincodedetails').post(async (req, res) => {
  const result = await LocalityPincode.find({"Pincode": req.body.pc});
  res.status(200).json({'result': result, 'pin' : req.body.pc});
});

router.route('/updatefields').post(async (req, res) => {
  const result = await LVP.updateMany({$rename:{"Village/Locality name":"VillageLocality", "Officename ( BO/SO/HO)":"PostOffice", "Sub-distname":"SubDistrict"}}, false, true);
  res.status(200).json({'result': result});
});

module.exports = router;