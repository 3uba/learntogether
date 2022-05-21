import React from "react";

const Post = ({ title, desc }) => {
    return (
        <div className="w-[45vw] m-[2vw] p-[2vw] h-[30vh] bg-[#3a3b3c] text-[#fff] rounded-xl">
            <h1>{title}</h1>
            <div className="">{desc}</div>
        </div>
    );
};

export default Post;
