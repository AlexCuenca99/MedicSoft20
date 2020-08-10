const mongoose = require('mongoose');

const PacienteSchema = mongoose.Schema({

    nombre:{
        type: String,
        required: true,
        trim: true
    },

    apellido:{
        type: String,
        required: true,
        trim: true
    },

    cedI:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },

    historiaClinica:{
        type: String,
        required: false,
        trim: true
    },

    numeroTelefonico:{
        type: String,
        required: true,
        trim: true
    },

    email:{
        type: String,
        required: false,
        trim: true,
        unique: true
    },

    edad:{
        type: Number,
        required: true,
        trim: true
    }
});

module.exports = mongoose.model('Paciente', PacienteSchema)