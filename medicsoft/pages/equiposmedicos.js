import Layout from '../components/Layout'
import EquipoMedico from '../components/EquipoMedico'
import { gql, useQuery } from '@apollo/client'
import Link from 'next/link'

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

const EquiposMedicos = () => {
    const { data, loading, error } = useQuery(OBTENER_EQUIPOS_MEDICOS)

    // console.log(data)
    // console.log(loading)
    // console.log(error)

    if(loading) return 'Cargando...'

    return(
        <div>
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Equipos Médicos</h1>

            <Link href="/nuevoequipomedico">
                <a className="py-2 px-4 mt-3 mb-3 inline-block border border-transparent text-sm leading-5 font-medium 
                rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 
                focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out uppercase lg:w-auto">
                    Nuevo Equipo
                </a>
            </Link>
            <div className="overflow-x-scroll">
            <table className="table-auto divide-y mt-10 w-full w-lg divide-gray-50">
                    <thead>
                        <tr>
                        <th className="px-6 py-3 border-b border-gray-200 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">Nombre</th>
                        <th className="px-6 py-3 border-b border-gray-200 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">Precio</th>
                        <th className="px-6 py-3 border-b border-gray-200 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">Área Uso</th>
                        <th className="px-6 py-3 border-b border-gray-200 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">Cantidad</th>
                        <th className="px-6 py-3 border-b border-gray-200 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider"></th>
                        <th className="px-6 py-3 border-b border-gray-200 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider"></th>
                        </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-200">
                        {data.obtenerEquiposMedicos.map( equipoMedico => (
                            <EquipoMedico 
                                key={ equipoMedico.id }
                                equipoMedico={ equipoMedico }
                            />
                        ))}
                        
                        <tr>
                            
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                {/* <div class="flex items-center"> */}
                                
                                {/* </div> */}
                            </td>
                        </tr>
                        
                    </tbody>
                </table>
            </div>

        </Layout>
        </div>
    )
}
 
export default EquiposMedicos