'use client'
import NavBar from "@/components/navBar/page";
import BoardContent from "@/components/board/boardContent";
import { useParams } from "next/navigation";

export default function Board() {
  const {id} = useParams();
  console.log(id);
     return (
      <main className="">
            <NavBar />
            <BoardContent id={id as string} title=""/>
      </main>
    );
  }

