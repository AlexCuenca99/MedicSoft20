import React from 'react';
import { useQuery, gql } from '@apollo/client'
import { useRouter } from 'next/router';

const OBTENER_USUARIO = gql`
    query obtenerUsuario{
        obtenerUsuario{
            id
            nombre
            apellido
        }
    }
`;

const Header = () => {

    const router = useRouter();
    
    //Query de Apollo
    const{ data, loading, error } = useQuery(OBTENER_USUARIO);
    //console.log(data)
    //console.log(loading)
    //console.log(error)

    //Proteger que no accedamos a data antes de tener resultados
    if(loading) return null;

    if(!data){
        return router.push('/login');
    }

    const { nombre, apellido } = data.obtenerUsuario;
    const cerrarSesion = () =>{
        localStorage.removeItem('token');
        router.push('/login');
    }

    return ( 
        <div className="flex justify-between flex items-center container sm-auto mb-6">
            <p className="py-2 px-2 ml-8 rounded-md bg-white shadow-xs block text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"> Bienvenido/a: { nombre } { apellido }</p>
            <button 
                onClick={() => cerrarSesion()}
                type="button"
                className="mr-8 bg-blue-800 sm:w-auto group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out uppercase"
            >
                Cerrar Sesión
            </button>
        </div>
     );
}
 
export default Header;