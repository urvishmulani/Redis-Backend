
const postUser = require('../models/users.js')

// Get all users
const getUsers = async (request, response) => {

    try {
        //const users = await postUser.find();    
        const users = await postUser.find({}, { _id: 1, username: 1 }).sort({ _id: -1 }).limit(1)
        response.status(200).json(users);
    } catch (error) {
        response.status(404).json({ message: error.message })
    }

}

// Save data of the user in database
const addUser = async (request, response) => {
    const user = request.body;

    const newUser = new postUser(user);
    try {
        await newUser.save();
        //response.status(201).json(newUser);
        response.status(201).json("User has been inserted successfully...");
    } catch (error) {
        response.status(409).json({ message: error.message });
    }
}

// Get a user by id
const getUserById = async (request, response) => {
    try {
        const user = await postUser.findById(request.params.id);
        response.status(200).json(user);
    } catch (error) {
        response.status(404).json({ message: error.message })
    }
}

// Save data of edited user in the database
const editUser = async (request, response) => {
    let user = request.body;

    try {
        await postUser.updateOne({ _id: request.params.id }, user);
        response.status(201).json("User updated successfully");
    } catch (error) {
        response.status(409).json({ message: error.message });
    }
}

// deleting data of user from the database
const deleteUser = async (request, response) => {
    try {
        await postUser.deleteOne({ _id: request.params.id });
        response.status(201).json("User deleted Successfully");
    } catch (error) {
        response.status(409).json({ message: error.message });
    }
}

module.exports = { getUsers, getUserById, addUser, deleteUser, editUser }
