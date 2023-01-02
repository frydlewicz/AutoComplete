import fetch, { Response } from 'node-fetch';

import config from '../config.json';
import { Status, IAddRequest } from '../model/Main';
import { IResult } from '../model/Record';

const sample: IAddRequest = {
    display_text: 'Warsaw',
    output_text: 'Warsaw',
    visible: true,
};

test('get records without cache', (done: jest.DoneCallback): void => {
    const name: string = sample.display_text.toLowerCase();
    const url = `${config.baseUrl}/getRecord/${encodeURIComponent(name)}?cache=0`;

    fetch(url)
        .then((res: Response) => {
            if (res.status != 200) {
                throw new Error('Incorrect status code!');
            }

            return res.json();
        })
        .then((data: IResult) => {
            if (!data || data.status != Status.success || !data.records || data.records?.length === 0) {
                throw new Error('Invalid JSON response!');
            }

            done();
        })
        .catch((err: Error) => done(err));
});

test('get records with cache', (done: jest.DoneCallback): void => {
    const name: string = sample.display_text.toLowerCase();
    const url = `${config.baseUrl}/getRecord/${encodeURIComponent(name)}`;

    fetch(url)
        .then((res: Response) => {
            if (res.status != 200) {
                throw new Error('Incorrect status code!');
            }

            return res.json();
        })
        .then((data: IResult) => {
            if (!data || data.status != Status.success || !data.records || data.records?.length === 0) {
                throw new Error('Invalid JSON response!');
            }

            done();
        })
        .catch((err: Error) => done(err));
});

test('post new unique record', (done: jest.DoneCallback): void => {
    const url = `${config.baseUrl}/addRecord`;
    const form: IAddRequest = { ...sample };
    const hash: string = Math.random().toString(36).substring(7);

    form.display_text += ` (${hash})`;

    fetch(url, {
        method: 'post',
        body: JSON.stringify(form),
        headers: { 'Content-Type': 'application/json' }
    })
        .then((res: Response) => {
            if (res.status != 200) {
                throw new Error('Incorrect status code!');
            }

            return res.json();
        })
        .then((data: IResult) => {
            if (!data || data.status != Status.success || !data.records || data.records?.length === 0) {
                throw new Error('Invalid JSON response!');
            }

            done();
        })
        .catch((err: Error) => done(err));
});
