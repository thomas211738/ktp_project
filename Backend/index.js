
import express, { request, response } from "express";
import mongoose from 'mongoose';
import "./config.js";
import cors from 'cors';
import userRoute from './routes/userRoute.js'; 

const app = express();

// Middleware for parsing request body
app.use(express.json());

app.use(cors());


app.get('/', (request, response) => {
console.log(request)
return response.status(234).send(`Backend for Website`)
});

app.use('/users', userRoute);

mongoose
.connect(process.env.mongoDBURI)
.then(() => {
console.log('App connected to database');
app.listen(process.env.PORT, () => {
console.log(`App is listening to port: ${process.env.PORT}`)
});
})
.catch((error) => {
console.log(error);
});
