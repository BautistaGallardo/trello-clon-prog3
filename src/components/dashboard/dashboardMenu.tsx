import React from "react";
import axios from "axios";

interface BoardsListProps {
    boards: Array<any>
    setBoards: React.Dispatch<React.SetStateAction<Board[]>>;
}

interface Board {
    id: string,
    title: string,
    content: string,
    backgroudId: string,
    backgroud: {
        select: {
            url: string
        }
    }
}

const BoardsList: React.FC<BoardsListProps> = ({ boards,setBoards }) => {

    function deleteBoard(id: string) {
        axios({
            method: "delete",
            url: "/api/board/deleteBoard",
            data: {
                id: id
            }
        });
        const newBoards = boards.filter((board) => board.id !== id);
        setBoards(newBoards);
    }

    return (
        <div className=" flex">
            <ul className=" w-full menu">
                {boards.map((board) => (
                    <li key={board.id} className="p-1 flex justify-between">
                        <div className=" w-full flex justify-between">
                            <a className="w-full overflow-hidden" href={`/pages/board/${board.id}`}><div className=" w-full overflow-hidden">{board.title}</div></a>
                            <div className="dropdown dropdown-bottom">
                                <div tabIndex={0} role="button" className=""><h3 className=" flex justify-center">...</h3></div>
                                <ul  tabIndex={0} className="dropdown-content menu bg-base-100  z-[1] w-52 p-2 shadow">
                                    <li ><a onClick={() => deleteBoard(board.id)}>Eliminar</a></li>
                                    <li><a>Cambiar fondo</a></li>
                                </ul>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BoardsList;
