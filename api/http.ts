import express, { Request, Response } from 'express';

import { Status, IGetRequest, IAddRequest } from '../model/Main';
import { IResult, getRecord, addRecord } from '../model/Record';

const router = express.Router();

router.get('/getRecord/:text', (req: Request, res: Response): void => {
    const data: IGetRequest = req.params;
    const { text, useCache } = data;
    const result: IResult = getRecord(text, useCache);

    res.status(result.status === Status.success ? 200 : 400).json(result);
});

router.post('/addRecord', (req: Request, res: Response): void => {
    const data: IAddRequest = req.body;
    const { display_text, output_text, visible } = data;
    const result: IResult = addRecord(display_text, output_text, visible);

    res.status(result.status === Status.success ? 200 : 400).json(result);
});

export default router;
