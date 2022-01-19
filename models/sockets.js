const BandList = require('./BandList');

class Sockets {
    constructor(io) {
        this.io = io;
        this.bandList = new BandList();
    }

    startEvents() {
        this.io.on('connection', (socket) => {
            console.log('client connected');
            socket.emit('current-bands', {
                bands: this.bandList.getBands()
            });
            socket.on('vote-band', ({ bandId }) => {
                this.bandList.voteBand(bandId);
                this.io.emit('current-bands', {
                    bands: this.bandList.getBands()
                });
            });
            socket.on('delete-band', ({ bandId }) => {
                this.bandList.deleteBand(bandId);
                this.io.emit('current-bands', {
                    bands: this.bandList.getBands()
                });
            });
            socket.on('update-band', ({ bandId, bandName }) => {
                this.bandList.updateBand(bandId, bandName);
                this.io.emit('current-bands', {
                    bands: this.bandList.getBands()
                });
            });
            socket.on('create-band', ({ bandName }) => {
                this.bandList.addBand(bandName);
                this.io.emit('current-bands', {
                    bands: this.bandList.getBands()
                });
            });
        })
    }
}

module.exports = Sockets;
