import fetch, { Response } from 'node-fetch';

import config from '../config.json';

test('GET /', (done: jest.DoneCallback): void => {
    const url: string = config.baseUrl;

    fetch(url)
        .then((res: Response) => {
            if (res.status != 200) {
                throw new Error('Incorrect status code!');
            }

            return res.text();
        })
        .then((body: string) => {
            if (!body.includes('<html>')) {
                throw new Error('Invalid main page structure!');
            }

            done();
        })
        .catch((err: Error) => done(err));
});

test('GET /css/main.css', (done: jest.DoneCallback): void => {
    const url = `${config.baseUrl}/css/main.css`;

    fetch(url)
        .then((res: Response): void => {
            if (res.status != 200) {
                throw new Error('Incorrect status code!');
            }
            if (!res.headers.get('content-type').includes('css')) {
                throw new Error('Incorrect content type!');
            }
            done();
        })
        .catch((err: Error) => done(err));
});

test('GET /js/jquery.autoComplete.js', (done: jest.DoneCallback): void => {
    const url = `${config.baseUrl}/js/jquery.autoComplete.js`;

    fetch(url)
        .then((res: Response): void => {
            if (res.status != 200) {
                throw new Error('Incorrect status code!');
            }
            if (!res.headers.get('content-type').includes('javascript')) {
                throw new Error('Incorrect content type!');
            }
            done();
        })
        .catch((err: Error) => done(err));
});

test('GET /js/stopwatch.js', (done: jest.DoneCallback): void => {
    const url = `${config.baseUrl}/js/stopwatch.js`;

    fetch(url)
        .then((res: Response): void => {
            if (res.status != 200) {
                throw new Error('Incorrect status code!');
            }
            if (!res.headers.get('content-type').includes('javascript')) {
                throw new Error('Incorrect content type!');
            }
            done();
        })
        .catch((err: Error) => done(err));
});

test('GET /js/client.js', (done: jest.DoneCallback): void => {
    const url = `${config.baseUrl}/js/client.js`;

    fetch(url)
        .then((res: Response): void => {
            if (res.status != 200) {
                throw new Error('Incorrect status code!');
            }
            if (!res.headers.get('content-type').includes('javascript')) {
                throw new Error('Incorrect content type!');
            }
            done();
        })
        .catch((err: Error) => done(err));
});

test('GET non-existent file', (done: jest.DoneCallback): void => {
    const url = `${config.baseUrl}/hY6wj4pR`;

    fetch(url)
        .then((res: Response): void => {
            if (res.status == 404) {
                return done();
            }
            done('Incorrect status code!');
        })
        .catch((err) => {
            done(err);
        });
});
