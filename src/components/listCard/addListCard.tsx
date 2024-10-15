'use client'
import React,{ useState} from "react";
import axios from "axios";
import { on } from "events";

interface AddListCardProps {
    boardId: string
    onAddList: (newList: any) => void
  }

const AddListCard:React.FC<AddListCardProps> = ({boardId, onAddList}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [titleList, setTitle] =  useState({title:""})

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle({ ...titleList, [e.target.name]: e.target.value });
    console.log(titleList.title);
  }
  

  const addListCard = async (e:any) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/listCard/addListCard", {
        title: titleList.title,
        content: "content",
        boardId: boardId,
      });
      onAddList(res.data);
      setIsOpen(!isOpen);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={!isOpen? " w-72 bg-neutral-900 opacity-80 hover:opacity-95 p-2 rounded-xl text-slate-100 cursor-pointer" : " w-72 bg-neutral-900 p-2 rounded-xl text-slate-100"}>
        <button className={!isOpen? `bg-transparent w-full h-8`: ` hidden`} onClick={() => setIsOpen(!isOpen)}>
            Add List
        </button>
        {
          isOpen&&(
            <form action="">
              <input type="text" placeholder="Title" onChange={handleChanges} name="title" className="input input-bordered w-full max-w-xs" />
              <div className=" flex justify-between p-2">
                  <button className="btn btn-sm mt-2 text-center" type="submit" onClick={addListCard}> Add Card</button>
                  <button className="btn btn-xs btn-circle btn-outline my-auto" onClick={() => setIsOpen(!isOpen)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
              </div>
            </form>
          )
        }

    </div>
  );
}

export default AddListCard;