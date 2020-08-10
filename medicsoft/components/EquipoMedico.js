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
                    Swal.fire(
                        'Equipo Eliminado',
                        data.eliminarEquipoMedico,
                        'success'
                    )

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
            <td className="border px-4 py-2">{ nombre }</td>
            <td className="border px-4 py-2">$ { precio }</td>
            {/* <td className="border px-4 py-2">{ fechaCompra }</td> */}
            <td className="border px-4 py-2">{ areaUso }</td>
            <td className="border px-4 py-2">{ cantidad } Unidades</td>
            <td className="border px-4 py-2">
                <button
                    type="button"
                    className="flex justify-center item-center bg-red-800 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
                    onClick={ (  ) => confirmarEliminarEquipoMedico() }
                >
                    Eliminar
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="x-circle w-4 h-4 ml-2"><path  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </button>
            </td>
            <td className="border px-4 py-2">
                <button
                    type="button"
                    className="flex justify-center item-center bg-green-600 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
                    onClick={ (  ) => editarEquipoMedico() }
                >
                    Editar
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="pencil-alt w-4 h-4 ml-2"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                </button>
            </td>
        </tr>
    );
}
 
export default EquipoMedico;