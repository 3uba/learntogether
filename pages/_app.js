import { AuthProvider } from "../context/auth";
import "../styles/globals.css"
import Head from "next/head";

function MyApp({ Component, pageProps }) {
    return (
        <AuthProvider>
            <Head>
                <title>Learn Together</title>
                <meta charset="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
                <link href="https://fonts.googleapis.com/css2?family=Arvo:wght@700&display=swap" rel="stylesheet"/>
            </Head>
            <Component {...pageProps} />
        </AuthProvider>
    );
}

export default MyApp;
