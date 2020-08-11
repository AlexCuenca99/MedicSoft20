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
                    // Swal.fire(
                    //     'Eliminado!',
                    //     data.eliminarPaciente,
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
                        title: 'Paciente Eliminado'
                    })

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
            <td className="px-6 py-4 text-sm leading-5 font-medium text-gray-900">{nombre} { apellido } </td>
            <td className="px-6 py-4 text-sm leading-5 font-medium text-gray-600">{ cedI } </td>
            <td className="px-6 py-4 text-sm leading-5 font-medium text-gray-600">{edad}</td>
            <td className="px-6 py-4 text-sm leading-5 font-medium text-gray-600">{email }</td>
            <td className="px-6 py-4 text-sm leading-5 font-medium text-gray-600">
                <button
                    type="button"
                    className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-200 text-green-800"
                    onClick={ (  ) => confirmarEliminarPaciente() }
                >
                    Eliminar
                </button>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <button
                    type="button"
                    className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-200 text-green-800"
                    onClick={ (  ) => editarPaciente() }
                >
                    Editar
                </button>
            </td>
        </tr>
     );
}
 
export default Paciente;