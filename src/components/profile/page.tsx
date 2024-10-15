'use client'
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Profile() {
    const { data: session } = useSession();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const userImage = session?.user?.image ?? "https://via.placeholder.com/150";

    return (
        <main className="w-full h-screen flex justify-center items-center">
            <div className="md:w-2/6 w-3/5 h-3/5 ring-1 ring-slate-300 rounded-lg p-4 flex flex-col items-center justify-center">
                <div className="flex flex-col items-center justify-between w-full h-4/5">
                    <div className="w-full justify-center flex flex-col">
                        <div className="w-full justify-center flex">
                            <img className="w-40 h-40 rounded-full cursor-pointer" src={userImage} alt="User profile" />
                        </div>  
                        <div className="mt-4 w-full justify-center flex">
                            <h1 className="text-xl font-bold">{session?.user?.name}</h1>
                        </div>
                    </div>
                    {session && (
                        <button
                            onClick={() => signOut({ callbackUrl: '/' })}
                            className="mt-4 text-white px-4 py-2 rounded ring-1 ring-slate-300 md:w-1/3 hover:ring-error hover:text-error"
                        >
                            Sign Out
                        </button>
                    )}
                </div>
            </div>
        </main>
    )
}
