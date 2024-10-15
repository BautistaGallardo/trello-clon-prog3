import { url } from "inspector";
import React from "react";

interface BoardIconProps {
    title: string;
    id: string;
    Url: string;
}

const BoardIcon:React.FC<BoardIconProps>=({id,title, Url})=> {
    return (
        <div 
            className="rounded-lg h-[130px] w-full"
            style={{
                backgroundImage: `url(${Url})`,
                backgroundSize: 'cover',
                
            }}
        > 
        <div className="">
            <h3 className="p-4 text-base text-neutral-300 h-4/6 flex mx-auto w-full">
                {title}
            </h3>
        </div>
        </div>
    );
}
export default BoardIcon;
