const Usuario = require('../models/Usuario');
const Medicamento = require('../models/Medicamento');
const Paciente = require('../models/Paciente');
const EquipoMedico = require( '../models/EquipoMedico' );

const bcryptjs = require('bcryptjs');
require('dotenv').config( { path: 'variables.env' } );
const jwt = require('jsonwebtoken');

const crearToken = ( usuario, secreta, expiresIn ) => {
    console.log(usuario);
    const { id, email, nombre, apellido } = usuario;

    return jwt.sign( { id, email, nombre, apellido }, secreta, {expiresIn} )
}

const resolvers = {

    Query: {
        obtenerUsuario: async( _, {}, ctx ) =>{
            return ctx.usuario;
        },

        obtenerMedicamentos: async() =>{
            try{
                const medicamentos = await Medicamento.find( {  } );
                return medicamentos;

            }catch(error){
                console.log(error);
            }
        },

        obtenerMedicamento: async( _, { id } ) => {
            //Revisar si el producto existe

            const medicamento = await Medicamento.findById(id);

            if(!medicamento){
                throw new Error('Medicamento no encontrado');
            }

            return medicamento;
        },

        obtenerPacientes: async(  ) => {
            try{
                const pacientes = await Paciente.find( {  } );
                return pacientes;
            }catch( error ){
                console.log(error);
            }
        },

        obtenerPaciente: async ( _, { id } ) => {
            //Revisar si el paciente existe

            const paciente = await Paciente.findById( id );

            if(!paciente){
                throw new Error('Paciente no encontrado');
            }

            return paciente
        },

        obtenerEquiposMedicos: async() => {
            try{
                const equiposMedicos = await EquipoMedico.find({});
                return equiposMedicos;
            }catch(error){
                console.log(error);
            }
        },

        obtenerEquipoMedico : async( _, { id } ) => {
            
            const equipoMedico = await EquipoMedico.findById(id);

            if(!equipoMedico){
                throw new Error('Equipo Medico no encontrado');
            }

            return equipoMedico
        }
    },

    Mutation:{
        nuevoUsuario: async (_, {input}) => {
            
            const { email, password } = input;
            
            //Revisar si ussuario esta registrado
            const  existeUsuario = await  Usuario.findOne({email});
            
            if(existeUsuario){
                throw new Error('El usuario ya existe');
            }

            //Hashear password
            
            const salt = bcryptjs.genSaltSync(10);
            input.password = bcryptjs.hashSync(password, salt);

            //Guardar en BD

            try{
                const usuario = new Usuario(input);
                usuario.save();
                return usuario;

            }catch(error){
                console.log(error);
            }
        },
        
        autenticarUsuario: async ( _, { input } ) => {
            
            const { email, password } = input;

            //Verificar si el usuario existe
            
            const existeUsuario = await Usuario.findOne({ email });

            if(!existeUsuario){
                throw new Error('El usuario no existe');
            }

            //Revisar si el password es correcto
            const passwordCorrecto = await bcryptjs.compare( password, existeUsuario.password );
            if(!passwordCorrecto){
                throw new Error('El password es incorrecto');
            }

            //Pasar token
            return{
                token: crearToken( existeUsuario, process.env.SECRETA, '24h' )
            }
        },

        nuevoMedicamento: async(_, { input }) => {
            try{
                const medicamento = new Medicamento(input);

                //Almacenar en la base de datos

                const resultado = await medicamento.save();

                return resultado;

            }catch(error){
                console.log(error);
            }
        },

        nuevoPaciente: async( _, { input } ) =>
        {
            const { email } = input;
            
            //Revisar si paciente esta registrado
            const  existePaciente = await  Paciente.findOne({email});
            
            if(existePaciente){
                throw new Error('El paciente ya existe');
            }

            try{
                const paciente = new Paciente(input);

                const resultado = await paciente.save();

                return resultado;
            }catch(error){
                console.log(error);
            }
        },

        nuevoEquipoMedico: async( _, { input } ) => {
            try{
                const equipoMedico = new EquipoMedico(input);

                const resultado = await equipoMedico.save();

                return resultado;
            }catch(error){
                console.log(error);
            }
        },

        actualizarMedicamento: async( _, { id, input } ) => {
            //Revisar si el producto existe
            let medicamento = await Medicamento.findById(id);

            if(!medicamento){
                throw new Error('Medicamento no encontrado');
            }

            //Guardar el registro en la base de datos
            medicamento = await Medicamento.findOneAndUpdate( { _id: id }, input, { new: true } );
            return medicamento;
        },
        
        actualizarPaciente: async( _, { id, input } ) => {
            let paciente = await Paciente.findById(id);

            if(!paciente){
                throw new Error('Paciente no encontrado');
            }

            paciente = await Paciente.findOneAndUpdate( { _id: id }, input, { new: true } );
            return paciente;
        },

        actualizarEquipoMedico: async( _, { id, input } ) => {
            let equipoMedico = await EquipoMedico.findById(id);

            if(!equipoMedico){
                throw new Error('Equipo Medico no encontrado');
            }

            equipoMedico = await EquipoMedico.findOneAndUpdate( { _id: id }, input, { new: true } );
            return equipoMedico;
        },

        eliminarPaciente: async( _, { id } ) => {
            //Comprobar existencia
            let paciente = await Paciente.findById(id);

            if(!paciente){
                throw new Error('Paciente no encontrado');
            }

            //Eliminar
            await Paciente.findByIdAndDelete( { _id: id } );

            return "Paciente Eliminado";

        },

        eliminarMedicamento: async( _, { id } ) => {
            //Comprobar existencia
            let medicamento = await Medicamento.findById(id);

            if(!medicamento){
                throw new Error('Medicamento no encontrado');
            }

            //Eliminar
            await Medicamento.findByIdAndDelete( { _id: id } );

            return "Medicamento Eliminado";
        },

        eliminarEquipoMedico: async( _, { id } ) => {
            //Comprobar existencia
            let equipoMedico = await EquipoMedico.findById(id);

            if(!equipoMedico){
                throw new Error('Equipo Medico no encontrado');
            }

            //Eliminar
            await EquipoMedico.findByIdAndDelete( { _id: id } );

            return "Equipo Medico Eliminado";
        }
    }
}

module.exports = resolvers;