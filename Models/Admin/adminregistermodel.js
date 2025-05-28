const mongoose = require('mongoose');
const Counter = require('./admincounter');

const userSchema = new mongoose.Schema({
  _id: { type: Number },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: true });
userSchema.pre('save', async function (next) {
  const doc = this;
  if (doc.isNew) {
    const counter = await Counter.findByIdAndUpdate(
      { _id: 'adminRegisterId' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    doc._id = counter.seq;
  }
  next();
});

module.exports = mongoose.model('adminRegister', userSchema);
