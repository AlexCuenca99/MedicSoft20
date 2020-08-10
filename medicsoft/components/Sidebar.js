import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router';

const Sidebar = () => {

    //Routing de NEXT
    const router = useRouter();
    console.log(router.pathname);

    return ( 
        //LA ETIQUETA ASIDE SE USA PARA LA CREACION DE UN Sidebar(MENU DE NAVEGACION)
        <aside className="bg-teal-800 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5">
            <div>
                <p className="text-white text-xl">MedicSoft Pacientes</p>
            </div>

            <nav className="mt-5 list-none">
                <li className={ router.pathname === "/" ? "bg-teal-900 p-2" : "p-2"}>
                    <Link href="/">
                        <a className="text-white block">
                            Pacientes
                        </a>
                    </Link>
                </li>

                <li className={ router.pathname === "/medicamentos" ? "bg-teal-900 p-2" : "p-2"}>
                    <Link href="/medicamentos">
                        <a className="text-white block">
                            Medicamentos
                        </a>
                    </Link>
                </li>
                
                <li className={ router.pathname === "/equiposmedicos" ? "bg-teal-900 p-2" : "p-2"}>
                    <Link href="/equiposmedicos">
                        <a className="text-white block">
                            Equipos Médicos
                        </a>
                    </Link>
                </li>
            </nav>
        </aside>
     );
}
 
export default Sidebar;