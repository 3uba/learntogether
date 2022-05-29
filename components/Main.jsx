import React, { useState, useEffect } from "react";
import Popupform from "./PopupForm";
import Post from "./Post";
import { useAuth } from "../context/auth";

/**
 * Jest to glówna sekcja apliakcji,
 * odpowiada za mozliwość dodania posta,
 * i za wyswietlanie postów
 */

const Main = ({ photoURL, displayName, id_name }) => {
    const [popupForm, setPopupForm] = useState(false);
    const { getPosts } = useAuth();

    const [posts, setPosts] = useState([]);
    const [lastKey, setLastKey] = useState("");
    const [nextPosts_loading, setNextPostsLoading] = useState(false);

    useEffect(() => {
        getPosts
            .postsFirstBatch()
            .then((res) => {
                setPosts(res.posts);
                setLastKey(res.lastKey);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [getPosts]);

    const fetchMorePosts = (key) => {
        console.log("fetching more posts...");

        if (key) {
            setNextPostsLoading(true);
            getPosts
                .postsNextBatch(key)
                .then((res) => {
                    setLastKey(res.lastKey);

                    setPosts(posts.concat(res.posts));
                    setNextPostsLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setNextPostsLoading(false);
                });
        }
    };

    return (
        <div className="w-[60vw] 2xl:w-[82vw] md:w-[90vw] h-[96h] bg-[#f0f2f5] text-[#222] px-8 flex flex-col items-center no-scrollbar .no-scrollbar::-webkit-scrollbar overflow-y overflow-x-hidden overflow-scroll">
            <div className="flex flex-col w-[full] mx-6 my-10 items-left justify-center md:text-4xl text-7xl font-arvo">
                <span className="drop-shadow-xl ">Good morning</span>
            </div>

            <div className="w-[75%] xl:w-[90%] h-[9vh] md:h-[6.5vh] bg-[#ffffff] shadow-md mx-8 px-8 mb-2 rounded-md text-[#222] flex items-center">
                <img
                    src={photoURL}
                    alt=""
                    className="h-[50%] rounded-full mx-2"
                />
                <button
                    type="button"
                    className="w-[100%] text-left bg-[#f0f2f5] hover:bg-[#E4E6E9] focus:bg-[#E4E6E9] rounded-md text-xl md:text-[1rem] p-2 md:p-1 m-2 md:m-1 pr-0 mr-0"
                    onClick={() => setPopupForm(!popupForm)}
                >
                    <span className="pl-2">
                        What&apos;s your problem {displayName} ?
                    </span>
                </button>
            </div>

            {/* {popupForm && ( */}
            <Popupform
                photoURL={photoURL}
                name={displayName}
                setPopupForm={setPopupForm}
                visible={`${
                    popupForm ? "opacity-100 z-10" : "opacity-0 z-[-1]"
                }`}
            />
            {/* )} */}

            <div>
                <div>
                    {posts.map(
                        ({
                            id,
                            id_name,
                            user_name,
                            user_photo,
                            title,
                            desc,
                            time,
                        }) => (
                            <Post
                                key={id}
                                id_name={id_name}
                                name={user_name}
                                picture={user_photo}
                                title={title}
                                desc={desc}
                                time={time}
                            />
                        )
                    )}
                </div>
                {nextPosts_loading ? (
                    <div className="">Loading...</div>
                ) : lastKey ? (
                    <button onClick={() => fetchMorePosts(lastKey)}>
                        More posts
                    </button>
                ) : (
                    <div className="">You are up to date!</div>
                )}
            </div>
        </div>
    );
};

export default Main;
