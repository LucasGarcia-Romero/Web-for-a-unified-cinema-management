import React from "react";

export default function Modal({ children, onClose }) {
    return (

        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className=" text-black rounded-lg shadow-lg w-11/12 max-w-[1000px] p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-8 right-8 text-black rounded-full p-2 focus:outline-none hover-grow-close group"
                >
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24"  className='transition-colors duration-200 group-hover:stroke-gray-400'>
                        <path d="M5 5L19 19M5 19L19 5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                </button>

                {children}
            </div>
        </div>
    );
}
