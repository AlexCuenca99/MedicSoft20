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
            confirmButtonText: 'Sí, eliminar medicamento',
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

                    // Swal.fire(
                    //     'Medicamento Eliminado',
                    //     data.eliminarMedicamento,
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
                        title: 'Medicamento Eliminado'
                    })
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
            <td className="px-6 py-4 text-sm leading-5 font-medium text-gray-900">{ nombre }</td>
            <td className="px-6 py-4 text-sm leading-5 font-medium text-gray-600">$ { precio }</td>
            <td className="px-6 py-4 text-sm leading-5 font-medium text-gray-600">{ existencia } Unidades</td>
            <td className="px-6 py-4 text-sm leading-5 font-medium text-gray-600">
                <button
                    type="button"
                    className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-200 text-green-800"
                    onClick={ (  ) => confirmarEliminarMedicamento() }
                >
                    Eliminar
                </button>
            </td>
            <td className="px-6 py-4 text-sm leading-5 font-medium text-gray-600">
                <button
                    type="button"
                    className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-200 text-green-800"
                    onClick={ (  ) => editarMedicamento() }
                >
                    Editar
                </button>
            </td>
        </tr>
    );
}
 
export default Medicamento;