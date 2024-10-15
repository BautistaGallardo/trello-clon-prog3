'use client'
import React from "react";
import { useState } from "react";
import AddCard from "../card/addCardList";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ListContent from "./componentsListCard/listContent";
import ListCardModal from "./../modals/ListCardModal"


interface ListCardProps {
    id: string;
    title: string;
    cards: any;
    onAddCard: (newCard: any, listId: string) => void
    setListCardBoard: React.Dispatch<React.SetStateAction<any[]>>;
    lists: any[];
    description: string;
}

const ListCard: React.FC<ListCardProps> = ({id,title,cards, onAddCard, setListCardBoard, lists, description}) => {
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
            id, 
            title,
            type: "list"
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
            className=" min-w-[253px] text-slate-100">
            <div className="h-min bg-neutral-900 p-2 rounded-lg">
                <div  className=" ">
                    <div  className="flex justify-between px-3 gap-x-1">
                        <div {...listeners} className=" w-11/12 break-words"><h3>{title}</h3> </div>
                        <button className=" hover:opacity-70 flex align-top">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5" onClick={() => setIsOpen(!isOpen)}>
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
                            </svg>
                        </button>
                    </div>
                        <ListContent listId={id} cards={cards} setListCard={setListCardBoard} lists={lists}/>
                    </div>
                <div>
                    <AddCard id={id} onAddCard={onAddCard} />
                </div>
            </div>
            {isOpen &&(
                <ListCardModal title={title} id={id} setListCard={setListCardBoard} lists={lists} description={description}/>
            )}
        </div>
    )
}

export default ListCard;