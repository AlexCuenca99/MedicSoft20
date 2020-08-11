import React from 'react';
import Layout from '../components/Layout'
import { useFormik, yupToFormErrors } from 'formik'
import * as Yup from 'yup'
import { gql, useMutation } from '@apollo/client'
import Swal from 'sweetalert2';
import { useRouter } from 'next/router'

const NUEVO_EQUIPO_MEDICO = gql`
    mutation nuevoEquipoMedico($input: EquipoMedicoInput){
        nuevoEquipoMedico(input: $input){
            id
            nombre
            precio
            areaUso
            cantidad
        }
    }
`;

const OBTENER_EQUIPOS_MEDICOS = gql`
    query obtenerEquiposMedicos{
        obtenerEquiposMedicos{
            id
            nombre
            precio
            fechaCompra
            areaUso
            cantidad
        }
    }
`;

const NuevoEquipoMedico = () => {

    //Routing
    const router = useRouter();
    
    //Mutation de Apollo
    const [ nuevoEquipoMedico ] = useMutation( NUEVO_EQUIPO_MEDICO, {
        update(cache, { data: { nuevoEquipoMedico } }){
            //Obtener el objeto de cache
            const { obtenerEquiposMedicos } = cache.readQuery({query: OBTENER_EQUIPOS_MEDICOS});

            //Reescribir el objeto
            cache.writeQuery({
                query: OBTENER_EQUIPOS_MEDICOS,
                data:{
                    obtenerEquiposMedicos: [...obtenerEquiposMedicos, nuevoEquipoMedico]
                }
            })
        }
    } )

    //Formulario para nuevos equipos Médicos
    const formik = useFormik({
        initialValues:{
            nombre: '',
            precio: 0,
            areaUso: '',
            cantidad: 0
        },

        validationSchema: Yup.object({
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
        }),

        onSubmit: async valores =>{
            const { nombre, precio, areaUso, cantidad } = valores;

            try {
                const{ data } = await nuevoEquipoMedico({
                    variables:{
                        input:{
                            nombre,
                            precio,
                            areaUso,
                            cantidad
                        }
                    } 
                });

                // console.log(data);

                //Redireccionar hacia los equipos
                router.push('/equiposmedicos');

                //Mostrar una alerta
                // Swal.fire(
                //     'Creado',
                //     'Se creó el equipo correctamente',
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
                    title: 'Equipo Registrado Correctamente'
                })
            } catch (error) {
                console.log(error);
            }
        }
    })

    return ( 
        <Layout>
            <h1 className="text-gray-800 text-2xl text-white font-light">
                Nuevo Equipo Médico
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
                                    className="shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-indigo-600"
                                    id="nombre"
                                    type="text"
                                    placeholder="Nombre del Equipo"
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
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="precio">
                                    Precio
                                </label>
                                <input 
                                    className="shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-indigo-600"
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
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="areaUso">
                                    Área de Uso Destinada
                                </label>
                                <input 
                                    className="shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-indigo-600"
                                    id="areaUso"
                                    type="text"
                                    placeholder="Área de Uso Destinada"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.areaUso}
                                />
                        </div>

                        { formik.touched.areaUso && formik.errors.areaUso ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">Error</p>
                                    <p>{ formik.errors.areaUso }</p>
                                </div>
                        ) : null }

                        <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cantidad">
                                    Cantidad
                                </label>
                                <input 
                                    className="shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-indigo-600"
                                    id="cantidad"
                                    type="number"
                                    placeholder="Cantidad"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.cantidad}
                                />
                        </div>
                        
                        { formik.touched.cantidad && formik.errors.cantidad ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">Error</p>
                                    <p>{ formik.errors.cantidad }</p>
                                </div>
                        ) : null }

                        <input
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium 
                            rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo 
                            active:bg-indigo-700 transition duration-150 ease-in-out uppercase"
                            value="Agregar Nuevo Equipo"
                        />

                    </form>
                </div>
            </div>
        </Layout>    
    );
}
 
export default NuevoEquipoMedico;