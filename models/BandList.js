const Band = require('./Band');

class BandList {
    constructor() {
        this.bands = [
            new Band('Foo Fighters'),
            new Band('The Killers'),
            new Band('Avicii'),
            new Band('System of a Down'),
        ]
    }

    addBand(name) {
        this.bands.push(new Band(name));
        return this.bands;
    }

    deleteBand(id) {
        this.bands = this.bands.filter((band) => band.id !== id);
    }

    getBands() {
        return this.bands;
    }

    voteBand(id) {
        const band = this.bands.find((band) => band.id === id);
        band.vote();
    }

    updateBand(id, name) {
        const band = this.bands.find((band) => band.id === id);
        band.name = name;
    }
}

module.exports = BandList;
