'use client'
import React from "react";
import { useState, useEffect } from "react";
import ListCard from "@/components/listCard/listCard";
import AddListCard from "@/components/listCard/addListCard";
import axios from "axios";
import { DndContext,closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";

interface BoardIconProps {
    title: string;
    id: string;
}

const BoardIcon:React.FC<BoardIconProps>=({id})=> {
    const [bg, setBg] = useState<string>();
    const [lists, setLists] = useState<any[]>([]);
    

    useEffect( () => {
        const fetchList = async () => {
            try{
                const response = await axios({
                    method: "get",
                    url: "/api/listCard/getListCardByBoardId",
                    params: {
                        id: id
                    }
                });
                setLists(response.data);
            }catch(error){
                console.log("Error fetching lists:", error);
            }
        }
        fetchList();
    },[])

    

    function upadateCard(newLists:Array<any>){
        axios({
            method: "put",
            url: "/api/card/updateCardPosition",
            data: {
                newLists: newLists
            }
        });
    }
    
    useEffect(()=> {
        const background = async () => {
            try {
                const response = await axios({
                    method: "get",
                    url: "/api/background/getBackgroundByBoardId",
                    params: {
                        id: id
                    }
                });
                setBg(response.data.url);
            } catch (error) {
                console.log("Error fetching background:", error);
            }   
        }
        background();
    })

    function upadateCardList(newLists:Array<any>){
        axios({
            method: "put",
            url: "/api/listCard/updateCardListIndex",
            data: {
                newLists: newLists
            }
        });
    }

    
    

    const handleDragEnd = (event: any) => {
        const {active, over} = event;
        const activeIdList = active.data.current.id;
        const overIdList = over.data.current.id;
        const activeIsCard = active.data.current.type === "card";
        const activeIsList = active.data.current.type === "list";
        const overIsCard = over.data.current.type === "card";
        const overIsList = over.data.current.type === "list";

    
        // moving list to another list
        if ( (active.id !== over.id) && ( activeIsList && overIsList) ) {
            const oldIndex = lists.findIndex((list: any) => list.id === active.id);
            const newIndex = lists.findIndex((list: any) => list.id === over.id);
            const newLists = arrayMove(lists, oldIndex, newIndex);
            setLists(newLists);
            console.log("list:", newLists);
            upadateCardList(newLists);
        }
    }

    const DragOver = (event: any) => {
        const {active, over} = event;
        const activeIdList = active.data.current.id;
        const overIdList = over.data.current.id;
        const activeIsCard = active.data.current.type === "card";
        const activeIsList = active.data.current.type === "list";
        const overIsCard = over.data.current.type === "card";
        const overIsList = over.data.current.type === "list";

        // reordering cards into the same list
        if ( (activeIdList === overIdList) && ( activeIsCard && overIsCard) && (active.id !== over.id) ) {
            const listIndex = lists.findIndex((list: any) => list.id === active.data.current.id);
            const list = lists[listIndex];
            const oldIndex = list.card.findIndex((card: any) => card.id === active.id);
            const newIndex = list.card.findIndex((card: any) => card.id === over.id);
            const newCards = arrayMove(list.card, oldIndex, newIndex);
            list.card = newCards;
            setLists([...lists]);
            upadateCard(lists);
        }

        // moving card to another list
        if ( (activeIdList !== overIdList) && (active.id !== over.id) && (activeIsCard)) {
            const oldListIndex = lists.findIndex((list: any) => list.id === activeIdList);
            const newListIndex = lists.findIndex((list: any) => list.id === overIdList);
            const oldList = lists[oldListIndex];
            const newList = lists[newListIndex];
            const oldCardIndex = oldList.card.findIndex((card: any) => card.id === active.id);
            const newCard = oldList.card[oldCardIndex];
            oldList.card.splice(oldCardIndex, 1);
            newList.card.push(newCard);
            setLists([...lists]);
            upadateCard(lists);        
        }
    }

    const handleAddList = (newList: any) => {
        setLists((prevLists) => [...prevLists, newList]);
    };
    const handleAddCard = (newCard: any, listId: string) => {
        const listIndex = lists.findIndex((list: any) => list.id === listId);
        const list = lists[listIndex];
        console.log("card:", newCard);
        list.card.push(newCard.data);
        setLists([...lists]);
    }

    return (
        
            <div className="flex gap-x-5 h-screen overflow-auto p-4 w-full"
                 style={{
                    backgroundImage: `url(${bg})`,
                    backgroundSize: 'cover'    
                }}
            >
                <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                onDragOver={DragOver}
                >       
                    <SortableContext items={lists} strategy={horizontalListSortingStrategy}>
                        {lists.map((list: any) => (
                            <ListCard key={list.id} id={list.id} title={list.title} description={list.content} cards={list.card} lists={lists} onAddCard={handleAddCard} setListCardBoard={setLists}/>
                        ))}
                    </SortableContext>
                    <div className="mx-3">
                        <AddListCard boardId={id} onAddList={handleAddList}/>
                    </div>
                </DndContext>  
            </div>
    );
}

export default BoardIcon;