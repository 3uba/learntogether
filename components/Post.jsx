import React from "react";

const Post = ({ name, picture, title, desc }) => {
    return (
        <div className="w-[45vw] m-[2vw] pt-[1rem] pb-[2rem] px-[2rem] min-h-[20vh] bg-[#3a3b3c] text-[#fff] rounded-sm">
            <div className="flex w-[100%] py-[0.6rem] items-center">
                <img
                    src={picture}
                    alt=""
                    className="rounded-full max-h-[2.4rem]"
                />
                <p className="px-[.8rem]">{name}</p>
            </div>

            <h1 className="text-xl font-bold py-[.3rem]">{title}</h1>
            <div className="">{desc}</div>
        </div>
    );
};

export default Post;
