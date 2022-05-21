import React, { useEffect, useState } from "react";

import { FileUploader } from "react-drag-drop-files";
import { useAuth } from "../context/auth";
const fileTypes = ["JPG", "PNG"];

const Popupform = ({ photoURL, name, setPopupForm }) => {
    const { addPost } = useAuth();

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

    return (
        <div
            className="left-0 top-0 absolute w-[100vw] h-[100vh] flex items-center justify-center bg-[#1c1c1dbb]"
            onClick={() => closeForm()}
        >
            <form
                className="w-[30vw] h-[75vh] text-[#fff] bg-[#3a3b3c] rounded-xl border-2 border-[#2a2b2c] p-3 relative"
                onClick={(e) => e.stopPropagation()}
                onSubmit={(e) => {
                    addPost(e, title, desc, file, closeForm);
                }}
            >
                <h1 className="w-[100%] text-4xl p-2 text-center broder-b-2 font-arvo">
                    Create post
                </h1>
                <div className="flex flex-col items-center">
                    <div className="flex items-center m-5 px-5 w-[100%]">
                        <img
                            src={photoURL}
                            alt=""
                            className="rounded-full w-[50px]"
                        />
                        <p className="text-xl p-2">{name}</p>
                    </div>
                    <div className="w-[100%] flex flex-col items-center m-3 py-2 ">
                        <textarea
                            type="text"
                            onChange={(e) => setTitle(e.target.value)}
                            className="form-control resize-none w-[90%] p-2 h-[5vh] bg-[#3a3b3c] text-xl text-[#fff] focus:border-none focus:outline-none"
                            placeholder={`Add title of your problem `}
                        />
                        <textarea
                            type="text"
                            onChange={(e) => setDesc(e.target.value)}
                            className="form-control resize-none w-[90%] p-2 h-[10vh] bg-[#3a3b3c] text-xl text-[#fff] focus:border-none focus:outline-none"
                            placeholder={`Add description to specify the task`}
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
                            <div className="w-[25vw] h-[20vh] border-2 flex flex-col items-center justify-center border-dotted">
                                <h1>Drop or get file</h1>
                                <h5>[png, jpeg]</h5>
                            </div>
                        )}
                    </FileUploader>
                </div>

                <button
                    type="submit"
                    className="bg-[#2a2b2c] hover:bg-[#242526] text-white font-bold py-2 px-4 rounded bottom-3 right-3 absolute"
                >
                    Publish
                </button>
            </form>
        </div>
    );
};

export default Popupform;
