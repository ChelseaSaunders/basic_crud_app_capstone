require('dotenv').config();

const PORT = process.env.port || 8080;
const MONGODB_URI = process.env.MONGODB_URI;//"mongodb+srv://chels1440:fsopassword@cluster0.7xw4x2n.mongodb.net/?retryWrites=true&w=majority"
module.exports = {
  MONGODB_URI,
  PORT
};