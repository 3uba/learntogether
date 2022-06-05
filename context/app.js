import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "./auth";

import Navbar from "../components/Navbar";
import Notifications from "../components/Notifications";
import Logo from "../components/Logo"

const App = ({ children }) => {
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
        <div className="w-[100vw] max-w-[100%] h-[100%] flex flex-col">
            <Logo />
            <div className="w-[100vw] max-w-[100%] h-[96vh] flex" >
                <Navbar {...user} />
                    {children}
                <Notifications />
            </div>
        </div>
    );
};

export default App;
