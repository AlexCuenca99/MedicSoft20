import React,{ useState } from 'react';
import Layout from '../components/Layout';
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router'

const NUEVO_PACIENTE = gql`
    mutation nuevoPaciente($input: PacienteInput){
        nuevoPaciente(input: $input){
            id
            nombre
            apellido
            cedI
            historiaClinica
            numeroTelefonico
            email
            edad
        }
    }
`;

const OBTENER_PACIENTES = gql`
  query obtenerPacientes{
    obtenerPacientes{
      id
      nombre
      apellido
      cedI
      historiaClinica
      numeroTelefonico
      email
      edad
    }
  }  
`;

const NuevoPaciente = () => {

    const router = useRouter();

    //Mensaje de alerta
    const [ mensaje, guardarMensaje ] = useState(null);

    //Mutation para crear nuevos clientes
    const [ nuevoPaciente ] = useMutation(NUEVO_PACIENTE,{ 
        update( cache, { data: { nuevoPaciente } } ){
            //Obtener el objeto de cache que se desea actualizar
            const { obtenerPacientes } = cache.readQuery({ query: OBTENER_PACIENTES });

            //Reescribimo el cache( el cache nunca se debe modificar sino reescribir )

            cache.writeQuery({
                query: OBTENER_PACIENTES,
                data: {
                    obtenerPacientes: [...obtenerPacientes, nuevoPaciente]
                }
            })
        }
     });

    const formik = useFormik( { 
        initialValues:{
            nombre: '',
            apellido: '',
            cedI: '',
            historiaClinica: '',
            numeroTelefonico: '',
            email: '',
            edad: 0
        },

        validationSchema: Yup.object({
            nombre: Yup.string()
                        .required('El nombre es obligatorio'),
            apellido: Yup.string()
                        .required('El apellido es obligatorio'),
            cedI: Yup.string()
                    .required('La cédula de identidad es obligatoria')
                    .length(10, 'Ingrese una cédula válida'),
            historiaClinica: Yup.string()
                                .required('La historia clínica es obligatoria'),
            email: Yup.string()
                        .email('Ingrese un e-Mail válido')
                        .required('El e-Mail es obligatorio'),
            edad: Yup.number()
                        .required('La edad es obligatoria')
                        .min(0,'Ingrese una edad válida')
                        .max(120, 'Ingrese una edad válida')
        }),

        onSubmit: async valores => {
            
            const { nombre, apellido, cedI, historiaClinica, numeroTelefonico, email, edad } = valores

            try {
                const{ data } = await nuevoPaciente({
                    variables:{
                        input:{
                            nombre, 
                            apellido, 
                            cedI, 
                            historiaClinica, 
                            numeroTelefonico, 
                            email, 
                            edad
                        }
                    }
                });
                //console.log(data.nuevoPaciente);
                router.push('/');
            } catch (error) {
                guardarMensaje(error.message.replace('GraphQL error: ', ''));

                setTimeout(() => {
                    guardarMensaje(null);
                }, 2000);
            }
        }
    });

    const mostrarMensaje = () =>{
        return (
            <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
                <p>{mensaje}</p>
            </div>
        )
    }

    return ( 
        <Layout>
            
            {mensaje && mostrarMensaje()}
            <h1 className="text-2xl text-gray-800 font-light">Nuevo Paciente</h1>

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <form
                        className="bg-white shadow-md px-8 pt-6 pb-8 mb-4" 
                        onSubmit={formik.handleSubmit}
                    >
                        <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                                    Nombre
                                </label>
                                <input 
                                    className="shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="nombre"
                                    type="text"
                                    placeholder="Nombre del Paciente"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.nombre}
                                />
                        </div>

                        { formik.touched.nombre && formik.errors.nombre ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">Error</p>
                                    <p>{ formik.errors.nombre }</p>
                                </div>
                        ) : null }

                        <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apellido">
                                    Apellido
                                </label>
                                <input 
                                    className="shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="apellido"
                                    type="text"
                                    placeholder="Apellido del Paciente"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.apellido}
                                />
                        </div>

                        { formik.touched.apellido && formik.errors.apellido ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">Error</p>
                                    <p>{ formik.errors.apellido }</p>
                                </div>
                        ) : null }

                        <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cedI">
                                    Cédula de Identidad
                                </label>
                                <input 
                                    className="shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="cedI"
                                    type="text"
                                    placeholder="Cédula de Identidad del Paciente"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.cedI}
                                />
                        </div>

                        { formik.touched.cedI && formik.errors.cedI ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">Error</p>
                                    <p>{ formik.errors.cedI }</p>
                                </div>
                        ) : null }

                        <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="historiaClinica">
                                    Historia Clínica
                                </label>
                                <input 
                                    className="shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="historiaClinica"
                                    type="text"
                                    placeholder="Historia Clínica"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.historiaClinica}
                                />
                        </div>
                        
                        { formik.touched.historiaClinica && formik.errors.historiaClinica ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">Error</p>
                                    <p>{ formik.errors.historiaClinica }</p>
                                </div>
                        ) : null }

                        <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="numeroTelefonico">
                                    Número Telefónico
                                </label>
                                <input 
                                    className="shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="numeroTelefonico"
                                    type="text"
                                    placeholder="Numero Telefónico del Paciente"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.numeroTelefonico}
                                />
                        </div>

                        <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input 
                                    className="shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="email"
                                    type="email"
                                    placeholder="e-Mail del Paciente"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                />
                        </div>
                        
                        { formik.touched.email && formik.errors.email ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">Error</p>
                                    <p>{ formik.errors.email }</p>
                                </div>
                        ) : null }

                        <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="edad">
                                    Edad
                                </label>
                                <input 
                                    className="shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="edad"
                                    type="number"
                                    placeholder="Edad del Paciente"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.edad}
                                />
                        </div>
                        
                        { formik.touched.edad && formik.errors.edad ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">Error</p>
                                    <p>{ formik.errors.edad }</p>
                                </div>
                        ) : null }

                        <input
                            type="submit"
                            className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
                            value="Registrar Paciente"
                        />
                    </form>
                </div>
            </div>
        </Layout>
     );
}
 
export default NuevoPaciente;