import {Router} from 'express';
import { reportController } from '../controllers/report.controller.js';
import {upload} from '../middlewares/upload.middleware.js';
const reportRouter = Router();

reportRouter.post('/submit',
upload.fields([
    {name: 'report', maxCount: 1},
]),
reportController);

export {reportRouter};