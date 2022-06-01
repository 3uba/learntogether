import React, { useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import Post from "./Post";

const Posts = ({ id_name }) => {
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);

    const { getPostsByUser, getUser } = useAuth();

    const fetch = async () => {
        setPosts(await getPostsByUser(id_name));

        // console.log(posts == undefined);
        setUser(await getUser());
    };

    useEffect(() => {
        setLoading(true);
        fetch();
        setLoading(false);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const Posts = () => (
        <>
            {posts.length != 0 &&
                posts.map(
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
        </>
    );

    return loading ? (
        <div className="">Loading...</div>
    ) : posts.length != 0 ? (
        <div className="w-[100%] ">
            <div>
                <Posts />
            </div>
        </div>
    ) : (
        <div className="">User don&apos;t have posts</div>
    );
};

export default Posts;
