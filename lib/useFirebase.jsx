import cookies from "js-cookie";
import { useRouter } from "next/router";

import { signInWithPopup, GoogleAuthProvider } from "@firebase/auth";
import { auth, db } from "./firebase";

const useFirebase = () => {
    const provider = new GoogleAuthProvider();
    const router = useRouter();

    const signUp = () => {
        signInWithPopup(auth, provider)
            .then((res) => {
                cookies.set("lt_user", JSON.stringify(res.user), {
                    expires: 1 / 24,
                });

                router.push("/");
            })
            .catch((err) => console.log("signUp error"));
    };

    const signOut = () => {
        cookies.remove("lt_user");

        router.push("/signup");
    };

    const getUser = () => {
        const cookie = cookies.get("lt_user");
        if (!cookie) return null;

        return JSON.parse(cookie);
    };

    const addPost = async (title, desc) => {
        const { uid } = getUser();

        const post = {
            user_id: uid,
            title: title,
            description: desc,
            time: new Date(),
            done: false,
        };

        const res = await db
            .collection("posts_lt")
            .add(post)
            .then(() => {
                console.log("Post was added");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return {
        signUp,
        signOut,
        getUser,
    };
};

export { useFirebase };
