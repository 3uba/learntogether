import { AuthProvider } from "../context/auth";
import { MantineProvider } from "@mantine/core";
import "../styles/globals.css"

function MyApp({ Component, pageProps }) {
    return (
        <AuthProvider>
            <MantineProvider
                theme={{
                    fontFamily: "Open Sans, sans-serif",
                    fontFamilyMonospace: "Monaco, Courier, monospace",
                    headings: { fontFamily: "Greycliff CF, sans-serif" },
                }}
            >
                <Component {...pageProps} />
            </MantineProvider>
        </AuthProvider>
    );
}

export default MyApp;
