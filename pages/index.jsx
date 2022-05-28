import { useState, useEffect } from "react";
import { useAuth } from "../context/auth";

import App from "../components/App";
import Main from "../components/Main";

const Home = () => {
    const { getUser } = useAuth();
    const [user, setUser] = useState({});

    useEffect(() => {
        setUser(getUser());
    }, [getUser, setUser]);

    return (
        <App>
            <Main {...user} />
        </App>
    );
};

export default Home;
