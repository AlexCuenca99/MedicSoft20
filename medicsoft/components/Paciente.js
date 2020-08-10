import React from 'react';
import Swal from 'sweetalert2';
import { gql, useMutation } from '@apollo/client';
import Router from 'next/router'

const ELIMINAR_PACIENTE = gql`
    mutation eliminarPaciente($id: ID!){
        eliminarPaciente(id: $id)
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

const Paciente = ({ paciente }) => {

    //Mutation para eliminar cliente
    const [ eliminarPaciente ] = useMutation(ELIMINAR_PACIENTE, {
        update(cache){
            //Obtener una copia del objeto de cache
            const {obtenerPacientes} = cache.readQuery( { query: OBTENER_PACIENTES } );

            //Reescribir caché

            cache.writeQuery({
                query: OBTENER_PACIENTES,
                data:{
                    obtenerPacientes : obtenerPacientes.filter( pacienteActual => pacienteActual.id !== id )
                }
            })
        }
    })

    const { nombre, apellido, cedI, email, edad, id } = paciente;

    //Eliminar un paciente
    const confirmarEliminarPaciente = () => {
        Swal.fire({
            title: '¿Deseas eliminar este cliente?',
            text: "Esta acción no se puede deshacer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar paciente',
            cancelButtonText: 'No, cancelar'
          }).then( async (result) => {
            if (result.value) {
                try {

                    //Eliminar por ID
                    const{ data } = await eliminarPaciente({
                        variables:{
                            id
                        }
                    });

                    //console.log(data);
                    //Mostrar una alerta
                    Swal.fire(
                        'Eliminado!',
                        data.eliminarPaciente,
                        'success'
                    )
                } catch (error) {
                    console.log(error);
                }            
            }
          })
    }

    const editarPaciente = () =>{
        Router.push({
            pathname: "/editarcliente/[id]", 
            query:{ id }
        })
    }

    return ( 
        <tr>
            <td className="border px-4 py-2">{nombre} { apellido } </td>
            <td className="border px-4 py-2">{ cedI } </td>
            <td className="border px-4 py-2">{edad}</td>
            <td className="border px-4 py-2">{email }</td>
            <td className="border px-4 py-2">
                <button
                    type="button"
                    className="flex justify-center item-center bg-red-800 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
                    onClick={ (  ) => confirmarEliminarPaciente() }
                >
                    Eliminar
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="x-circle w-4 h-4 ml-2"><path  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </button>
            </td>
            <td className="border px-4 py-2">
                <button
                    type="button"
                    className="flex justify-center item-center bg-green-600 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
                    onClick={ (  ) => editarPaciente() }
                >
                    Editar
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="pencil-alt w-4 h-4 ml-2"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                </button>
            </td>
        </tr>
     );
}
 
export default Paciente;