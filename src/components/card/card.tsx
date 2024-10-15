'use client'

import React,{ useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ModalCard from "../modals/modalCard";

interface CardProps {
    title: string;
    content: string;
    id:string
    listId: string;
    lists: any[];
    setCards: React.Dispatch<React.SetStateAction<any[]>>;
}

const Card: React.FC<CardProps>= ({title,content, id, listId, setCards, lists}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { 
        attributes, 
        listeners,
        setNodeRef,
        transform, 
        transition 
    } = useSortable({
        id: id,
        data: {
            id: listId,
            title,
            type: "card"
        },
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div 
            style={style}
            {...attributes}
            ref={setNodeRef}
            className="card flex m-3 p-3 bg-base-100 rounded-lg text-slate-300 ">
            <div className="flex justify-between h-full">
                <div className="cursor-pointer w-10/12 break-words"
                {...listeners}
                >
                    <h5 className=" ">{title}</h5>
                </div>
                <div className="ml-2 h-auto w-auto flex justify-center items-center ">
                    <svg  onClick={() => setIsOpen(!isOpen)}  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="flex justify-center items-center h-auto w-4 hover:opacity-85">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                    </svg>
                </div>
            </div>
            {isOpen &&(
                    <div><ModalCard title={title} lists={lists} description={content} cardId={id} setCards={setCards}/></div>
            )}
            
        </div>
    );
};

export default Card;