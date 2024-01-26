
import express from "express";
import { Admin } from "../models/AdminModel.js";

const router = express.Router();

// Route to Save a new admin
router.post('/', async (request, response) => {
    try{
        if (
            !request.body.email ||
            !request.body.firstName ||
            !request.body.lastName 
          ) {
            return response.status(400).send({
              message: 'Could not get all required fields',
            });
          }
          const newAdmin = {
            email: request.body.email,
            firstName: request.body.firstName,
            lastName: request.body.lastName,
          };
      
          const admin = await Admin.create(newAdmin);
      
          return response.status(201).send(admin);

    }catch (error){
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for Get All admins from database
router.get('/', async (request, response) => {
    try {
      const admins = await Admin.find({});
  
      return response.status(200).json({
        count: admins.length,
        data: admins,
      });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

// Route for Get One admin from database by id
router.get('/:id', async (request, response) => {
    try {
      const { id } = request.params;
  
      const admin = await Admin.findById(id);
  
      return response.status(200).json(admin);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  
// Route for Update a admin
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

    const result = await Admin.findByIdAndUpdate(id, request.body);

    if (!result) {
    return response.status(404).json({ message: 'admin not found' });
    }

    return response.status(200).send({ message: 'admin updated successfully' });
} catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
}
});

// Route for Delete a admin
router.delete('/:id', async (request, response) => {
try {
    const { id } = request.params;

    const result = await Admin.findByIdAndDelete(id);

    if (!result) {
    return response.status(404).json({ message: 'admin not found' });
    }

    return response.status(200).send({ message: 'admin deleted successfully' });
} catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
}
});

export default router;