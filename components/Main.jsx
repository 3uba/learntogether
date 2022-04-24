import React from "react";
import { MdPhoto } from "react-icons/md";

const Main = ({ photoURL, displayName }) => {
    return (
        <div className="w-[60vw] h-[100vh] bg-[#242526] text-[#fff] px-8">
            <div className="flex flex-col w-[full] h-[15vh] items-left justify-center pl-28 text-7xl arvo">
                <span>Good morning</span>
            </div>
            <div className="w-[full] h-[10vh] bg-[#3a3b3c] mx-8 px-8 rounded-xl text-[#fff] flex items-center">
                <img
                    src={photoURL}
                    alt=""
                    className="h-[50%] rounded-full mx-2"
                />
                <input
                    type="text"
                    className="w-[70%] bg-[#4a4b4dcc] hover:bg-[#767779a9] focus:bg-[#767779a9] rounded-xl text-xl p-2 m-2 "
                    placeholder={` What's your problem ${displayName} ?`}
                    onFocus={() => console.log("test")}
                />
                <button className="w-[20%] text-center flex justify-center items-center bg-[#4a4b4c] hover:bg-[#767779a9] p-2 rounded-xl">
                    <MdPhoto size={20} className="mx-2" />
                    Add photo
                </button>
            </div>
        </div>
    );
};

export default Main;
