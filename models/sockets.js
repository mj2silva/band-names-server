class Sockets {
    constructor(io) {
        this.io = io;
    }

    startEvents() {
        this.io.on('connection', (socket) => {
            socket.on('chat-message', (data) => {
                this.io.emit('message-from-server', {
                    ...data,
                    serverTimestamp: Date.now(),
                });
            })
        })
    }
}

module.exports = Sockets;
