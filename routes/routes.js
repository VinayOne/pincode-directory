const express = require("express");
const app = express();
const cors = require("cors");

const router = express.Router();
const LocalityPincode = require("../models/locality-pincodes");
const TrafficCaprure = require("../models/traffic-captures");

const Mailjet = require('node-mailjet');
const mailjet = Mailjet.apiConnect(
  '77e6a56444b50c0566f3553ad62e1c32',
  '92149bc982866de5f94075411b29024c',
);

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

router.route('/sendmail').post((req, res) => {
  const clientip = req.clientIp;
  const request = mailjet.post("send", {'version': 'v3.1'})
  .request({
    "Messages":[
      {
        "From": {
          "Email": "info@vinayone.com",
          "Name": req.body.name
        },
        "To": [
          {
            "Email": "inbox@vinayone.com",
            "Name": "VINAY KUMAR"
          }
        ],
        "Subject": `Contact from ${req.body.name}`,
        "HTMLPart": `<h3>Dear Vinay,</h3><br />You have received a contact!<br />From: ${req.body.email}<br />Name: ${req.body.name}<br />Message: ${req.body.message}<br />IP: ${clientip}`
      }
]
})
request.then((result) => {
  res.json({message: result.body});
})
.catch((err) => {
  console.log(err.statusCode);
})

});

router.route('/trafficCapture').post(async (req, res) => {
  const visitor = new TrafficCaprure({
    ip : req.body.ip,
    country : req.body.country, 
    datetime : req.body.visitedtime
  });
  await visitor.save();
  res.status(200).json({'message': 'Traffic Saved Successfully'});
})

module.exports = router;