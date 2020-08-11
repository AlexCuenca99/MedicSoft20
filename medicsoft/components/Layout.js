import React from 'react'
import Head from 'next/head'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { useRouter } from 'next/router';

const Layout = ({children}) => {
    
    //Hook de routing

    const router = useRouter();
    return ( 
        <>
            <Head>
                <title>MedicSoft 20</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w==" crossorigin="anonymous" />
                <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet"/>
                <link href="https://fonts.googleapis.com/css2?family=Mulish&display=swap" rel="stylesheet"/>
            </Head>

            {router.pathname === '/login' || router.pathname === '/nuevacuenta' ? (
                <div className="bg-gray-50 min-h-screen flex flex-col justify-center">
                    <div>
                        {children}
                    </div>
                </div>
            ) : (
                <div className="bg-white min-h-screen ">
                <div className="sm:flex min-h-screen ">
                    <Sidebar/>
                    <main className="sm:w-2/3 xl:w-4/5 sm:min-h-screen p-5">
                        <Header/>
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-6">
                            <div className="px-4 sm:px-0 ">
                                <div className="px-10 pt-5 pb-20 border-4 border-dashed border-gray-200 rounded-lg h-96 ">
                                    {children}
                                </div>
                                <h1 className="mt-10 text-center text-sm leading-5 text-gray-600">
                                    <p className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                                        MedicSoft20
                                    </p>
                                </h1> 
                            </div>
                        </div>
                    </main>
                </div>
                </div>
            )}
        </>
     );
}

export default Layout;