require('dotenv').config();

let PORT = 5000;
let MONGODB_URI = process.env.MONGODB_URI;

module.exports = {
  MONGODB_URI,
  PORT
};