const mongoose = require('mongoose');

const MedicamentoSchema = mongoose.Schema({

    nombre:{
        type: String,
        required: true,
        trim: true
    },

    fechaElaboracion:{
        type: Date,
        required: true,
        trim: true
    },

    fechaVencimiento:{
        type: Date,
        required: true,
        trim: true
    },

    precio:{
        type: Number,
        required: true,
        trim: true
    },

    existencia:{
        type: Number,
        required: true,
        trim: true
    },

    creado:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Medicamento', MedicamentoSchema);