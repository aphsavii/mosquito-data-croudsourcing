import { asyncHandler } from '../utils/AsyncHandler.js';
import { Report } from '../models/report.modal.js';
import {ApiError} from '../utils/ApiError.js';
import {ApiResponse} from '../utils/ApiResponse.js';
import {uploadOnCloudinary} from '../utils/uploadOnCloudinary.js';
import { isValidObjectId } from 'mongoose';
const reportController = asyncHandler(async (req, res) => {
    let { name, email, phone, gender, age, symptoms, status, diagnosedWith, dateOfDiagnosis, address } = req.body;
    const ipAddress = req.socket.remoteAddress;
    if(!address )  return res.status(400).json(new ApiError(400, 'Address is required'));
    console.log('address',address);
    address = JSON.parse(address);
    if(symptoms && typeof symptoms === 'string') symptoms = symptoms.split(',');


    // console.log(ipAddress);
    if([gender, age, symptoms, status, address].includes(undefined)){
        return res.status(400).json(new ApiError(400, 'Gender, Age, Symptoms, Status, Address are required fields'));
    }
    if(status === 'diagnosed' && [diagnosedWith, dateOfDiagnosis].includes(undefined)){
        return res.status(400).json(new ApiError(400, 'Diagnosed With and Date of Diagnosis are required fields'));
    }
    let reportUrl = '';
    if(req.files && req.files.report){
        const localReportFilePath = req.files.report[0]?.path;
        const uploadedUrl = await uploadOnCloudinary(localReportFilePath,'/userReports');
        if(!uploadedUrl)  return res.status(500).json(new ApiError(500, 'Failed to upload report'));
        reportUrl = uploadedUrl;
    }

    const report =  await Report.create({
        name,
        email,
        phone,
        gender,
        age,
        symptoms,
        status,
        diagnosedWith,
        dateOfDiagnosis,
        address,
        reportUrl,
        ip: ipAddress,
    });

    res.status(200).json({
    status: 'success',
    message: 'Report submitted successfully',

    data: req.body,
});

});

export { reportController };