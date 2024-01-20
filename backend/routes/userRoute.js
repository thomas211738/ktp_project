
import express from "express";
import { User } from "../models/userModel.js";

const router = express.Router();

// Route to Save a new user
router.post('/', async (request, response) => {
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
router.get('/', async (request, response) => {
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
router.get('/:id', async (request, response) => {
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
router.put('/:id', async (request, response) => {
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
router.delete('/:id', async (request, response) => {
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

export default router;