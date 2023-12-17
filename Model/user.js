const mongoose = require('mongoose');
// const { Schema } = mongoose

const userSchema = new mongoose.Schema({
    name: { type: mongoose.SchemaTypes.String, required: true, },
    email: { type: mongoose.SchemaTypes.String, required: true, unique: true, },
    password: { type: mongoose.SchemaTypes.String, required: true, },
    course: { type: mongoose.SchemaTypes.String, required: true,},
    phone: { type: mongoose.SchemaTypes.String, required: true, }
});

const user=mongoose.model('user' , userSchema)

module.exports = user;