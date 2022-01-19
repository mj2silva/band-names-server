// Express app
const express = require('express');
const { createServer } = require('http')
const { Server: IOServer} = require('socket.io');
const cors = require('cors');
const path = require('path');

const Sockets = require('./sockets');

const defaultConfig = {
    port: 3000,
}

class Server {
    constructor({ port } = defaultConfig) {
        this.app = express();
        this.port = port;
    }

    start({ demo } = { demo: false }) {
        this.injectMiddleWares();
        if (demo) this.useDemoClient();
        this.httpServer = createServer(this.app);
        this.initSockets();
        this.httpServer.listen(this.port, () => {
            console.log('Server running on port ' + this.port);
        });
    }

    initSockets() {
        this.io = new IOServer(this.httpServer, { cors: { origin: true } });
        const sockets = new Sockets(this.io);
        sockets.startEvents();
    }

    useDemoClient() {
        // Deploy client directory
        this.app.use(express.static(path.resolve(__dirname, '../client')));
    }

    injectMiddleWares() {
        this.app.use(cors());
    }
}

module.exports = Server;
