//import mongoose from 'mongoose';
const mongoose= require('mongoose')
//import autoIncrement from 'mongoose-auto-increment';

// how our document look like
//import Validator from 'mongoose-validator';
const Validator=require('mongoose-validator')

const validate = Validator
var mobileno = [
    validate({
        validator: 'isLength',
        arguments: [10,10],
        message: "Please enter valid number"
    })
];
const userSchema = mongoose.Schema({
    userid: {
        type:Number, 
        required: true
    }, 
    name: String,
    username: String,
    email: String,
    phone: {
        type: String,
        required: true,
        validate: mobileno
    }
    
});

// autoIncrement.initialize(mongoose.connection);
// userSchema.plugin(autoIncrement.plugin, 'user');
// // we need to turn it into a model
// const postUser = mongoose.model('user', userSchema);

// export default postUser;

const postUser =mongoose.model("users",userSchema);

module.exports = postUser; 