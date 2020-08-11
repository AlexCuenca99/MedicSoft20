import React, { useState } from 'react'
import Layout from '../components/Layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { gql, useMutation } from '@apollo/client';
import { useRoute, useRouter } from 'next/router'
import Swal from 'sweetalert2'

const AUTENTICAR_USUARIO = gql`
    mutation autenticarUsuario($input: AutenticarInput){
        autenticarUsuario(input: $input){
            token
        }
    }
`;

const Login = () => {

    //routing
    const router = useRouter();

    const [ mensaje, guardarMensaje ] = useState(null);
    
    // Mutation para crear nuevos usuarios en Apollo
    const [ autenticarUsuario ] = useMutation(AUTENTICAR_USUARIO);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },

        validationSchema: Yup.object({
            email: Yup.string()
                        .email('El E-mail no es válido')
                        .required('El E-mail no puede ir vacío'),
            password: Yup.string()
                            .required('La contraseña es obligatoria')
        }),

        onSubmit: async valores => {
            //console.log(valores);
            const { email, password } = valores;

            try {
                const { data } = await autenticarUsuario({
                    variables:{
                        input:{
                            email,
                            password
                        }
                    }
                });

                //console.log(data);
                // guardarMensaje('Autenticando...');
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
                    title: 'Signed in successfully'
                  })

                setTimeout(() => {
                    //Guardar token en localstorage
                    const { token } = data.autenticarUsuario;
                    
                    //Redireccionar a clientes
                    localStorage.setItem('token', token);
                }, 1000);

                setTimeout(() => {
                    guardarMensaje(null);
                    router.push('/');
                }, 2000);

            } catch (error) {
                guardarMensaje(error.message.replace('GraphQL error: ', ''))
                //console.log(error);

                setTimeout(() => {
                    guardarMensaje(null);
                }, 3000);
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
    
        <> 

            <Layout>
                <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-on-white.svg" alt="Workflow">

                </img>

                <p className="mt-6 mb-15 text-center text-3xl leading-9 font-extrabold text-gray-900">
                    Inicia Sesión con tu Cuenta
                </p>

                {mensaje && mostrarMensaje()}
                
                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-sm">
                        <form 
                            className="bg-white rounded shadow-md px-8 pt-6 pb-6 mb-4"
                            onSubmit={ formik.handleSubmit }
                        >
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                    E-mail
                                </label>
                                <input 
                                    className="shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="email"
                                    type="email"
                                    placeholder="E-mail de Usuario"
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
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                    Contraseña
                                </label>
                                <input 
                                    className="shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="password"
                                    type="password"
                                    placeholder="Contraseña de Usuario"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                />
                            </div>

                            { formik.touched.password && formik.errors.password ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">Error</p>
                                    <p>{ formik.errors.password }</p>
                                </div>
                            ) : null }
                            
                            <input
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium 
                                rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo 
                                active:bg-indigo-700 transition duration-150 ease-in-out uppercase"
                                value="Iniciar Sesión"
                            />
                        </form>
                    </div>
                </div>
                
                <h1 className="mt-10 text-center text-sm leading-5 text-gray-600">
                    <p className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                        MedicSoft20
                    </p>
                </h1>                
            </Layout>
        </>
     );
}
 
export default Login;