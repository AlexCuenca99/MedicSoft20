import React from 'react';
import Layout from '../components/Layout'
import { useFormik, yupToFormErrors } from 'formik'
import * as Yup from 'yup'
import { gql, useMutation } from '@apollo/client'
import Swal from 'sweetalert2';
import { useRouter } from 'next/router'

const NUEVO_MEDICAMENTO = gql`
    mutation nuevoMedicamento($input: MedicamentoInput){
        nuevoMedicamento(input: $input){
            id
            nombre
            fechaElaboracion
            fechaVencimiento
            precio
            existencia
        }
    }
`;

const OBTENER_MEDICAMENTOS = gql`
    query obtenerMedicamentos{
            obtenerMedicamentos{
            id
            nombre
            precio
            fechaElaboracion
            fechaVencimiento
            existencia
        }
    }
`;

const NuevoMedicamento = () => {
    //Routing
    const router = useRouter();

    //Mutation de Apollo
    const [ nuevoMedicamento ] = useMutation( NUEVO_MEDICAMENTO, {
        update(cache, {data: {nuevoMedicamento}}){
            //Obtener el objeto de cache
            const{ obtenerMedicamentos } = cache.readQuery( { query: OBTENER_MEDICAMENTOS } );

            //Reescribir el cache
            cache.writeQuery({
                query: OBTENER_MEDICAMENTOS,
                data:{
                    obtenerMedicamentos: [...obtenerMedicamentos, nuevoMedicamento]
                }
            })
        }
    } );

    //Formulario para nuevos medicamentos 
    const formik = useFormik({
        initialValues:{
            nombre: '',
            fechaElaboracion: '2020-01-01',
            fechaVencimiento: '2020-01-01',
            precio: 0,
            existencia: 0
        },
        
        validationSchema: Yup.object({
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
        }),

        onSubmit: async valores =>{
            
            const{ nombre, fechaElaboracion, fechaVencimiento, precio, existencia } = valores; 
            console.log(valores);

            try {
                const{ data } = await nuevoMedicamento({
                    variables:{
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

                //Redireccionar hacia los productos
                router.push('/medicamentos');

                //Mostrar una alerta
                Swal.fire(
                    'Creado',
                    'Se creo el medicamento correctamente',
                    'success'
                )

            } catch (error) {
                
                console.log(error)
            }
        }
    })

    return ( 
        <Layout>
            <h1 className="text-gray-800 text-2xl text-white font-light">
                Nuevo Medicamento 
            </h1>

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
                                    placeholder="Nombre del Medicamento"
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
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fechaElaboracion">
                                    Fecha de Elaboracion
                                </label>
                                <input 
                                    className="shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="fechaElaboracion"
                                    type="date"
                                    placeholder="Fecha de Elaboracion"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.fechaElaboracion}
                                />
                        </div>
                        
                        { formik.touched.fechaElaboracion && formik.errors.fechaElaboracion ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">Error</p>
                                    <p>{ formik.errors.fechaElaboracion }</p>
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
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.fechaVencimiento}
                                />
                        </div>

                        { formik.touched.fechaVencimiento && formik.errors.fechaVencimiento ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">Error</p>
                                    <p>{ formik.errors.fechaVencimiento }</p>
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
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.precio}
                                />
                        </div>

                        { formik.touched.precio && formik.errors.precio ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">Error</p>
                                    <p>{ formik.errors.precio }</p>
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
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.existencia}
                                />
                        </div>

                        { formik.touched.existencia && formik.errors.existencia ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">Error</p>
                                    <p>{ formik.errors.existencia }</p>
                                </div>
                        ) : null }

                        <input
                            type="submit"
                            className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
                            value="Agregar Nuevo Medicamento"
                        />

                    </form>
                </div>
            </div>
        </Layout>    
    );
}
 
export default NuevoMedicamento;