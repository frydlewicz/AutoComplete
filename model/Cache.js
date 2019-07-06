"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_json_1 = __importDefault(require("../config.json"));
var records_json_1 = __importDefault(require("../data/records.json"));
var maxRecordsReturn = config_json_1.default.maxRecordsReturn, maxCacheSize = config_json_1.default.maxCacheSize;
var records = records_json_1.default;
var cache = {};
var keys = [];
var index = -1;
var isTextValid = function (lowerCaseText) {
    var regExp = RegExp(/^[a-z]+$/i);
    return regExp.test(lowerCaseText);
};
exports.getRecordFromJson = function (text) {
    var result = [];
    var lowerCaseText = text.toLowerCase();
    for (var _i = 0, records_1 = records; _i < records_1.length; _i++) {
        var record = records_1[_i];
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
exports.getRecordFromCache = function (text) {
    var lowerCaseText = text.toLowerCase();
    if (!isTextValid(lowerCaseText)) {
        return exports.getRecordFromJson(text);
    }
    if (typeof cache[lowerCaseText] !== 'undefined') {
        console.log('Cache DID use');
        return cache[lowerCaseText];
    }
    var result = exports.getRecordFromJson(text);
    setTimeout(function () { return addRecordToCache(text, result); }, 1);
    return result;
};
var addRecordToCache = function (text, result) {
    if (result.length === 0 || maxCacheSize == 0) {
        return;
    }
    var lowerCaseText = text.toLowerCase();
    ++index;
    if (keys.length < maxCacheSize) {
        keys.push(lowerCaseText);
    }
    else {
        if (index >= maxCacheSize) {
            index = 0;
        }
        removeRecordFromCache(keys[index]);
        keys[index] = lowerCaseText;
    }
    cache[lowerCaseText] = result;
};
var removeRecordFromCache = function (lowerCaseText) {
    if (cache[lowerCaseText] !== 'undefined') {
        delete cache[lowerCaseText];
    }
};
exports.revokeCache = function () {
    keys.length = 0;
    for (var _i = 0, _a = Object.keys(cache); _i < _a.length; _i++) {
        var elem = _a[_i];
        delete cache[elem];
    }
    preBuild();
};
var preBuild = function () {
    var aCode = 'a'.charCodeAt(0);
    var zCode = 'z'.charCodeAt(0);
    for (var i = aCode; i <= zCode; ++i) {
        var text = String.fromCharCode(i);
        exports.getRecordFromCache(text);
    }
};
setTimeout(function () { return preBuild(); }, 1);
