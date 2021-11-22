const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require('bcrypt');

const ParentsSchema = new mongoose.Schema({
    parentName: {
        type: String,
        required: [true, 'Ingrese un nombre'],
        minlength: [3, 'El nombre no puede tener menos de 3 caracteres'],
    },
    childName: {
        type: String,
        required: [true, 'Ingrese un nombre'],
        minlength: [3, 'El nombre no puede tener menos de 3 caracteres'],
        },
    email: {
        type: String,
        required: [true, 'Debe ingresar un email'],
        unique: [true, 'El email debe ser único'],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Ingrese un email válido"
            }          
    },
    password: {
        type: String,
        required: [true, 'Ingrese una contraseña'],
        minlength: [4, 'La contraseña debe tener más de 4 caracteres']
    },

}, {timestamps: true});

ParentsSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
    .then(hash => {
        this.password = hash;
        next();
    });
});

const Parent = mongoose.model("Parent", ParentsSchema);
ParentsSchema.plugin(uniqueValidator, { message: "{PATH} debe ser único" });
module.exports = Parent;
