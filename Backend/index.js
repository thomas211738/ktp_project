
import express, { request, response } from "express";
import mongoose from 'mongoose';
import "./config.js";
import cors from 'cors';
import { User } from "./models/userModel.js";

const app = express();

// Middleware for parsing request body
app.use(express.json());

app.use(cors());

// Route to Save a new user
app.post('/users', async (request, response) => {
    try{
        if (
            !request.body.email ||
            !request.body.firstName ||
            !request.body.lastName ||
            !request.body.isBUEmail
          ) {
            return response.status(400).send({
              message: 'Could not get all required fields',
            });
          }
          const newUser = {
            email: request.body.email,
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            isBUEmail: request.body.isBUEmail,
          };
      
          const user = await User.create(newUser);
      
          return response.status(201).send(user);

    }catch (error){
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for Get All Books from database
app.get('/users', async (request, response) => {
    try {
      const users = await User.find({});
  
      return response.status(200).json({
        count: users.length,
        data: users,
      });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

// Route for Get One Book from database by id
app.get('/:id', async (request, response) => {
    try {
      const { id } = request.params;
  
      const user = await User.findById(id);
  
      return response.status(200).json(user);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  
// Route for Update a Book
app.put('/:id', async (request, response) => {
try {
    if (
        !request.body.email ||
        !request.body.firstName ||
        !request.body.lastName ||
        !request.body.isBUEmail
    ) {
    return response.status(400).send({
        message: 'Send all required fields: email, firstName, lastName, isBUEmail',
    });
    }
    const { id } = request.params;

    const result = await User.findByIdAndUpdate(id, request.body);

    if (!result) {
    return response.status(404).json({ message: 'User not found' });
    }

    return response.status(200).send({ message: 'User updated successfully' });
} catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
}
});

// Route for Delete a book
app.delete('/:id', async (request, response) => {
try {
    const { id } = request.params;

    const result = await User.findByIdAndDelete(id);

    if (!result) {
    return response.status(404).json({ message: 'User not found' });
    }

    return response.status(200).send({ message: 'User deleted successfully' });
} catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
}
});

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
