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

    console.log(data)
    console.log(loading)
    console.log(error)

    if(loading) return 'Cargando...'

    return(
        <div>
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Equipos Médicos</h1>

            <Link href="/nuevoequipomedico">
                <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white hover:bg-gray-800 hover:text-gray-200 mb-3 rounded uppercase font-bold text-sm w-full lg::w-auto text-center">
                    Nuevo Equipo
                </a>
            </Link>
            <div className="overflow-x-scroll">
                <table className="table-auto shadow-md mt-10 w-full w-lg">
                    <thead className="bg-gray-800">
                        <tr className="text-white">
                        <th className="w-1/5 py-2">Nombre</th>
                        <th className="w-1/5 py-2">Precio</th>
                        {/* <th className="w-1/5 py-2">Fecha de Adquisición</th> */}
                        <th className="w-1/5 py-2">Área Uso</th>
                        <th className="w-1/5 py-2">Cantidad</th>
                        <th className="w-1/5 py-2">Eliminar</th>
                        <th className="w-1/5 py-2">Editar</th>
                        </tr>
                    </thead>

                    <tbody className="bg-white">
                        {data.obtenerEquiposMedicos.map( equipoMedico => (
                        <EquipoMedico 
                            key={ equipoMedico.id }
                            equipoMedico={ equipoMedico }
                        />
                        ))}
                    </tbody>
                </table>
            </div>

        </Layout>
        </div>
    )
}
 
export default EquiposMedicos