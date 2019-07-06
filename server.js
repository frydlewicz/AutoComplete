"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var socket_io_1 = __importDefault(require("socket.io"));
var mustache_express_1 = __importDefault(require("mustache-express"));
var path_1 = __importDefault(require("path"));
var body_parser_1 = __importDefault(require("body-parser"));
var http_2 = __importDefault(require("./api/http"));
var socket_1 = __importDefault(require("./api/socket"));
var app = express_1.default();
var server = http_1.default.createServer(app);
var io = socket_io_1.default(server);
var port = process.env.PORT || 3000;
server.listen(port, function () {
    return console.log("listening on port: " + port);
});
app.engine('html', mustache_express_1.default());
app.set('views', path_1.default.join(__dirname, 'views'));
app.set('view engine', 'html');
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.get('/', function (req, res) {
    return res.render('index.html', {
        text: 'Hello world!',
    });
});
app.use('/', http_2.default);
app.use('/', express_1.default.static(path_1.default.join(__dirname, 'public')));
io.on('connection', socket_1.default);
