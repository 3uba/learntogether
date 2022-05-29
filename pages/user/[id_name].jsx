import { useState, useEffect } from "react";
import { useRouter } from "next/router";

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
    const router = useRouter();
    const { id_name } = router.query;

    // useEffect(() => {
    //     if (!user) {
    //         router.push("/")
    //     }
    // }, [router, id_name]);

    return id_name ? (
        <App>
            <div className="bg-[#f0f2f5] w-[60vw] h-[100vh]">
                <Profile id_name={id_name} />
                <Posts id_name={id_name} />
            </div>
        </App>
    ) : (
        <div className="">Loading...</div>
    );
};

export default Home;
