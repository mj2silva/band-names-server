require('dotenv').config();

const Server = require('./models/server');
const { port } = require('./config');

const server = new Server({ port });

server.start({ demo: true });
