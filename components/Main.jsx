import React, { useState, useEffect } from "react";
import { MdPhoto } from "react-icons/md";

import { collection, DocumentSnapshot } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

import Popupform from "./assets/PopupForm";
import Post from "./assets/Post";

import { useAuth } from "../context/auth";
import { db } from "../lib/firebase";

const Main = ({ photoURL, displayName }) => {
    const [popupForm, setPopupForm] = useState(false);
    const [limit, setLimit] = useState(3);

    const [posts, postsloading, postserror] = useCollection(
        db.collection("posts_lt").orderBy("time", "desc").limit(limit),
        {}
    );

    return (
        <div className="w-[60vw] h-[100vh] bg-[#242526] text-[#fff] px-8 flex flex-col items-center no-scrollbar .no-scrollbar::-webkit-scrollbar overflow-y overflow-x-hidden overflow-scroll">
            <div className="flex flex-col w-[full] mx-6 my-10 items-left justify-center text-7xl font-arvo">
                <span>Good morning</span>
            </div>

            <div className="w-[45vw] h-[9vh] bg-[#3a3b3c] mx-8 px-8 rounded-xl text-[#fff] flex items-center">
                <img
                    src={photoURL}
                    alt=""
                    className="h-[50%] rounded-full mx-2"
                />
                <button
                    type="button"
                    className="w-[90%] text-left bg-[#4a4b4dcc] hover:bg-[#767779a9] focus:bg-[#767779a9] rounded-xl text-xl p-2 m-2 "
                    onClick={() => setPopupForm(!popupForm)}
                >
                    <span className="pl-2">
                        What&apos;s your problem {displayName} ?
                    </span>
                </button>
            </div>

            {popupForm && (
                <Popupform
                    photoURL={photoURL}
                    name={displayName}
                    setPopupForm={setPopupForm}
                />
            )}

            <div className="">
                {postserror && (
                    <strong>Error: {JSON.stringify(postserror)}</strong>
                )}
                {postsloading && <span>Collection: Loading...</span>}
                {posts &&
                    posts.docs.map((doc, key) => (
                        <Post key={key} {...doc.data()} />
                    ))}
            </div>
        </div>
    );
};

export default Main;
