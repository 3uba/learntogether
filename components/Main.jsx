import React, { useState, useEffect } from "react";
import Popupform from "./PopupForm";
import Post from "./Post";
import { useAuth } from "../context/auth";

const Main = ({ photoURL, displayName }) => {
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
        <div className="w-[60vw] h-[100vh] bg-[#242526] text-[#fff] px-8 flex flex-col items-center no-scrollbar .no-scrollbar::-webkit-scrollbar overflow-y overflow-x-hidden overflow-scroll">
            <div className="flex flex-col w-[full] mx-6 my-10 items-left justify-center text-7xl font-arvo">
                <span>Good morning</span>
            </div>

            <div className="w-[45vw] h-[9vh] bg-[#3a3b3c] mx-8 px-8 rounded-sm text-[#fff] flex items-center">
                <img
                    src={photoURL}
                    alt=""
                    className="h-[50%] rounded-full mx-2"
                />
                <button
                    type="button"
                    className="w-[90%] text-left bg-[#4a4b4dcc] hover:bg-[#767779a9] focus:bg-[#767779a9] rounded-sm text-xl p-2 m-2 "
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

            <div>
                <div>
                    {posts.map(
                        ({ id, user_name, user_photo, title, desc, time }) => (
                            <Post
                                key={id}
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
