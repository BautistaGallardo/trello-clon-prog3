'use client'
import Card from "../../card/card";
import { useDroppable} from "@dnd-kit/core";
import {SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";



interface listContentProps {
    listId: string;
    cards: any[];
    lists: any[];
    setListCard: React.Dispatch<React.SetStateAction<any[]>>;
}

const listContent:React.FC<listContentProps>= ({listId, cards, setListCard, lists}) => {
    
    const {setNodeRef} = useDroppable({
        id: listId
    });
    
    return (

                <SortableContext items={cards} strategy={verticalListSortingStrategy}>
                    <div className=" pt-1" ref={setNodeRef}>
                        {
                            cards.map((card: any) => {
                                return <Card title={card.title} lists={lists} content={card.content} id={card.id} key={card.id} listId={listId} setCards={setListCard}/>
                            })
                        }
                    </div>
                </SortableContext>
    );
}

export default listContent;