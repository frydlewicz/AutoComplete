import request, { Response } from 'request';

import config from '../config.json';

test('GET /', (done): void => {
    const url: string = config.baseUrl;

    request(url, (err: Error, res: Response, body: string): void => {
        if (err || res.statusCode != 200 || typeof body !== 'string') {
            return done(1);
        }

        const found: number = body.toLowerCase().indexOf('autocomplete');

        if (found === -1) {
            return done(2);
        }

        done();
    });
});

test('GET /css/main.css', (done): void => {
    const url: string = `${config.baseUrl}css/main.css`;

    request(url, (err: Error, res: Response): void => {
        if (err || res.statusCode != 200) {
            return done(1);
        }

        done();
    });
});

test('GET /js/jquery.autoComplete.js', (done): void => {
    const url: string = `${config.baseUrl}js/jquery.autoComplete.js`;

    request(url, (err: Error, res: Response): void => {
        if (err || res.statusCode != 200) {
            return done(1);
        }

        done();
    });
});

test('GET /js/stopwatch.js', (done): void => {
    const url: string = `${config.baseUrl}js/stopwatch.js`;

    request(url, (err: Error, res: Response): void => {
        if (err || res.statusCode != 200) {
            return done(1);
        }

        done();
    });
});

test('GET /js/client.js', (done): void => {
    const url: string = `${config.baseUrl}js/client.js`;

    request(url, (err: Error, res: Response): void => {
        if (err || res.statusCode != 200) {
            return done(1);
        }

        done();
    });
});

test('GET non-existent file', (done: any): void => {
    const url: string = `${config.baseUrl}hY6wj4pR`;

    request(url, (err: Error, res: Response): void => {
        if (err || res.statusCode != 404) {
            return done(1);
        }

        done();
    });
});
