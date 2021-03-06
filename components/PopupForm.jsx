import React, { useEffect, useState } from "react";

import { FileUploader } from "react-drag-drop-files";
import { useAuth } from "../context/auth";
const fileTypes = ["JPG", "PNG"];

const Popupform = ({ photoURL, name, setPopupForm, visible }) => {
    const { addPost } = useAuth();

    const [alert, setAlert] = useState(false);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFiles] = useState({
        file: null,
        url: null,
    });

    const handleChange = (file) => {
        setFiles({ file: file, url: URL.createObjectURL(file) });
    };

    const closeForm = () => {
        setPopupForm(false);
    };

    const postHandler = (e) => {
        e.preventDefault();

        if (title != "_blank" && desc != "") {
            setAlert(false);
            addPost(e, title, desc, file, closeForm);
        } else {
            setAlert(true);
            setTimeout(() => {
                setAlert(false);
            }, 5000);
            console.log("test", alert);
        }
    };

    return (
        <div
            className={`${visible} left-0 top-0 absolute w-[100vw] h-[100vh] flex items-center justify-center bg-[#ffffff98] duration-300`}
            onClick={() => closeForm()}
        >
            <form
                className="w-[35vw] lg:w-[75vw] md:w-[90vw] h-[75vh] text-[#222] bg-[#fff] shadow-[0px_2px_10px_1px_rgba(0,0,0,0.3)] rounded-md pt-3 px-8 relative"
                onClick={(e) => e.stopPropagation()}
                onSubmit={(e) => postHandler(e)}
            >
                <h1 className="w-[100%] text-4xl p-2 pb-4 text-center broder-b-2 font-arvo">
                    Create post
                </h1>
                {/* <div
                    className={` text-[1rem] p-[.1rem] border-[.05rem] text-center bg-[#dc354646] border-[#dc3545] text-[#dc3545] transition ease-in-out duration-500 z-[20] 
                    ${alert ? "opacity-100" : "opacity-0"}`}
                >
                    Complete all required fields
                </div> */}
                <div className="flex flex-col items-center">
                    <div className="flex items-center m-2 w-[100%]">
                        <img
                            src={photoURL}
                            alt=""
                            className="rounded-full w-[2rem]"
                        />
                        <p className="text-xl px-4">{name}</p>
                    </div>
                    <div className="w-[100%] flex flex-col items-center py-4">
                        <select
                            name=""
                            id=""
                            onChange={(e) => setTitle(e.target.value)}
                            className={`form-control px-[4px] py-[.056rem]  border-[.06rem] border-b-0 resize-none w-[100%] h-[5vh]  bg-[#fff] text-xl text-[#222] focus:border-none focus:outline-none 
                                ${
                                    alert
                                        ? "border-[#de3545] duration-0"
                                        : "border-[#fff] duration-300"
                                }`}
                        >
                            <option value="_blank" selected disabled hidden>
                                Choose your category *
                            </option>
                            <option value="Math"> ???? Math </option>
                            <option value="History"> ??????? History</option>
                            <option value="Biology"> ???? Biology</option>
                            <option value="Spanish"> ???????? Spanish</option>
                            <option value="Geography"> ???? Geography</option>
                            <option value="Chemistry"> ???? Chemistry</option>
                            <option value="Physics"> ?????? Physics</option>
                            <option value="IT"> ??????????? IT</option>
                            <option value="Other"> ???? Other</option>
                        </select>
                        <textarea
                            type="text"
                            onChange={(e) => setDesc(e.target.value)}
                            className={`form-control px-2 py-2 resize-none w-[100%] h-[20vh]  border-[.06rem] border-t-0  bg-[#fff] text-xl text-[#222] focus:border-none focus:outline-none
                            ${alert ? "border-[#de3545]" : "border-[#fff]"}`}
                            placeholder={`Add description to specify the task *`}
                        />
                    </div>
                    <FileUploader
                        handleChange={handleChange}
                        name="file"
                        types={fileTypes}
                        maxSize={3}
                        className="drop_area"
                    >
                        {file.url ? (
                            <img
                                src={file.url}
                                alt=""
                                className="max-h-[20vh]"
                            />
                        ) : (
                            <div className="min-w-[28vw] lg:w-[70vw] w-[100%] h-[20vh] border-2 flex flex-col items-center justify-center border-dotted">
                                <h1>Drop or get file</h1>
                                <h5>[png, jpeg]</h5>
                            </div>
                        )}
                    </FileUploader>
                </div>

                <button
                    type="submit"
                    className="hover:bg-[#390099] hover:text-white w-[96%] bg-[#E4E6E9] text-[#222] font-800  text-md py-3 px-16 rounded bottom-3 right-[2%] absolute duration-200"
                >
                    Share
                </button>
            </form>
        </div>
    );
};

export default Popupform;
