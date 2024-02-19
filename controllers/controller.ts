import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { Client, SendEmailV3_1, LibraryResponse } from 'node-mailjet';
import PinCode from "models/locality-pincode";

const mailjet = new Client({
    apiKey: process.env['MJ_APIKEY_PUBLIC'],
    apiSecret: process.env['MJ_APIKEY_PRIVATE']
});

const getStates = (req: Request, res: Response, next: NextFunction) => {
    return PinCode.distinct('State')
        .then((data) => res.status(200).json({ status: 'Success', result: data }))
        .catch((error) => res.status(500).json({ error }));
}
const getDistricts = (req: Request, res: Response, next: NextFunction) => {
    const state = req.body.stateName;
    return PinCode.find({ 'State': state }).distinct('District')
        .then(data => res.status(200).json({ result: data }))
        .catch(error => res.status(500).json({ error }));
}
const getPostOffices = (req: Request, res: Response, next: NextFunction) => {
    return PinCode.find({ 'District': req.body.districtName }).distinct('PostOffice')
        .then(data => res.status(200).json({ result: data }))
        .catch(error => res.status(500).json({ error }));
}
const getPincode = (req: Request, res: Response, next: NextFunction) => {
    return PinCode.find({ 'PostOffice': req.body.po })
        .then(data => res.status(200).json({ result: data }))
        .catch(error => res.status(500).json({ error }));
}
const getPincodeDetails = (req: Request, res: Response, next: NextFunction) => {
    return PinCode.find({ "Pincode": req.body.pc })
        .then(data => res.status(200).json({ result: data }))
        .catch(error => res.status(500).json({ error }));
}
const sendMail = async (req: Request, res: Response, next: NextFunction) => {
    const data: SendEmailV3_1.Body = {
        Messages: [
          {
            From: {
              Email: 'info@vinayone.com',
            },
            To: [
              {
                Email: 'inbox@vinayone.com',
              },
            ],
            TemplateErrorReporting: {
              Email: 'inbox@vinayone.com',
              Name: 'Reporter',
            },
            Subject: `Contact from ${req.body.name}`,
            HTMLPart: `<h3>Dear Vinay,</h3><br />You have received a contact!<br />From: ${req.body.email}<br />Name: ${req.body.name}<br />Message: ${req.body.message}`,
            TextPart: 'Dear passenger, welcome to Mailjet! May the delivery force be with you!',
          },
        ],
      };
    
      const result: LibraryResponse<SendEmailV3_1.Response> = await mailjet
              .post('send', { version: 'v3.1' })
              .request(data);
    
      const { Status } = result.body.Messages[0];
};

export default { getStates, getDistricts, getPostOffices, getPincode, getPincodeDetails, sendMail };