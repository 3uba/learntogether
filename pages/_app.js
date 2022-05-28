import { useState, useEffect } from "react"
import { AuthProvider } from "../context/auth";
import "../styles/globals.css"
import Head from "next/head";
import cookies from "js-cookie";

import Navbar from "../components/Navbar";
import Notifications from "../components/Notifications";

function MyApp({ Component, pageProps }) {
    const [app ,setApp] = useState(false);
    const [user, setUser] = useState({})
    
    useEffect(() =>  {
        const cookie = cookies.get("lt_user");
        if(cookie) {
            setUser(JSON.parse(cookie));
        
            setApp(true)
        } else {
            setApp(false)
        }
    }, [app])
    
    

    return (
        <AuthProvider>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
                <link href="https://fonts.googleapis.com/css2?family=Arvo:wght@700&display=swap" rel="stylesheet"/>
            </Head>
            {(app) ? (
                <div className="w-[100vw] h-[100vh] flex">
                    <Navbar {...user} />
                    <Component {...pageProps} />
                    <Notifications />
                </div>
                
            ) : (<Component {...pageProps} />)}
        </AuthProvider>
    );
}

export default MyApp;
