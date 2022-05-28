import { useEffect } from "react";
import { useAuth } from "../../context/auth";
import Profile from "../../components/Profile";
import Posts from "../../components/Posts";
import { useRouter } from "next/router";

const Home = () => {
    const Router = useRouter();
    const { authorId } = Router.query;

    return (
        <div>
            <Profile authorId={authorId} />
            {/* <Posts authorId={authorId} /> */}
        </div>
    );
};

export default Home;
