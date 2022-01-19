const { v4: uuid } = require('uuid')

class Band {
    constructor(name) {
        this.id = uuid();
        this.name = name;
        this.votes = 0;
    }

    vote() {
        this.votes++;
    }
}

module.exports = Band;
