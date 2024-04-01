import mongoose from 'mongoose';

//  sub-schema for address
const addressSchema = new mongoose.Schema({
    villageOrTown: String,
    district: String,
    state: String,
    country: String,
    pincode: String,
    latitude: Number, // optional will be taken if user wants to share his current location by allowing gps
    longitude: Number // optional
});

//  main schema
const reportSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
    },
    phone: {
        type: String,
        required: false,
    },
    gender:{
        type: String,
        enum:['male','female','other'],
        required: true,
    },
    age:{
        type: String,
        required: true,
    },
    symptoms:{
        type: [String], 
        required: true,
    },
    status:{
        type: String,
        enum: ['diagnosed', 'not-diagnosed'],
        required: true,
    },
    diagnosedWith:{
        type: String,
        required: false,
    },
    dateOfDiagnosis:{
        type: Date,
        required: false,
    },
    address: {
        type: addressSchema,
        required: true,
    }, 
    reportUrl:{
        type: String,
        required: false,
    },
    ip: {
        type: String,
        required: true,
    },
},{
    timestamps: true,
});

const Report = mongoose.model('Report', reportSchema);

export {Report};