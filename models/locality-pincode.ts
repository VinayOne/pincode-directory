import mongoose, { Document, Schema } from "mongoose";

export interface iPinCode {
    VillageLocality: String,
    PostOffice: String,
    Pincode: Number,
    SubDistrict: String,
    District: String,
    State: String
}

export interface iPinCodeModel extends iPinCode, Document {}

const PinCodeSchema: Schema = new Schema({
    VillageLocality: {type: String, required: true},
    PostOffice: {type: String, required: true},
    Pincode: {type: Number, required: true},
    SubDistrict: {type: String, required: true},
    District: {type: String, required: true},
    State: {type: String, required: true}
});

export default mongoose.model<iPinCodeModel>('PinCode', PinCodeSchema)