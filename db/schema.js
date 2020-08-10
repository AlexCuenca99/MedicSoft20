const { gql } = require('apollo-server');

const typeDefs = gql`
    
    # Usuario
    type Usuario{
        id: ID
        nombre: String
        apellido: String
        email: String
        creado: String
    }

    type Token{
        token: String
    }

    type Medicamento{
        id: ID
        nombre: String
        fechaElaboracion: String
        fechaVencimiento: String
        precio: Float
        existencia: Int
        creado: String
    }

    type Paciente{
        id: ID
        nombre: String
        apellido: String
        cedI: String
        historiaClinica: String
        numeroTelefonico: String
        email: String
        edad: Int
    }

    type EquipoMedico{
        id: ID
        nombre: String
        precio: Int
        fechaCompra: String
        areaUso: String
        cantidad: Int
    }

    input UsuarioInput{
        nombre: String!
        apellido: String!
        email: String!
        password: String!
    }

    input AutenticarInput{
        email: String!
        password: String!
    }

    # Medicamento

    input MedicamentoInput{
        nombre: String!
        fechaElaboracion: String!
        fechaVencimiento: String!
        precio: Float!
        existencia: Int!
    }

    # Paciente

    input PacienteInput{
        nombre: String!
        apellido: String!
        cedI: String!
        historiaClinica: String!
        numeroTelefonico: String
        email: String!
        edad: Int!
    }

    # EquipoMedico

    input EquipoMedicoInput{
        nombre: String!
        precio: Int!
        areaUso: String
        cantidad: Int!
    }

    type Query{
        # Usuarios
        obtenerUsuario: Usuario

        #Pacientes
        obtenerPacientes: [Paciente]
        obtenerPaciente(id: ID!) : Paciente

        # Medicamentos
        obtenerMedicamentos : [Medicamento]
        obtenerMedicamento(id: ID!) : Medicamento

        # EquiposMedicos
        obtenerEquiposMedicos : [EquipoMedico]
        obtenerEquipoMedico(id: ID!) : EquipoMedico
    }

    type Mutation{
        
        # USUARIOS
        nuevoUsuario(input: UsuarioInput): Usuario
        autenticarUsuario(input: AutenticarInput): Token

        # PACIENTES
        nuevoPaciente(input: PacienteInput): Paciente
        actualizarPaciente(id: ID!, input: PacienteInput): Paciente
        eliminarPaciente(id: ID!) : String

        # MEDICAMENTOS
        nuevoMedicamento(input: MedicamentoInput): Medicamento
        actualizarMedicamento(id: ID!, input: MedicamentoInput) : Medicamento
        eliminarMedicamento(id: ID!) : String

        # EQUIPOMEDICO
        nuevoEquipoMedico(input: EquipoMedicoInput): EquipoMedico
        actualizarEquipoMedico( id: ID!, input: EquipoMedicoInput ) : EquipoMedico
        eliminarEquipoMedico(id: ID!) : String
    }
`;

module.exports = typeDefs;
