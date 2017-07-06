let mongoose = require('mongoose');
let mongoUrl = require('../../config/dev').mongoUrl;
let expect = require('chai').expect;

let HelloModel = require('../../config/database/models/hello');

describe('Mongo general tests', function () {
  // this.timeout(5000);

  before(function () {
    mongoose.connect(`mongodb://${mongoUrl}`);
  });

  describe('hello world', function () {
    it('save a basic entity ', function (done) {
      let model = new HelloModel({attr: 'Attrib1'});
      model.save((err, result) => {
        console.log('err', err, 'result', result);
        if (err) throw err;
        done();
      });
    });

    it('list basic entities', function (done) {
      HelloModel.find((err, result) => {
        if (err) throw err;
        expect(result.length).to.be.at.least(1);
        done();
      });
    });
  });
});
