import { useEffect,useState,useRef } from "react";
import axios from "axios";

interface listCardModal {
    title:string
    id: string
    setListCard: React.Dispatch<React.SetStateAction<any[]>>;
    lists: any[]
    description: string
}


const ListCardModal: React.FC<listCardModal> = ({ title, id, setListCard, lists,description}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isOpenDescription, setIsOpenDescription] = useState<boolean>(false);
    const [descriptionlist, setDescriptionList] = useState<string>("");

    function deleteListCard(id: string) {
        axios({
            method: "delete",
            url: "/api/listCard/deleteListCard",
            data: {
                id: id
            }
        });
        setIsOpen(!isOpen);
        const newListCard = lists.filter((list) => list.id !== id);
        setListCard(newListCard);
    }

    const handleChanges = (e: any) => {
        e.preventDefault();
        console.log(e.target.value);
        setDescriptionList(e.target.value);
    }

    const addDescription = (listId:string) => {
        axios({
            method: "put",
            url: "/api/listCard/addDescription",
            data: {
                id: listId,
                description: descriptionlist
            }
        });
        setDescriptionList(description);
    }
    
    return (
        <main className={isOpen ? "hidden" : " max-h-[90%]"}>
            <div className="fixed inset-0 bg-neutral-900 bg-opacity-50 z-50"></div>
            <div className="fixed inset-0 flex flex-col items-center justify-center z-50 cursor-default ">
                <div className={isOpen ? "hidden" : "modal-open w-1/3 h-auto bg-base-100 p-6 rounded-lg"}>
                    <div className="h-full w-full">
                        <div className="mb-5 flex w-full justify-between">
                            <h2 className="text-xl">{title}</h2>
                            <div onClick={() => setIsOpen(!isOpen)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                        </div>
                        <div className={!isOpenDescription ? "" : "mb-5"}>
                            <h2 className="text-lg">Description</h2>
                            <div className="flex justify-between">
                                <div className="break-words w-11/12">
                                    {isOpenDescription ? (
                                        <div className="">
                                            <textarea
                                                id="description"
                                                name="description"
                                                rows={3}
                                                className="mt-1 textarea block w-full px-3 py-2 bg-base-100 rounded-md shadow-sm"
                                                defaultValue={description}
                                                placeholder="Description input"
                                                onChange={handleChanges}
                                            ></textarea>
                                            <div onClick={() => addDescription(id)} className=" w-full flex justify-end mt-1"><button onClick={()=>setIsOpenDescription(!isOpenDescription)} className=" p-2 hover:ring-1 hover:ring-slate-300 rounded-lg">Guardar</button></div>
                                        </div>
                                        
                                    ) : (
                                        <div onClick={() => setIsOpenDescription(!isOpenDescription)} className={!isOpenDescription ? "h-ful min-h-5 w-full mb-2" : " hidden"}>
                                            <textarea
                                                id="description"
                                                name="description"
                                                className="mt-1 textarea block w-full px-3 py-2 bg-base-100 rounded-md shadow-sm"
                                                defaultValue={description}
                                                placeholder="Description input"
                                            ></textarea>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className=" flex justify-end">
                            <button className="justify-start flex" onClick={() => deleteListCard(id)}> 
                                <span className=" btn ring-1 ring-error bg-base-200 p-2 rounded-md hover:text-error">
                                    Borrar Lista
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ListCardModal;
