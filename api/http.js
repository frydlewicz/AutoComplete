"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var Main_1 = require("../model/Main");
var Record_1 = require("../model/Record");
var router = express_1.default.Router();
router.get('/getRecord/:text', function (req, res) {
    var data = req.params;
    var text = data.text, useCache = data.useCache;
    var result = Record_1.getRecord(text, useCache);
    res.status(result.status === Main_1.Status.success ? 200 : 400).json(result);
});
router.post('/addRecord', function (req, res) {
    var data = req.body;
    var display_text = data.display_text, output_text = data.output_text, visible = data.visible;
    var result = Record_1.addRecord(display_text, output_text, visible);
    res.status(result.status === Main_1.Status.success ? 200 : 400).json(result);
});
router.delete('removeRecord:id', function (req, res) {
    var data = req.params;
    var id = data.id;
    var result = Record_1.removeRecord(id);
    res.status(result.status === Main_1.Status.success ? 200 : 400).json(result);
});
exports.default = router;
