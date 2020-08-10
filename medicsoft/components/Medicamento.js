import React from 'react';
import Swal from 'sweetalert2'
import {gql, useMutation} from "@apollo/client"
import Router from 'next/router'

const ELIMINAR_MEDICAMENTO = gql`
    mutation eliminarMedicamento($id: ID!){
        eliminarMedicamento(id: $id)
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

const Medicamento = ({ medicamento }) => {
    const { id, nombre, precio, fechaElaboracion, fechaVencimiento, existencia} = medicamento;
    
    //Mutation para eliminar medicamento
    const [ eliminarMedicamento ] = useMutation( ELIMINAR_MEDICAMENTO, {
        update(cache){
            const {obtenerMedicamentos} = cache.readQuery({
                query: OBTENER_MEDICAMENTOS
            });

            cache.writeQuery({
                query: OBTENER_MEDICAMENTOS, 
                data:{
                    obtenerMedicamentos: obtenerMedicamentos.filter( medicamentoActual => medicamentoActual.id !== id )
                }
            })
        }
    } )

    const confirmarEliminarMedicamento = () => {
        Swal.fire({
            title: '¿Deseas eliminar este medicamento?',
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
                    //Eliminar Producto de la BD
                    const { data } = await eliminarMedicamento({
                        variables:{
                            id
                        }
                    });

                    // console.log( data );

                    Swal.fire(
                        'Medicamento Eliminado',
                        data.eliminarMedicamento,
                        'success'
                    )
                } catch (error) {
                    console.log(error);
                }
            }
        })
    }

    const editarMedicamento = () => {
        Router.push({
            pathname: "/editarmedicamento/[id]",
            query: { id }
        })
    }

    return ( 
        <tr>
            <td className="border px-4 py-2">{ nombre }</td>
            <td className="border px-4 py-2">$ { precio }</td>
            {/* <td className="border px-4 py-2">{ fechaElaboracion }</td>
            <td className="border px-4 py-2">{ fechaVencimiento }</td> */}
            <td className="border px-4 py-2">{ existencia } Unidades</td>
            <td className="border px-4 py-2">
                <button
                    type="button"
                    className="flex justify-center item-center bg-red-800 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
                    onClick={ (  ) => confirmarEliminarMedicamento() }
                >
                    Eliminar
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="x-circle w-4 h-4 ml-2"><path  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </button>
            </td>
            <td className="border px-4 py-2">
                <button
                    type="button"
                    className="flex justify-center item-center bg-green-600 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
                    onClick={ (  ) => editarMedicamento() }
                >
                    Editar
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="pencil-alt w-4 h-4 ml-2"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                </button>
            </td>
        </tr>
    );
}
 
export default Medicamento;