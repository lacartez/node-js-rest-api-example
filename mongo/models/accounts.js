'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

schema.index({ _id: 1, password: 1 }, { sparse: true, background: true });
module.exports = mongoose.models.users || mongoose.model('accounts', schema);
