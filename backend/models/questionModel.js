// Basic question model - to be implemented
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: String,
  options: [String]
});

module.exports = mongoose.model('Question', questionSchema);
