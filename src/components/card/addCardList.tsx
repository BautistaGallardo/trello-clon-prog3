'use client'
import React, { useState } from "react";
import axios from "axios";

interface AddCardListProps {
    id: string;
    onAddCard: (newCard: any, listId: string) => void
}

const AddCardList: React.FC<AddCardListProps> = ({id, onAddCard}) => {
    const [card ,setCard] = useState({title:""})
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleChanges = (e: any) => {
        e.preventDefault();
        setCard({...card, [e.target.name]: e.target.value});
    }
    const addCard = async (e: any) => {
        try {
            e.preventDefault();
            const res = await axios.post("/api/card/addCard", {
                title: card.title,
                content: "",
                listCardId: id
            });
            onAddCard(res.data, id);
            setIsOpen(!isOpen);
        } catch (error: any) {
            console.log(error.response.data);
        }
    };

    return (
        <div className="">
            {!isOpen && (
                <button className= "btn btn-sm rounded-md w-full" onClick={() => setIsOpen(!isOpen)}>
                    Add Card
                </button>    
            )}
            {isOpen &&(
            <form  className= ''>
                <div className="w-full">
                    <div className=" m-3">
                        <textarea onChange={handleChanges} placeholder="card title" name="title" cols={20} className=" p-2 rounded-md bg-base-100"></textarea>
                    </div>
                </div>
                <div className="flex justify-between px-3 ">
                    <button type="submit" className="btn btn-sm my-auto" onClick={addCard} >Add Card</button>
                    <button className=" btn btn-xs my-auto btn-circle btn-outline" onClick={() => setIsOpen(!isOpen)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
            </form>
            )}
        </div>
    

    );
};

export default AddCardList;
