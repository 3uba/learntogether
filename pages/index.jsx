import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/auth";

const Home = () => {
    const { getUser } = useAuth();
    const [user, setUser] = useState({});

    const router = useRouter();

    useEffect(() => {
        if (getUser() == null) {
            router.push("/signup");
        } else {
            setUser(getUser());
        }
    }, [router, getUser]);

    return (
        <div>
            <p>{user.email}</p>
        </div>
    );
};

export default Home;
