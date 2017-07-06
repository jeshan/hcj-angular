let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let helloSchema = Schema({
  attr: String
});

let Hello = mongoose.model('HelloModel', helloSchema);

module.exports = Hello;
