'use client'
import React, { useState,useEffect } from "react";
import BoardIcon from "@/components/board/boardIcon";
import AddBoard from "@/components/board/addBoard";
import axios from "axios";
import Link from "next/link";
import {useSession} from "next-auth/react";
import AddBoardModal from "../modals/addBoardModal";

interface BoardsListProps {
    boards: Array<any>
}

const boardContent:React.FC<BoardsListProps> = ({boards}) =>{    
    const [isOpen, setIsOpen] = useState<boolean>(false); 
    return (

        <div className="col-span-3 md:col-span-2 flex flex-col h-full">
                <div className=" flex flex-col gap-y-10 h-full ">
                    <div className=" text-xl p-5 overflow-auto">
                        <div className=" mb-3 ">
                            <h2 className=" text-xl">Visto Recientmente</h2>
                        </div>
                        <div className="grid xl:grid-cols-4 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-2 justify-center ">
                            {boards.map((board: any) => {
                                return (
                                    <Link className="" href={`/pages/board/${board.id}`} prefetch><BoardIcon title={board.title} id={board.id} Url={board.backgroud.url}/></Link>
                                );
                            })}
                        </div>
                    </div>
                    <div className=" p-5 overflow-auto">
                        <div className=" mb-3 ">
                            <h2 className=" text-xl">Tus Espacios de Tabajo</h2>
                        </div>
                        <div className="grid xl:grid-cols-4 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-2 justify-center">
                            {boards.map((board: any) => {
                                return (
                                    <Link className="" href={`/pages/board/${board.id}`} prefetch><BoardIcon title={board.title} id={board.id} Url={board.backgroud.url}/></Link>
                                );
                            })}

                            <button className="h-full grid" onClick={() => setIsOpen(!isOpen)}><AddBoard/></button>        
                        </div>
                    </div>
                </div>
                {isOpen && <AddBoardModal />}
        </div>


    );
}

export default boardContent;