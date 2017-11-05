class User {
    constructor(params) {
        Object.keys(params)
            .forEach(key => {
                this[key] = params[key];
            });
    }

    static findOne() { }
}


module.exports = User;