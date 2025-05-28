const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  _id: String, // e.g., 'category'
  seq: { type: Number, default: 0 }
});

module.exports = mongoose.model('CategoryCounter', counterSchema);
