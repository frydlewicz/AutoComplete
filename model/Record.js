"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var records_json_1 = __importDefault(require("../data/records.json"));
var Main_1 = require("./Main");
var Cache_1 = require("./Cache");
var records = records_json_1.default;
var getPublicProps = function (record) { return ({
    id: record.id,
    display_text: record.display_text,
    output_text: record.output_text,
}); };
exports.getRecord = function (text, useCache) {
    if (!text) {
        return { status: Main_1.Status.failure };
    }
    var result = useCache === false
        ? Cache_1.getRecordFromJson(text.trim())
        : Cache_1.getRecordFromCache(text.trim());
    return {
        status: Main_1.Status.success,
        records: result.map(getPublicProps),
    };
};
exports.addRecord = function (displayText, outputText, visible) {
    if (!displayText || !outputText) {
        return { status: Main_1.Status.failure };
    }
    var find = records.find(function (temp) {
        return temp.display_text == displayText.trim();
    });
    if (find) {
        return { status: Main_1.Status.duplicate };
    }
    var id = records.reduce(function (acu, cur) {
        return cur.id > acu
            ? cur.id
            : acu;
    }, 0);
    var record = {
        id: id + 1,
        display_text: displayText.trim(),
        output_text: outputText.trim(),
        visible: visible === false ? false : true,
    };
    records.push(record);
    Cache_1.revokeCache();
    return {
        status: Main_1.Status.success,
        records: [record].map(getPublicProps),
    };
};
