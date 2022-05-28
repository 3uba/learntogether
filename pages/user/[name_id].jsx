import { useRouter } from "next/router";

import Profile from "../../components/Profile";
import App from "../../components/App";
/**
 * [author.jsx]
 * odpowiada za wyswietlanie profilowego,
 * (danych użykownika, i wszystkie przez niego dodanie posty)
 * podzielony jest na 2 sekcje ktore znajdziesz w 'components'
 */

const Home = () => {
    const router = useRouter();
    const { name_id } = router.query;

    return (
        <App>
            <div className="bg-[#242526] w-[60vw] h-[100vh]">
                <Profile name_id={name_id} />
            </div>
        </App>
    );
};

export default Home;
