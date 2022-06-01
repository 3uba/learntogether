import React, { useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import Post from "./Post";

const Posts = ({ id_name }) => {
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState();

    const { getPostsByUser, getUser } = useAuth();

    const fetch = async () => {
        setPosts(await getPostsByUser(id_name));
        setUser(await getUser());
    };

    useEffect(() => {
        fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setPosts]);

    return !posts.length ? (
        <div className="">Loading..</div>
    ) : (
        <div className="w-[100%] ">
            <div>
                {posts.map(
                    (
                        {
                            id,
                            id_name,
                            user_name,
                            user_photo,
                            title,
                            description,
                            time,
                            comments,
                        },
                        key
                    ) => (
                        <div key={key}>
                            <Post
                                key={id}
                                id_name={id_name}
                                name={user_name}
                                picture={user_photo}
                                title={title}
                                desc={description}
                                time={time}
                                comments={comments}
                                curr_photo={user.photoURL}
                            />
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default Posts;
