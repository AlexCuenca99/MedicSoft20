import Layout from '../components/Layout'
import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router';
import Link from 'next/link';
import Paciente from '../components/Paciente';

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
export default function Index() {

  const router = useRouter();
  //Consulta de Apollo
  const{ data, loading, error }= useQuery(OBTENER_PACIENTES);
  // console.log(data)
  // console.log(loading)
  // console.log(error)

  if(loading) return 'Cargando...';

  if(!data.obtenerPacientes){
    return router.push('/login');
  }
  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light">Pacientes</h1>
        <Link href="/nuevopaciente">
          <a className="py-2 px-4 mt-3 mb-3 inline-block border border-transparent text-sm leading-5 font-medium 
          rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 
          focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out uppercase lg:w-auto">
            Nuevo Paciente</a>
        </Link>
        
        <div className="overflow-x-scroll">
          <table className="table-auto divide-y mt-10 w-full w-lg divide-gray-50">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">Nombre</th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">Cédula de Identidad</th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">Edad</th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">e-Mail</th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider"></th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider"></th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {data.obtenerPacientes.map( paciente => (
                <Paciente 
                  key={ paciente.id }
                  paciente={ paciente }
                />
              ) )}
            </tbody>
          </table>
        </div>
      </Layout>
    </div>
  )
}
