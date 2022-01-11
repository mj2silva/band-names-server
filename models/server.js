// Express app
const express = require('express');
const { createServer } = require('http')
const { Server: IOServer} = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');

const defaultConfig = {
    port: 3000,
}

class Server {
    constructor({ port } = defaultConfig) {
        this.app = express();
        this.port = port;
        this.httpServer = createServer(this.app);
    }

    start({ demo } = { demo: false }) {
        if (demo) this.useDemoClient();
        this.initSockets();
        this.httpServer.listen(this.port, () => {
            console.log('Server running on port ' + this.port);
        });
    }

    initSockets() {
        this.io = new IOServer(this.httpServer);
        const sockets = new Sockets(this.io);
        sockets.startEvents();
    }

    useDemoClient() {
        // Deploy client directory
        this.app.use(express.static(path.resolve(__dirname, '../client')));
    }
}

module.exports = Server;
