const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require('uuid');

// collection for app users
const userDataSchema = new Schema(
    {
      _id: {
        type: String,
        default: uuidv4
      },
      username: {
        type: String,
        required: true
      },
      password: {
        type: String,
        required: true
      },
      role: {
        type: String,
        required: true
      },
      org: {
        type: String,
        ref: 'org'
      }
    },
    {
      collection: 'users'
    }
  );

module.exports = mongoose.model('Users', userDataSchema);