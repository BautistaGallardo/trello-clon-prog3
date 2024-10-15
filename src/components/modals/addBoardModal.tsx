import React, { useEffect } from "react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function AddBoardModal() {
    
    // add board hooks 
    const { data: session } = useSession();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [board, setBoard] = useState({ title: "" });
    const [background, setBackground] = useState<any[]>([]);
    
    // add background hooks 
    const [selectedBackground, setSelectedBackground] = useState<string>("");

    // handles changes
    const handleChangeBackgroundId = (e: any) => {
        setSelectedBackground(e);
    }

    const handleChanges = (e: any) => {
        setBoard({...board, [e.target.name]: e.target.value});
    }

    // query to add board
    const addBoard = async (e: any) => {
        try {
            const res = await axios.post("/api/board/addBoard", {
                title: board.title,
                content: 'fsaddssd',
                userEmail: session?.user?.email,
                background: selectedBackground
                });
        } catch (error: any) {
            console.log(error.response.data);
        }
    };

    // query to get backgrounds
    useEffect(() =>{
        const backgrounds = async () => {
            try {
                const res = await axios.post("/api/background/getBackgrounds");
                setBackground(res.data);
    
            } catch (error: any) {
                console.log(error.response.data);
            }
            console.log(background);
        }
        backgrounds();
    } 
    ),[]



    return (
        <main className={isOpen!?" hidden":""}>
            <div className="fixed inset-0 bg-neutral-900 bg-opacity-50 z-50 "></div>
                <div className="fixed inset-0 flex items-center justify-center z-50 cursor-default m-1">
                    <div className={isOpen!?" hidden":" modal-open w-11/12 sm:w-2/3 md:w-auto  bg-neutral-800 p-6 rounded-lg "}>
                        <div className=" h-full w-full ">
                            <div className=" mb-5 flex w-full justify-between">
                                <h2 className=" text-xl"> Create Board</h2>
                                <div onClick={() => setIsOpen(!isOpen)}><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg></div>
                            </div>
                            <form className=" flex flex-col justify-between gap-2">
                               <div>
                                    <div className=" justify-center items-center flex">     
                                        <div className=" w-full justify-center items-center">
                                            <input type="text" onChange={handleChanges} placeholder="Title" name="title" className="mt-1 block w-full px-3 py-2 bg-neutral-800 rounded-md shadow-sm ring-1 ring-neutral-300" />
                                            <div className=" grid md:grid-cols-3 sm:grid-cols-2 gap-y-2 gap-x-2 mx-2 mt-6 h-64 overflow-scroll p-1">
                                                    {background.map((bg: any) => (
                                                        <div key={bg.id} onClick={() => handleChangeBackgroundId(bg.id)} className={`w-30 md:w-40 md:h-20 h-24 rounded-md cursor-pointer  hover:ring-1  hover:ring-offset-neutral-900 hover:ring-neutral-100 ${bg.id == selectedBackground ? 'ring-1 ring-neutral-100' : ''}`}
                                                            style={{backgroundImage: `url(${bg.url})`,
                                                                    backgroundSize: 'cover',
                                                                }}
                                                        ></div>

                                                    ))}
                                            </div>
                                        </div>
                                    </div>
                               </div>
                                <div className="flex justify-center">
                                    <button type="submit" className="btn" onClick={addBoard} >Add Board</button>
                                </div>
                            </form>
                        </div>
                    </div>
            </div>
        </main>
    );
}