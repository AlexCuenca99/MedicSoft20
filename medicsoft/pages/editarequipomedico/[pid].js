import React from 'react';
import Layout from '../../components/Layout'
import { useRouter } from 'next/router'
import { gql, useQuery, useMutation } from '@apollo/client'
import {Formik} from 'formik'
import * as Yup from 'yup'
import Swal from 'sweetalert2'

const OBTENER_EQUIPO_MEDICO = gql`
    query obtenerEquipoMedico($id: ID!){
        obtenerEquipoMedico(id: $id){
            id
            nombre
            precio
            fechaCompra
            areaUso
            cantidad
        }
    }
`;

const ACTUALIZAR_EQUIPO_MEDICO = gql `
    mutation actualizarEquipoMedico($id: ID!, $input: EquipoMedicoInput){
        actualizarEquipoMedico(id: $id, input: $input){
            id
            nombre
            precio
            fechaCompra
            areaUso
            cantidad
        }
    }
`;

const EditarEquipoMedico = () => {

    const router = useRouter();

    const { query: {id} } = router;

    //console.log(id);

    // Consultar para obtener el Equipo
    const { data, loading, error } = useQuery( OBTENER_EQUIPO_MEDICO , {
        variables:{
            id
        }
    });

    //Mutation para actualizar el equipo
    const [ actualizarEquipoMedico ] = useMutation( ACTUALIZAR_EQUIPO_MEDICO );
    //Schema de Validacion

    const SchemaValidacion = Yup.object({
        nombre: Yup.string()
                    .required('El nombre del equipo es obligatorio'),
        precio: Yup.number()
                    .required('Agregue la cantidad disponible')
                    .positive('No se aceptan número negativos'),
        areaUso: Yup.string(),
        cantidad: Yup.number()
                    .required('La cantidad es obligatoria')
                    .positive('No se aceptan número negativos')
                    .integer('La cantidad debe ser entera')
    });

    // console.log(data);
    // console.log(loading);
    // console.log(error);

    if(loading) return 'Cargando...';

    if(!data){
        return 'Acción no Permitida'
    }

    const actualizarInfoEquipoMedico = async valores => {
        //console.log(valores);
        const { nombre, precio, areaUso, cantidad } = valores;

        try {
            const { data } = await actualizarEquipoMedico({
                variables:{
                    id, 
                    input:{
                        nombre,
                        precio,
                        areaUso,
                        cantidad
                    }
                }
            });

            //console.log(data);

            //Redirigir hacia equipos medicos
            router.push('/equiposmedicos');

            //Alerta
            Swal.fire(
                'Correcto',
                'El equipo se actualizo correctamente',
                'success'
            )

        } catch (error) {
            console.log(error)
        }
    }

    const { obtenerEquipoMedico } = data;

    return (
        <Layout>
            <h1 className="text-gray-800 text-2xl text-white font-light">Desde Edicion</h1>
            <div className="flex justify-center mt-5">
                
                <div className="w-full max-w-lg">
                    <Formik
                        enableReinitialize
                        initialValues={obtenerEquipoMedico}
                        validationSchema={ SchemaValidacion }
                        onSubmit={ valores => {
                            actualizarInfoEquipoMedico(valores);
                        }}
                    >

                    { props => {
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
                                    placeholder="Nombre del Equipo"
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
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="precio">
                                    Precio
                                </label>
                                <input 
                                    className="shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="precio"
                                    type="number"
                                    placeholder="Precio"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.precio}
                                />
                        </div>

                        { props.touched.precio && props.errors.precio ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">Error</p>
                                    <p>{ props.errors.precio }</p>
                                </div>
                        ) : null }

                        <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="areaUso">
                                    Área de Uso Destinada
                                </label>
                                <input 
                                    className="shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="areaUso"
                                    type="text"
                                    placeholder="Área de Uso Destinada"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.areaUso}
                                />
                        </div>

                        { props.touched.areaUso && props.errors.areaUso ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">Error</p>
                                    <p>{ props.errors.areaUso }</p>
                                </div>
                        ) : null }

                        <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cantidad">
                                    Cantidad
                                </label>
                                <input 
                                    className="shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="cantidad"
                                    type="number"
                                    placeholder="Cantidad"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.cantidad}
                                />
                        </div>
                        
                        { props.touched.cantidad && props.errors.cantidad ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">Error</p>
                                    <p>{ props.errors.cantidad }</p>
                                </div>
                        ) : null }

                        <input
                            type="submit"
                            className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
                            value="Guardar Cambios"
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
 
export default EditarEquipoMedico;