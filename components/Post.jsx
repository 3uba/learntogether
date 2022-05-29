/* eslint-disable @next/next/link-passhref */
import React from "react";
import Link from "next/link";

import { secondstoddmmyy } from "./utils/timeConverter";

/**
 * Post.jsx
 * Jest to szblon postu,
 * trafiaja tu dane z Main.jsx
 */

const Post = ({ id_name, name, picture, title, desc, time }) => {
    return (
        <div className="w-[45vw] m-[2vw] pt-[1rem] pb-[2rem] px-[2rem] min-h-[20vh] bg-[#3a3b3c] text-[#222] rounded-sm">
            <div className="flex w-[100%] pt-[0.2rem] pb-[0.8rem] items-center justify-between">
                <Link href={`/user/${id_name}`}>
                    <div className="flex items-center cursor-pointer">
                        <img
                            src={picture}
                            alt=""
                            className="rounded-full max-h-[2.4rem]"
                        />
                        <p className="px-[.8rem]">{name}</p>
                    </div>
                </Link>
                <p className="text-[#ccc] ">{secondstoddmmyy(time.seconds)}</p>
            </div>

            <h1 className="text-xl font-bold py-[.3rem]">{title}</h1>
            <div className="">{desc}</div>
        </div>
    );
};

export default Post;
