import Head from 'next/head'
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
          <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold w-full lg:w-auto text-center">Nuevo Paciente</a>
        </Link>
        
        <div className="overflow-x-scroll">
          <table className="table-auto shadow-md mt-10 w-full w-lg">
            <thead className="bg-gray-800">
              <tr className="text-white">
                <th className="w-1/5 py-2">Nombre</th>
                <th className="w-1/5 py-2">Cédula de Identidad</th>
                <th className="w-1/5 py-2">Edad</th>
                <th className="w-1/5 py-2">e-Mail</th>
                <th className="w-1/5 py-2">Eliminar</th>
                <th className="w-1/5 py-2">Editar</th>
              </tr>
            </thead>

            <tbody className="bg-white">
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
