import React from 'react';
import { useRouter, Router } from 'next/router'
import Layout from '../../components/Layout'
import { useQuery, gql, useMutation } from '@apollo/client'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Swal from 'sweetalert2'

const OBTENER_PACIENTE = gql`
    query obtenerPaciente($id: ID!){
        obtenerPaciente(id: $id){
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

const ACTUALIZAR_PACIENTE = gql`
    mutation actualizarPaciente($id: ID!, $input: PacienteInput){
            actualizarPaciente(id: $id, input: $input){
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
const EditarCliente = () => {

    //Obtener el ID actual 
    const router = useRouter();
    const { query: { id } } = router;
    //console.log(id);

    //Consultar para obtener el paciente
    const { data, loading, error } = useQuery( OBTENER_PACIENTE, {
        variables:{
            id
        }
    });

    //Actualizar el paciente
    const [actualizarPaciente] = useMutation( ACTUALIZAR_PACIENTE );
    // Schema de validacion
    const schemaValidacion = Yup.object({
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
    })    

    // console.log(data)
    // console.log(loading)
    // console.log(error)

    if(loading) return 'Cargando...'

    // console.log(data.obtenerPaciente)

    const { obtenerPaciente } = data;

    // Modifica el cliente en la base de datos
    const actualizarInfoPaciente = async valores => {
        const { nombre, apellido, cedI, historiaClinica, numeroTelefonico, email, edad } = valores;

        try {
            const{ data } = await actualizarPaciente({
                variables: {
                    id,
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

            //console.log(data);

            // Mostrar alerta
            Swal.fire(
                'Actualizado',
                'El cliente se actualizó correctamente',
                'success'
            )

            // Redireccionar
            router.push('/');

        } catch (error) {
            console.log(error);
        }
    }

    return ( 
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Editar Paciente</h1>
            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">

                    <Formik
                        validationSchema={ schemaValidacion }
                        enableReinitialize
                        initialValues={ obtenerPaciente }
                        onSubmit = { (valores) => {
                            actualizarInfoPaciente(valores)                            
                        } }
                    >
                        { props => {
                        //console.log(props);

                        return(
                            <form
                                className="bg-white shadow-md px-8 pt-6 pb-8 mb-4" 
                                onSubmit={props.handleSubmit}
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
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.nombre}
                                        />
                                </div>

                                { props.touched.nombre && props.errors.nombre ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                            <p className="font-bold">Error</p>
                                            <p>{ props.errors.nombre }</p>
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
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.apellido}
                                        />
                                </div>

                                {props.touched.apellido && props.errors.apellido ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                            <p className="font-bold">Error</p>
                                            <p>{ props.errors.apellido }</p>
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
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.cedI}
                                        />
                                </div>

                                { props.touched.cedI && props.errors.cedI ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                            <p className="font-bold">Error</p>
                                            <p>{ props.errors.cedI }</p>
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
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.historiaClinica}
                                        />
                                </div>
                                
                                { props.touched.historiaClinica && props.errors.historiaClinica ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                            <p className="font-bold">Error</p>
                                            <p>{ props.errors.historiaClinica }</p>
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
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.numeroTelefonico}
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
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.email}
                                        />
                                </div>
                                
                                { props.touched.email && props.errors.email ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                            <p className="font-bold">Error</p>
                                            <p>{ props.errors.email }</p>
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
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.edad}
                                        />
                                </div>
                                
                                { props.touched.edad && props.errors.edad ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                            <p className="font-bold">Error</p>
                                            <p>{ props.errors.edad }</p>
                                        </div>
                                ) : null }

                                <input
                                    type="submit"
                                    className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
                                    value="Editar Paciente"
                                />
                            </form>
                        )
                    }}
                    </Formik>
                </div>
            </div>
        </Layout>
     );
}
 
export default EditarCliente;