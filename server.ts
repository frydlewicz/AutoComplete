import express, { Request, Response } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import mustacheExpress from 'mustache-express';
import path from 'path';

import httpApi from './api/http';
import socketApi from './api/socket';

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port: number = parseInt(process.env.PORT || '3000', 10);

server.listen(port, (): void =>
    console.info(`listening on port: ${port}`));

app.engine('html', mustacheExpress());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(express.json());
app.use(express.urlencoded({
    extended: false,
}));

app.disable('x-powered-by');

app.get('/', (_: Request, res: Response): void =>
    res.render('index.html', {
        text: 'Hello world!',
    }));

app.use('/', httpApi);
app.use('/', express.static(path.join(__dirname, 'public')));

io.on('connection', socketApi);
