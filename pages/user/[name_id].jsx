import { useRouter } from "next/router";

import Profile from "../../components/Profile";
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
        <div className="w-[100%] h-[100vh] bg-[#242526] flex">
            <Profile id_name={name_id} />
        </div>
    );
};

export default Home;
