import recordsJson from '../data/records.json';
import { Status } from './Main';
import { getRecordFromCache, getRecordFromJson, revokeCache } from './Cache';

export interface IResult {
    status: Status;
    records?: IRecord[];
}

export interface IRecord {
    id: number;
    display_text: string;
    output_text: string;
    visible?: boolean;
}

const records: IRecord[] = recordsJson;

const getPublicProps = (record: IRecord): IRecord => ({
    id: record.id,
    display_text: record.display_text,
    output_text: record.output_text,
});

export const getRecord = (text?: string, useCache?: boolean): IResult => {
    if (!text) {
        return { status: Status.failure };
    }

    const result: IRecord[] = useCache === false
        ? getRecordFromJson(text.trim())
        : getRecordFromCache(text.trim());

    return {
        status: Status.success,
        records: result.map(getPublicProps),
    };
};

export const addRecord = (displayText?: string, outputText?: string, visible?: boolean): IResult => {
    if (!displayText || !outputText) {
        return { status: Status.failure };
    }

    const find: IRecord = records.find((temp: IRecord): boolean =>
        temp.display_text == displayText.trim());

    if (find) {
        return { status: Status.duplicate };
    }

    const id: number = records.reduce((acu: number, cur: IRecord): number =>
        cur.id > acu
            ? cur.id
            : acu,
        0);

    const record: IRecord = {
        id: id + 1,
        display_text: displayText.trim(),
        output_text: outputText.trim(),
        visible: visible === false ? false : true,
    };

    records.push(record);
    revokeCache();

    return {
        status: Status.success,
        records: [record].map(getPublicProps),
    };
};
