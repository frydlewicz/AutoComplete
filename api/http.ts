import express, { Request, Response } from 'express';

import { Status } from '../model/Main';
import { IResult, getRecord, addRecord, removeRecord } from '../model/Record';

const router = express.Router();

router.get('/getRecord/:text', (req: Request, res: Response): void => {
    const { text } = req.params;
    let useCache = true;

    if (typeof req.query.cache !== 'undefined' && req.query.cache == 0) {
        useCache = false;
    }

    const result: IResult = getRecord(text, useCache);

    res.status(result.status === Status.success ? 200 : 400).json(result);
});

router.post('/addRecord', (req: Request, res: Response): void => {
    const { display_text, output_text, visible } = req.body;
    const result: IResult = addRecord(display_text, output_text, visible);

    res.status(result.status === Status.success ? 200 : 400).json(result);
});

router.delete('removeRecord:id', (req: Request, res: Response): void => {
    const { id } = req.params;
    const result: IResult = removeRecord(parseInt(id, 10));

    res.status(result.status === Status.success ? 200 : 400).json(result);
});

export default router;
