'use client'
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function NavBar() {
    const { data: session } = useSession();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div className="h-16 navbar bg-base-100 flex justify-between py-4 px-6 text-slate-100 items-center relative">
            <div>
                {session?.user ? (
                    <div className="flex flex-col ">
                        <div className="">
                            <button className="btn btn-square btn-ghost " onClick={() => setIsOpen(!isOpen)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                            </button>
                        </div>
                        {isOpen && (
                            <ul className=" absolute top-full menu dropdown-top z-10 left-0 bg-base-100 p-4 w-72 shadow-md transition-all duration-300 ">
                                <li className="mb-3"><Link className=" h-12 text-lg text-center " href="/pages/profile">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                    </svg>
                                    Porfile</Link></li>
                                <li className="mb-3"><Link className=" h-12 text-lg text-center" href="/pages/dashboard">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                                </svg>DashBoard</Link></li>
                                <button className="btn btn-ghost text-lg text-slate-300" onClick={async () => await signOut({callbackUrl: '/'})}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                                    </svg>
                                    <h1 className="">Logout</h1>
                                </button>
                            </ul>
                        )}
                    </div>
                ) : (
                    <div className="flex-1">
                        <a className="text-xl">Trello App Clone</a>
                    </div>
                )}
            </div>
            <div>
                { session?.user ? (
                    <div className="flex gap-x-4">
                        <div className="flex gap-x-4 items-center">
                            <p>{session.user.name}</p>
                            {session.user.image ? ( 
                                <img className="w-10 h-10 rounded-full cursor-pointer" src={session.user.image}/>
                            ) : ( 
                                <img src="https://via.placeholder.com/40"/>
                            )}                       
                        </div>
                    </div>
                ) : (
                    <div>
                        <button className="btn btn-outline btn-warning text-slate-800 px-3 py-2 "
                            onClick={() => router.push('/pages/login')}
                        >
                            Login
                        </button>
                    </div>
                )}
            </div> 
        </div>
    );
}
