/* eslint-disable @next/next/link-passhref */
import React, { useState, useEffect } from "react";
import Link from "next/link";

import { MdOutlineModeComment, MdModeComment } from "react-icons/md";

import { secondstoddmmyy } from "./utils/timeConverter";
import { useAuth } from "../context/auth";
/**
 * Post.jsx
 * Jest to szblon postu,
 * trafiaja tu dane z Main.jsx
 */

const Post = ({ id, id_name, name, photoURL, title, desc, time, comments }) => {
    const [user, setUser] = useState();
    const [form, setForm] = useState(false);
    const [comment, setComment] = useState("");
    const [postComments, setPostComments] = useState(comments);

    const { getUser, sendComment } = useAuth();

    const sendData = (e, id) => {
        e.preventDefault();
        const { id_name, name = displayName, photoURL } = user;

        setPostComments((data) => [
            ...data,
            { comment, id_name, name, photoURL },
        ]);

        sendComment(comment, id);
        setComment("");
    };

    const handleComment = (e) => {
        e.preventDefault();
        setComment(e.target.value);
    };

    useEffect(() => {
        // setPostComments(comments);
        setUser(getUser());

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sendComment]);

    return !user ? (
        <div>loading..</div>
    ) : (
        <div className="w-[100%] my-[1rem] pt-[1rem] pb-[2rem] px-[2rem] lg:px-[.8rem] min-h-[20vh] bg-[#fff] shadow-md text-[#222] rounded">
            <div className="flex w-[100%] pt-[0.2rem] pb-[0.8rem] items-center justify-between">
                <Link href={`/user/${id_name}`}>
                    <div className="flex items-center cursor-pointer">
                        <img
                            src={photoURL}
                            alt=""
                            className="rounded-full max-h-[2.4rem]"
                        />
                        <p className="px-[.8rem]">{name}</p>
                    </div>
                </Link>
                <p className="text-[#ccc] ">{secondstoddmmyy(time.seconds)}</p>
            </div>

            <h1 className="text-xl font-bold py-[.3rem]">{title}</h1>
            <div className="my-3">{desc}</div>
            <hr className="" />
            <div className="w-[100%] flex justify-center my-3">
                <button
                    className="flex items-center px-6 min-w-[8vw] justify-around"
                    onClick={() => setForm(!form)}
                >
                    {form ? (
                        <MdModeComment values={{ size: "2rem" }} />
                    ) : (
                        <MdOutlineModeComment values={{ size: "2rem" }} />
                    )}
                    <p className="pb-[3px] pl-[.2rem]">Comment</p>
                </button>
            </div>
            <hr className="" />
            <form
                onSubmit={(e) => sendData(e, id)}
                className={`flex flex-col mt-3 ${form ? "visible" : "hidden"}`}
            >
                <div className="flex w-[100%] pb-[1rem]">
                    <img
                        src={user.photoURL}
                        alt=""
                        className="h-[3.4vh] rounded-full"
                    />
                    <input
                        type="text"
                        placeholder="Send a comment"
                        className="rounded-full pl-[1rem] p-[.35rem] w-[95%] ml-[.5rem] bg-[#f0f2f5]"
                        value={comment}
                        onChange={handleComment}
                    />
                </div>

                {postComments ? (
                    <div className="">
                        {postComments.map(
                            ({ comment, id_name, name, photoURL }, key) => (
                                <div
                                    key={key}
                                    className="flex flex-col justify-start w-[100%] py-[.28rem]"
                                >
                                    <Link href={`/user/${id_name}`}>
                                        <div className="flex pr-2 md:pr-0">
                                            <img
                                                src={photoURL}
                                                alt=""
                                                className="rounded-full max-h-[1.4rem] mr-[1rem]"
                                            />
                                            <p className="text-[.9rem]">
                                                {name}
                                            </p>
                                        </div>
                                    </Link>
                                    <p className="pl-[2.4rem] text-[1rem]">
                                        {comment}
                                    </p>
                                </div>
                            )
                        )}
                    </div>
                ) : (
                    <div className="">Nie ma zadnych kometarzy</div>
                )}
            </form>
        </div>
    );
};

export default Post;
