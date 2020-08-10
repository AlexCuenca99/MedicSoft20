const mongoose = require('mongoose');

const EquipoMedicoSchema = mongoose.Schema({
    
    nombre:{
        type: String,
        required: true,
        trim: true
    },

    precio:{
        type: Number,
        required: true,
        trim: true
    },

    fechaCompra:{
        type: Date,
        default: Date.now
    },

    areaUso:{
        type: String,
        required: true,
        trim: true
    },

    cantidad:{
        type: Number,
        required: true,
        trim: true
    }
});

module.exports = mongoose.model('EquipoMedico', EquipoMedicoSchema);