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
        <div className="w-[60vw] 2xl:w-[82vw] border-x-[0.1rem] border-[#ddd] xl:w-[90vw] md:w-[100vw] h-[96h] bg-[#f0f2f5] text-[#222] px-8 lg:px-0 flex flex-col items-center no-scrollbar .no-scrollbar::-webkit-scrollbar overflow-y overflow-x-hidden overflow-scroll">
            <div className="flex flex-col w-[full] mx-6 sm:mx-1 my-10 items-left justify-center md:text-4xl text-7xl font-arvo">
                <span className="drop-shadow-xl ">Good morning</span>
            </div>

            <div className="w-[45vw] xl:w-[95%] md:pb-[.4rem] md:pt-0 bg-[#ffffff] shadow-md px-8 lg:px-0 mb-2 rounded text-[#222] ">
                <div className="flex items-center pt-2 ">
                    <img
                        src={photoURL}
                        alt=""
                        className="h-[2.6rem] lg:h-[2rem] rounded-full mx-2"
                    />
                    <button
                        type="button"
                        className="w-[100%] text-left bg-[#f0f2f5] hover:bg-[#E4E6E9] focus:bg-[#E4E6E9] rounded-md text-[1.2rem] lg:text-[1rem] md:text-[1rem] p-2 lg:p-2 md:p-1 m-2 md:m-1 pr-0 mr-0"
                        onClick={() => setPopupForm(!popupForm)}
                    >
                        <span className="pl-2">
                            {/* {window.innerWidth > 800
                                ? `What's your problem ${displayName} ?`
                                : `What's your problem ${
                                      displayName.split(" ")[0]
                            }`} */}
                            What&apos;s your problem {displayName.split(" ")[0]}{" "}
                            ?
                        </span>
                    </button>
                </div>
                <hr className="py-2 lg:hidden" />
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

            <div className="w-[100%]">
                <div className="flex flex-col items-center w-[100%]">
                    {posts.map(
                        (
                            {
                                id,
                                id_name,
                                user_name,
                                user_photo,
                                title,
                                desc,
                                time,
                                comments,
                            },
                            key
                        ) => (
                            <div key={key} className="w-[45vw] xl:w-[95%]">
                                <Post
                                    id={id}
                                    id_name={id_name}
                                    name={user_name}
                                    photoURL={user_photo}
                                    title={title}
                                    desc={desc}
                                    time={time}
                                    comments={comments}
                                />
                            </div>
                        )
                    )}
                </div>
                <div className="md:mb-[5rem]">
                    {nextPosts_loading ? (
                        <div className="">Loading...</div>
                    ) : lastKey ? (
                        <button
                            className=""
                            onClick={() => fetchMorePosts(lastKey)}
                        >
                            More posts
                        </button>
                    ) : (
                        <div className="">You are up to date!</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Main;
