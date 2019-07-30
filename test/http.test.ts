import request, { Response } from 'request';

import config from '../config.json';
import { Status, IAddRequest } from '../model/Main';
import { IResult } from '../model/Record';

const sample: IAddRequest = {
    display_text: 'Warsaw',
    output_text: 'Warsaw',
    visible: true,
};

const requestCallback = (done: any, err: Error, res: Response, body: string): void => {
    if (err || res.statusCode != 200 || typeof body !== 'string') {
        return done(1);
    }

    const result: IResult = JSON.parse(body);

    if (result.status != Status.success || !result.records || result.records.length === 0) {
        return done(2);
    }

    done();
};

test('get records without cache', (done): void => {
    const name: string = sample.display_text.toLowerCase();
    const url: string = `${config.baseUrl}getRecord/${name}?cache=0`;

    request.get({ url }, (err: Error, res: Response, body: string): void =>
        requestCallback(done, err, res, body));
});

test('get records with cache', (done): void => {
    const name: string = sample.display_text.toLowerCase();
    const url: string = `${config.baseUrl}getRecord/${name}`;

    request.get({ url }, (err: Error, res: Response, body: string): void =>
        requestCallback(done, err, res, body));
});

test('post new unique record', (done): void => {
    const url: string = `${config.baseUrl}addRecord`;
    const form: IAddRequest = { ...sample };
    const hash: string = Math.random().toString(36).substring(7);

    form.display_text += ` (${hash})`;

    request.post({ url, form }, (err: Error, res: Response, body: string): void =>
        requestCallback(done, err, res, body));
});
