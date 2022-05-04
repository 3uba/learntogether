import cookies from "js-cookie";
import { useRouter } from "next/router";

import { signInWithPopup, GoogleAuthProvider } from "@firebase/auth";
import { auth, db, postImages } from "./firebase";

import { uploadBytes } from "firebase/storage";
import { collection, addDoc, onValue, ref } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import Post from "../components/assets/Post";

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

    const addPost = async (e, title, desc, picture, closeForm) => {
        e.preventDefault();
        const { uid } = getUser();

        console.log(uid);

        const post = {
            user_id: uid,
            title: title,
            description: desc,
            time: new Date(),
            done: false,
            photo: picture ? String(picture) : "",
        };

        uploadBytes(postImages, picture);

        const dbInstance = collection(db, "posts_lt");

        addDoc(dbInstance, post)
            .then(() => {
                alert("Added post succesfully");
            })
            .catch((err) => {
                alert("Error");
            });
        closeForm();
    };

    return {
        signUp,
        signOut,
        getUser,
        addPost,
    };
};

export { useFirebase };
