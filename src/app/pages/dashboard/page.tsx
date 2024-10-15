'use client'
import NavBar from "@/components/navBar/page";
import DashboardMenu from "@/components/dashboard/dashboardMenu";
import DashboardListboardContent from "@/components/dashboard/dashboardListBoardContent";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import Board from "../board/[id]/page";

interface Board {
    id: string,
    title: string,
    content: string,
    backgroudId: string,
    backgroud: {
        select: {
            url: string
        }
    }
}

export default function Dashboard() {

    const [boards, setBoards] = useState<Board[]>([]);
    const {data: session} = useSession();
    const [sessionLoaded, setSessionLoaded] = useState(false);
    
    useEffect(() => {
        if (session) {
          setSessionLoaded(true);
        }
      }, [session]);
    
      useEffect(() => {
        if (!sessionLoaded) return;
    
        const fetchBoard = async () => {
          try {
            const userEmail = session?.user?.email;
            console.log(`user email: ${userEmail}`);
            if (!userEmail) {
              throw new Error("Missing required fields");
            }
            const res = await axios.post("/api/board/listBoardsByUserEmail", {
              userEmail: userEmail,
            });
            setBoards(res.data);
          } catch (error) {
            console.log("Error fetching lists:", error);
          }
        };
    
        fetchBoard();
      }, [sessionLoaded]);
    
      if (!sessionLoaded) {
        return <div className=" w-full justify-center flex h-screen"><button className="btn btn-lg"><span className="loading loading-spinner h-screen"></span>loading</button></div>;
      }
    
    return (
        <main className="">
            <NavBar />
            <div className=" bg-base-200 grid grid-cols-3 gap-10 items-center min-h-screen w-full overflow-hidden px-10">
                <div className="  md:flex justify-end h-full hidden">
                    <div className=" col-span-1 w-1/2 h-min bg-base-200">
                        <ul className="menu bg-base-200 rounded-md w-full items-center h-2/6">
                            <li className=" w-full items-center px-4"><a className=" w-full">Tablero</a></li>
                            <li className=" w-full items-center px-4"><a className=" w-full">Plantilla</a></li>
                            <li className=" w-full items-center px-4"><a className=" w-full">Inicio</a></li>
                        </ul>
                        <div className="hidden md:block">
                            <div className=" divider"></div>
                            <div className=" text-center">Espacios de trabajo</div>
                            <div className=" divider"></div>
                        </div>
                        <DashboardMenu boards={boards} setBoards={setBoards}/>
                    </div>
                </div>
                <DashboardListboardContent boards={boards}/>
            </div>
        </main>
    );
}