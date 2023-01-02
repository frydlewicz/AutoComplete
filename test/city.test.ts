import recordsJson from '../data/records.json';
import { genRandom } from '../helpers/math';
import { Status, IAddRequest } from '../model/Main';
import { IResult, IRecord, getRecord, addRecord } from '../model/Record';

const records: IRecord[] = recordsJson;

const sample: IAddRequest = {
    display_text: 'Warsaw',
    output_text: 'Warsaw',
    visible: true,
};

const randomRecord = (): IRecord => {
    let record: IRecord;

    do {
        const index: number = genRandom(0, records.length - 1);
        record = records[index];
    } while (!record.visible);

    return record;
};

const recordReturned = (done: jest.DoneCallback, record: IRecord, result?: IResult): void => {
    if (!result || result.status != Status.success || !result.records) {
        return done(1);
    }

    const found: IRecord = result.records.find((temp: IRecord): boolean =>
        temp.display_text === record.display_text);

    if (!found) {
        return done(2);
    }

    done();
};

const recordExists = (done: jest.DoneCallback, record: IAddRequest): void => {
    const found: IRecord = records.find((temp: IRecord): boolean =>
        temp.display_text === record.display_text);

    if (!found) {
        return done(3);
    }

    done();
};

const record: IRecord = randomRecord();
const name: string = record.display_text.toLowerCase();

test('filter records without cache', (done: jest.DoneCallback): void => {
    const result: IResult = getRecord(name, false);

    recordReturned(done, record, result);
});

test('filter records with cache', (done: jest.DoneCallback): void => {
    const result: IResult = getRecord(name, true);

    recordReturned(done, record, result);
});

test('add new unique record', (done: jest.DoneCallback): void => {
    const record: IAddRequest = { ...sample };
    const hash: string = Math.random().toString(36).substring(7);

    record.display_text += ` (${hash})`;
    addRecord(record.display_text, record.output_text, record.visible);

    recordExists(done, record);
});
