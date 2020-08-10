import Layout from '../components/Layout'
import Medicamento from '../components/Medicamento'
import { useQuery, gql } from '@apollo/client'
import Link from 'next/link'

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

const Medicamentos = () => {
    //Consultar los productos
    const { data, loading, error } = useQuery(OBTENER_MEDICAMENTOS)

    console.log(data)
    console.log(loading)
    console.log(error)

    if(loading) return 'Cargando...';

    return(
        <div>
            <Layout>
                <h1 className="text-2xl text-gray-800 font-light">Medicamentos</h1>
                    
                    <Link href="/nuevomedicamento">
                        <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white hover:bg-gray-800 hover:text-gray-200 mb-3 rounded uppercase font-bold text-sm w-full lg::w-auto text-center">
                            Nuevo Medicamento
                        </a>
                    </Link>
                    <div className="overflow-x-scroll">
                        <table className="table-auto shadow-md mt-10 w-full w-lg">
                            <thead className="bg-gray-800">
                                <tr className="text-white">
                                <th className="w-1/5 py-2">Nombre</th>
                                <th className="w-1/5 py-2">Precio</th>
                                {/* <th className="w-1/5 py-2">Fecha de Elaboración</th>
                                <th className="w-1/5 py-2">Fecha de Vencimiento</th> */}
                                <th className="w-1/5 py-2">Cantidad</th>
                                <th className="w-1/5 py-2">Eliminar</th>
                                <th className="w-1/5 py-2">Editar</th>
                                </tr>
                            </thead>

                            <tbody className="bg-white">
                                {data.obtenerMedicamentos.map( medicamento => (
                                <Medicamento 
                                    key={ medicamento.id }
                                    medicamento={ medicamento }
                                />
                                ))}
                            </tbody>
                        </table>
                    </div>
            </Layout>
        </div>
    )
}
 
export default Medicamentos