const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const TaskSchema = new mongoose.Schema({
author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Parent',
        required: [true, 'Nombre es requerido']
    },
task: {
        type: String,
        required: [true, 'Se requiere asignar una tarea al niño'],
        minlength:[4, 'la tarea debe tener mas de 4 caracteres']
    },
reward: {
        type: String,
        required: [true, 'Debe ingresarle una recompensa al niño']
    },
date:{
        type: Date,
        required: [true, 'La tarea requiere indicar una fecha']
    },
note:{
    type: String,
    required: [true, 'Se necesita que le dejes una nota a tu hijo'],
    minlength: [4, 'La nota debe tener mas de 4 caracteres']
},

status:{
    type: String,
    required: [true, 'La tarea debe partir con un estado inicial'],
    default: 'Pendiente'
}

}, {timestamps: true});

const Task = mongoose.model("Task", TaskSchema);
TaskSchema.plugin(uniqueValidator, { message: "{PATH} debe ser único" });
module.exports = Task;
