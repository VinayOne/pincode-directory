import * as express from 'express';
import controller from 'controllers/controller';

const router = express.Router();

router.get('/getstates', controller.getStates);
router.post('/getdistricts', controller.getDistricts);
router.post('/getpostoffices', controller.getPostOffices);
router.post('/getpincode', controller.getPincode);
router.post('/getpincodedetails', controller.getPincodeDetails);
router.post('/sendmail', controller.sendMail);

export default router;