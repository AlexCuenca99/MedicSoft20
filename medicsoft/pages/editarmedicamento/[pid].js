import React, { useState, Fragment } from 'react';
import Layout from '../../components/Layout'
import { useRouter } from 'next/router'
import { gql, useQuery, useMutation } from '@apollo/client'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Swal from 'sweetalert2'

const OBTENER_MEDICAMENTO = gql`
    query obtenerMedicamento($id: ID!){
        obtenerMedicamento(id: $id){
            nombre
            precio
            fechaElaboracion
            fechaVencimiento
            existencia
        }
    }
`;

const ACTUALIZAR_MEDICAMENTO = gql`
    mutation actualizarMedicamento($id: ID!, $input: MedicamentoInput){
        actualizarMedicamento(id: $id, input: $input){
            id
            nombre
            fechaElaboracion
            fechaVencimiento
            precio
            existencia
        }
    }
`;
const EditarMedicamento = () => {

    const router = useRouter();

    const { query:{ id } } = router;
    //console.log(id);

    // Consultar para obtener el producto
    const { data, loading, error } = useQuery( OBTENER_MEDICAMENTO, {
        variables:{
            id
        }
    });

    // Mutation para modificar el producto
    const [ actualizarMedicamento ] = useMutation( ACTUALIZAR_MEDICAMENTO );

    //Schema de validadcion
    const SchemaValidacion =  Yup.object({
        nombre: Yup.string()
                    .required('El nombre es obligatorio'),
        fechaElaboracion: Yup.date()
                            .required('La fecha es obligatoria'),                    
        fechaVencimiento: Yup.date()
                            .required('La fecha es obligatoria'),
        precio: Yup.number()
                    .required('Agregue la cantidad disponible')
                    .positive('No se aceptan número negativos'),
        existencia: Yup.number()
                    .required('Agregue la cantidad disponible')
                    .positive('No se aceptan número negativos')
                    .integer('La cantidad debe ser entera')
    });
    // console.log(data);
    // console.log(loading);
    // console.log(error);

    if(loading) return 'Cargando...';

    if(!data) {
        return 'Acción no Permitida'

    }

    const actualizarInfoMedicamento = async valores => {
        // console.log(valores)
        const { nombre, fechaElaboracion, fechaVencimiento, precio, existencia } = valores;
        
        try {
            const {data} = await actualizarMedicamento({
                variables:{
                    id, 
                    input:{
                        nombre,
                        fechaElaboracion,
                        fechaVencimiento, 
                        precio,
                        existencia
                    }
                }
            });
            //console.log(data);

            //Redirigir hacia medicamentos
            router.push('/medicamentos');
            //Alerta
            // Swal.fire(
            //     'Correcto',
            //     'El producto se actualizo correctamente',
            //     'success'
            // )

            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                onOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
            
            Toast.fire({
                icon: 'success',
                title: 'Medicamento Guardado Correctamente'
            })

        } catch (error) {
            console.log(error);
        }
    }

    const { obtenerMedicamento } = data;

    return ( 
        <Layout>
            <h1 className="text-gray-800 text-2xl text-white font-light">Editar Medicamento</h1>
            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <Formik
                        enableReinitialize
                        initialValues={obtenerMedicamento}
                        validationSchema={ SchemaValidacion }
                        onSubmit={ valores => {
                            actualizarInfoMedicamento(valores);
                        }}
                    >

                        {props => { 
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
                                    placeholder="Nombre del Medicamento"
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
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fechaElaboracion">
                                    Fecha de Elaboracion
                                </label>
                                <input 
                                    className="shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="fechaElaboracion"
                                    type="date"
                                    placeholder="Fecha de Elaboracion"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.fechaElaboracion}
                                />
                        </div>
                        
                        { props.touched.fechaElaboracion && props.errors.fechaElaboracion ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">Error</p>
                                    <p>{ props.errors.fechaElaboracion }</p>
                                </div>
                        ) : null }

                        <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fechaVencimiento">
                                    Fecha de Vencimiento
                                </label>
                                <input 
                                    className="shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="fechaVencimiento"
                                    type="date"
                                    placeholder="Fecha de Vencimiento"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.fechaVencimiento}
                                />
                        </div>

                        { props.touched.fechaVencimiento && props.errors.fechaVencimiento ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">Error</p>
                                    <p>{ props.errors.fechaVencimiento }</p>
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
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="existencia">
                                    Cantidad
                                </label>
                                <input 
                                    className="shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="existencia"
                                    type="number"
                                    placeholder="Cantidad"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.existencia}
                                />
                        </div>

                        { props.touched.existencia && props.errors.existencia ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">Error</p>
                                    <p>{ props.errors.existencia }</p>
                                </div>
                        ) : null }

                        <input
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium 
                            rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo 
                            active:bg-indigo-700 transition duration-150 ease-in-out uppercase"
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
 
export default EditarMedicamento;