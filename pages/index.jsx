import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/auth";

import Main from "../components/Main";

const Home = () => {
    const { getUser } = useAuth();
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    useEffect(() => {
        getUser() == null && router.push("/signup");
    });

    useEffect(() => {
        getUser() == null ? router.push("/signup") : setUser(getUser());
        setLoading(false);
    }, [router, getUser]);

    return loading ? (
        <div className="">Loading...</div>
    ) : (
        <div>
            <Main {...user} />
        </div>
    );
};

export default Home;
