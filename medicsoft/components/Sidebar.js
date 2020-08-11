import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router';

const Sidebar = () => {

    //Routing de NEXT
    const router = useRouter();
    console.log(router.pathname);

    return ( 
        //LA ETIQUETA ASIDE SE USA PARA LA CREACION DE UN Sidebar(MENU DE NAVEGACION)
            <aside className=" sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5 shadow-lg">
        {/* // <aside className="bg-gray-800 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5"> */}
            <div>
                <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-on-white.svg" alt="Workflow"></img>
                <p className="mt-4 text-gray-800 text-xl text-center font-bold">MedicSoft 20</p>
            </div>

            <nav className="mt-5 mr-5 list-none ">
                <li className={ router.pathname === "/" ? "rounded-md font-medium bg-gray-200 p-2" : "text-gray-300 p-2 rounded-md hover:text-white hover:bg-gray-100 focus:outline-none focus:text-white focus:bg-gray-200"}>
                    <Link href="/">
                        <a className="flex items-center w-full item-center text-gray-700 block rounded-md font-medium">
                            <svg viewBox="0 0 20 20" fill="currentColor" className="users w-6 h-6 mr-4"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" /></svg>                            
                            Pacientes
                        </a>
                    </Link>
                </li>

                <li className={ router.pathname === "/medicamentos" ? "rounded-md font-medium bg-gray-200 p-2" : "text-gray-300 p-2 rounded-md hover:text-white hover:bg-gray-100 focus:outline-none focus:text-white focus:bg-gray-200"}>
                    <Link href="/medicamentos">
                        <a className="flex items-center w-full item-center text-gray-700 block rounded-md font-medium text-gray-300 ">
                        <svg viewBox="0 0 20 20" fill="currentColor" className="beaker w-6 h-6 mr-4"><path fillRule="evenodd" d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z" clipRule="evenodd" /></svg>
                            Medicamentos
                        </a>
                    </Link>
                </li>
                
                <li className={ router.pathname === "/equiposmedicos" ? "rounded-md font-medium bg-gray-200 p-2" : "text-gray-300 p-2 rounded-md hover:text-white hover:bg-gray-100 focus:outline-none focus:text-white focus:bg-gray-200"}>
                    <Link href="/equiposmedicos">
                        <a className="flex items-center w-full item-center text-gray-700 block rounded-md font-medium">
                        <svg viewBox="0 0 20 20" fill="currentColor" className="support w-6 h-6 mr-4"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd" /></svg>                            Equipos Médicos
                        </a>
                    </Link>
                </li>
            </nav>
        </aside>
     );
}
 
export default Sidebar;