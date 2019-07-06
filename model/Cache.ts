import config from '../config.json';
import recordsJson from '../data/records.json';
import { IRecord } from './Record';

const { maxRecordsReturn, maxCacheSize } = config;
const records: IRecord[] = recordsJson;
const cache: object = {};
const keys: string[] = [];

let index = -1;

const isTextValid = (lowerCaseText: string): boolean => {
    const regExp: RegExp = RegExp(/^[a-z]+$/i);

    return regExp.test(lowerCaseText);
};

export const getRecordFromJson = (text: string): IRecord[] => {
    const result: IRecord[] = [];
    const lowerCaseText: string = text.toLowerCase();

    for (const record of records) {
        if (result.length >= maxRecordsReturn) {
            break;
        }

        if (record.visible &&
            record.display_text.toLowerCase().indexOf(lowerCaseText) > -1) {
            result.push(record);
        }
    }
    console.log('Cache did NOT use');

    return result;
};

export const getRecordFromCache = (text: string): IRecord[] => {
    const lowerCaseText: string = text.toLowerCase();

    if (!isTextValid(lowerCaseText)) {
        return getRecordFromJson(text);
    }

    if (typeof cache[lowerCaseText] !== 'undefined') {
        console.log('Cache DID use');

        return cache[lowerCaseText];
    }

    const result: IRecord[] = getRecordFromJson(text);

    setTimeout((): void => addRecordToCache(text, result), 1);

    return result;
};

const addRecordToCache = (text: string, result: IRecord[]): void => {
    if (result.length === 0 || maxCacheSize == 0) {
        return;
    }
    const lowerCaseText: string = text.toLowerCase();

    ++index;

    if (keys.length < maxCacheSize) {
        keys.push(lowerCaseText);
    } else {
        if (index >= maxCacheSize) {
            index = 0;
        }

        removeRecordFromCache(keys[index]);
        keys[index] = lowerCaseText;
    }

    cache[lowerCaseText] = result;
};

const removeRecordFromCache = (lowerCaseText: string): void => {
    if (cache[lowerCaseText] !== 'undefined') {
        delete cache[lowerCaseText];
    }
};

export const revokeCache = (): void => {
    keys.length = 0;

    for (const elem of Object.keys(cache)) {
        delete cache[elem];
    }

    preBuild();
};

const preBuild = (): void => {
    const aCode: number = 'a'.charCodeAt(0);
    const zCode: number = 'z'.charCodeAt(0);

    for (let i: number = aCode; i <= zCode; ++i) {
        const text: string = String.fromCharCode(i);

        getRecordFromCache(text);
    }
};

setTimeout((): void => preBuild(), 1);
