"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Record_1 = require("../model/Record");
var connection = function (socket) {
    socket.on('getRecord', function (data, callback) {
        var text = data.text, useCache = data.useCache;
        var result = Record_1.getRecord(text, useCache);
        callback(result);
    });
    socket.on('addRecord', function (data, callback) {
        var display_text = data.display_text, output_text = data.output_text, visible = data.visible;
        var result = Record_1.addRecord(display_text, output_text, visible);
        callback(result);
    });
    socket.on('removeRecord', function (data, callback) {
        var id = data.id;
        var result = Record_1.removeRecord(id);
        callback(result);
    });
};
exports.default = connection;
