
import express from "express";
import mongoose from 'mongoose';
import "./config.js";
import cors from 'cors';


const app = express();


app.use(express.json());


app.use(cors());


app.get('/', (request, response) => {
console.log(request)
return response.status(234).send(`Backend for Website`)
});

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
