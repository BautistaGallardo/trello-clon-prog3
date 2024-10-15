import React, { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

interface ModalCardProps {
    title: string;
    description: string;
    cardId: string;
    setCards: React.Dispatch<React.SetStateAction<any[]>>;
    lists: any[];
}

interface Comment {
    id: string;
    content: string;
    userEmail: string;
}

const ModalCard: React.FC<ModalCardProps> = ({ title, description, cardId, setCards, lists }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { data: session } = useSession();
    const userEmail = session?.user?.email;
    const userPhoto = session?.user?.image;
    const [comments, setComments] = useState<Comment[]>([]);
    const formRef = useRef<HTMLFormElement>(null);
    const [isOpenDescription, setIsOpenDescription] = useState<boolean>(false);
    const [descriptionCard, setDescriptionCard] = useState<string>("");

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await axios.post("/api/comments/getCommentsCard", { cardId });
                setComments(res.data);
            } catch (error: any) {
                console.error(error);
            }
        };
        fetchComments();
    }, [cardId]);

    const addComment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const commentContent = form.commentContent.value;

        try {
            const res = await axios.post("/api/comments/addCommentCard", {
                content: commentContent,
                cardId,
                userEmail,
            });
            const newComment = res.data;
            setComments([...comments, newComment]);
            form.reset();
        } catch (error: any) {
            console.error(error);
        }
    };

    function deleteCard(id: string) {
        axios({
            method: "delete",
            url: "/api/card/deleteCard",
            data: {
                id: id
            }
        });
        const newCard = lists.map((list) => {
            return {
                ...list,
                card: list.card.filter((card: any) => card.id !== id)
            };
        });
        setCards(newCard);
        setIsOpen(!isOpen);
    }

    const handleChanges = (e: any) => {
        e.preventDefault();
        console.log(e.target.value);
        setDescriptionCard(e.target.value);
    }

    const addDescription = (cardId:string) => {
        axios({
            method: "put",
            url: "/api/card/addDescription",
            data: {
                id: cardId,
                description: descriptionCard
            }
        });
        setDescriptionCard(description);
    }


    return (
        <main className={isOpen ? "hidden" : " max-h-[90%]"}>
            <div className="fixed inset-0 bg-neutral-900 bg-opacity-50 z-50"></div>
            <div className="fixed inset-0 flex items-center justify-center z-50 cursor-default">
                <div className={isOpen ? "hidden" : "modal-open h-auto overflow-auto 2xl:w-1/3 xl:w-2/4 lg:w-3/4 sm:w-3/4 w-11/12 bg-base-100 p-6 rounded-lg"}>
                    <div className="h-full w-full">
                        <div className="mb-5 flex w-full justify-between">
                            <div className="break-words w-11/12">
                                <h2 className="text-xl">{title}</h2>
                            </div>
                            <div onClick={() => setIsOpen(!isOpen)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                        </div>
                        <div className={!isOpenDescription ? "mb-12" : "mb-5"}>
                            <h2 className="text-lg">Description</h2>
                            <div className="flex justify-between relative">
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
                                            <div onClick={() => addDescription(cardId)} className=" w-full flex justify-end mt-1"><button onClick={()=>setIsOpenDescription(!isOpenDescription)} className=" p-2 hover:ring-1 hover:ring-slate-300 rounded-lg">Guardar</button></div>
                                        </div>
                                        
                                    ) : (
                                        <div onClick={() => setIsOpenDescription(!isOpenDescription)} className={!isOpenDescription ? "h-ful min-h-5 w-full absolute z-10" : " hidden"}>
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
                        <div className=" max-h-96 overflow-auto">
                            <h3 className="text-lg">Comments area</h3>
                            <form className="flex" onSubmit={addComment} ref={formRef}>
                                <div className="px-2 mt-1 h-full flex">
                                    <div className="w-10 h-10 rounded-full">
                                        <img className="w-10 h-10 rounded-full cursor-pointer" src={userPhoto as string} alt="User" />
                                    </div>
                                </div>
                                <div className="h-full w-11/12 justify-center">
                                    <textarea id="comment" placeholder="Comment input" name="commentContent" rows={1} className="mt-1 textarea block w-full px-3 py-2 bg-base-100 rounded-md shadow-sm"></textarea>
                                    <button className="mt-2 btn p-1">Add Comment</button>
                                </div>
                            </form>
                            <div className="overflow-auto">
                                {comments.map((comment, index) => (
                                    <div key={index} className="flex justify-top items-top mt-1">
                                        <div className="p-2 h-full flex justify-top items-top">
                                            <div className="w-10 h-10 rounded-full">
                                                <img className="w-10 h-10 rounded-full cursor-pointer" src={userPhoto as string} alt="User" />
                                            </div>
                                        </div>
                                        <div className="h-full w-11/12 flex justify-top items-top">
                                            <div className="mt-1 block w-full px-3 py-2 bg-base-200 rounded-md shadow-sm">
                                                <div className="flex justify-between">
                                                    <div className="break-words w-full flex justify-between">
                                                        <p className="w-full">{comment.content}</p>
                                                    </div>
                                                    <div>{comment.userEmail}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-end w-full mt-2">
                            <button className="btn ring-1 ring-error hover:text-error" onClick={() => deleteCard(cardId)}>Borrar carta</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ModalCard;
