import { Socket } from 'socket.io';

import { IGetRequest, IAddRequest } from '../model/Main';
import { IResult, getRecord, addRecord } from '../model/Record';

const connection = (socket: Socket): void => {
    socket.on('getRecord', (data: IGetRequest, callback): void => {
        const { text, useCache } = data;
        const result: IResult = getRecord(text, useCache);

        callback(result);
    });

    socket.on('addRecord', (data: IAddRequest, callback): void => {
        const { display_text, output_text, visible } = data;
        const result: IResult = addRecord(display_text, output_text, visible);

        callback(result);
    });
};

export default connection;
