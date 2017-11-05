/* globals it describe beforeEach afterEach */

const chai = require('chai');
const sinonModule = require('sinon');

let { expect } = chai;


describe('User data tests', () => {
    let sinon;
    let User = require('./mocks/user-model-mock');
    let data = require('../../data/user-data')({ User });

    beforeEach(() => {
        sinon = sinonModule.sandbox.create();
    });

    describe('getById()', () => {
        let existingUserId = 2;

        let user = {
            _id: existingUserId
        };

        let users = [user];

        beforeEach(() => {
            sinon.stub(User, 'findOne', (query, cb) => {
                let id = query._id;
                let foundUser = users.find(u => u._id === id);
                cb(null, foundUser);
            });
        });

        afterEach(() => {
            sinon.restore();
        });

        it('Expect to return the user by gived id', (done) => {
            data.getById(existingUserId)
                .then((actualUser) => {
                    expect(actualUser).to.equal(user);

                }).then(done, done);
        });

        it('Expect to return undefined when the user is not found', (done) => {
            data.getById(10)
                .then((foundUser) => {
                    expect(foundUser).to.be.undefined;
                }).then(done, done);
        });
    });


});