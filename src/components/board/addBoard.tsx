import React from "react";


export default function BoardIcon() {
    return (
        <div className=" bg-base-100 cursor-pointer opacity-70 hover:opacity-100 rounded-lg h-[130px]"> 
            <div className=" justify-center h-full items-center grid mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-9 h-9">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </div>
        </div>
    );
}