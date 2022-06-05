import { AuthProvider } from "../context/auth";
import "../styles/globals.css"
import Head from "next/head";

function MyApp({ Component, pageProps }) {
    return (
        <AuthProvider>
            <Head>
                <title>Learn Together</title>
                <meta name="viewport" content="viewport-fit=cover" />
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
                <link href="https://fonts.googleapis.com/css2?family=Arvo:wght@700&display=swap" rel="stylesheet"/>
            </Head>
            <Component {...pageProps} />
        </AuthProvider>
    );
}

export default MyApp;
