import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/auth";

import Navbar from "../components/Navbar";
import Main from "../components/Main";
import Notifications from "../components/Notifications";

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
        <div className="w-[100vw] h-[100vh] flex">
            <Navbar {...user} />
            <Main {...user} />
            <Notifications />
        </div>
    );
};

export default Home;
