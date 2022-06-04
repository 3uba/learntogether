import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../context/auth";

import Profile from "../../components/Profile";
import Posts from "../../components/Posts";
import App from "../../context/app.js";
/**
 * [author.jsx]
 * odpowiada za wyswietlanie profilowego,
 * (danych użykownika, i wszystkie przez niego dodanie posty)
 * podzielony jest na 2 sekcje ktore znajdziesz w 'components'
 */

export function isRouterReady(router) {
    return router.asPath !== router.route;
}

const Home = () => {
    const { getUser, getUserByUid } = useAuth();

    const router = useRouter();
    const { id_name } = router.query;

    const [current, setCurrent] = useState();
    const [loading, setLoading] = useState(true);
    // const { id_name } = router.query;

    const fetch = async () => {
        setCurrent(await getUserByUid(await getUser().uid));
    };

    useEffect(() => {
        fetch();
        current && setLoading(false);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return !id_name ? (
        <div className="">Loading...</div>
    ) : (
        <App>
            <div className="bg-[#f0f2f5] border-x-[.1rem] border-[#ddd] w-[60vw] max-h-[96vh] 2xl:border-r-0 2xl:w-[82vw]  md:w-[100vw] md:p-0 md:border-0 no-scrollbar .no-scrollbar::-webkit-scrollbar overflow-y overflow-x-hidden overflow-scroll">
                <Profile id_name={id_name} current={id_name === current} />
                <Posts id_name={id_name} current={id_name === current} />
            </div>
        </App>
    );
};

export default Home;
