import React from 'react';
import Swal from 'sweetalert2'
import { gql, useMutation } from '@apollo/client'
import Router from 'next/router'

const ELIMINAR_EQUIPO_MEDICAMENTO = gql`
    mutation eliminarEquipoMedico($id: ID!){
        eliminarEquipoMedico(id: $id)
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

const EquipoMedico = ( {equipoMedico} ) => {
    const { id, nombre,
        precio,
        fechaCompra,
        areaUso,
        cantidad } = equipoMedico;
    
    //Mutation para eliminar Equipo Médico
    const[ eliminarEquipoMedico ] = useMutation( ELIMINAR_EQUIPO_MEDICAMENTO,{
        update(cache){
            const{ obtenerEquiposMedicos } = cache.readQuery({
                query: OBTENER_EQUIPOS_MEDICOS
            });

            cache.writeQuery({
                query: OBTENER_EQUIPOS_MEDICOS,
                data:{
                    obtenerEquiposMedicos: obtenerEquiposMedicos.filter( equipoMedicoActual => equipoMedicoActual.id !== id )
                }
            })
        }
    })

    const confirmarEliminarEquipoMedico = () => {
        Swal.fire({
            title: '¿Deseas eliminar este equipo médico?',
            text: "Esta acción no se puede deshacer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar equipo médico',
            cancelButtonText: 'No, cancelar'
        }).then( async (result) => {
            
            if (result.value) {
                 try {
                    //Eliminar Equipos de la BD
                    const { data } = await eliminarEquipoMedico({
                        variables:{
                            id
                        }
                    });

                    //console.log( data );
                    // Swal.fire(
                    //     'Equipo Eliminado',
                    //     data.eliminarEquipoMedico,
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
                        title: 'Equipo Eliminado'
                    })

                 } catch (error) {
                     console.log(error);
                 }
            }
        })
    }

    const editarEquipoMedico = () => {
        Router.push({
            pathname: "/editarequipomedico/[id]",
            query: { id }
        })
    }

    return ( 
        <tr>
            <td className="px-6 py-4 text-sm leading-5 font-medium text-gray-900">{ nombre }</td>
            <td className="px-6 py-4 text-sm leading-5 font-medium text-gray-600">$ { precio }</td>
            <td className="px-6 py-4 text-sm leading-5 font-medium text-gray-600">{ areaUso }</td>
            <td className="px-6 py-4 text-sm leading-5 font-medium text-gray-600">{ cantidad } Unidades</td>
            <td className="px-6 py-4 text-sm leading-5 font-medium text-gray-600">
                <button
                    type="button"
                    className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-200 text-green-800"
                    onClick={ (  ) => confirmarEliminarEquipoMedico() }
                >
                    Eliminar
                </button>
            </td>
            <td className="px-6 py-4 text-sm leading-5 font-medium text-gray-600">
                <button
                    type="button"
                    className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-200 text-green-800"
                    onClick={ (  ) => editarEquipoMedico() }
                >
                    Editar
                </button>
            </td>
        </tr>
    );
}
 
export default EquipoMedico;