export const PORT = 3000; // ideally save port in .env file

require('dotenv').config();
const mongoDBURL = process.env.MONGODB_URL;