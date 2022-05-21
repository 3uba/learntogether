import { useAuth } from "../../context/auth";
import Profile from "../../components/Profile";
import Posts from "../../components/Posts";

const Home = () => {
    const { getUser } = useAuth();
    const { authorId } = Router.query;

    useEffect(() => {
        getUser() == null && router.push("/signup");
    });

    return (
        <div>
            <Profile authorId={authorId} />
            <Posts authorId={authorId} />
        </div>
    );
};
