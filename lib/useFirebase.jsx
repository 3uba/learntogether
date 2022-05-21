import cookies from "js-cookie";
import { useRouter } from "next/router";
import { signInWithPopup, GoogleAuthProvider } from "@firebase/auth";
import { auth, db, postImages } from "./firebase";
import { uploadBytes } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { findUser } from "./firebase.admin";

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

    const getPosts = {
        postsFirstBatch: async function () {
            try {
                const data = await db
                    .collection("posts_lt")
                    .orderBy("time", "desc")
                    .limit(2)
                    .get();

                let posts = [];
                let lastKey = "";

                data.forEach((doc) => {
                    posts.push({
                        id: doc.id,
                        title: doc.data().title,
                        desc: doc.data().description,
                    });

                    lastKey = doc.data().time;
                });

                return { posts, lastKey };
            } catch (e) {
                console.log(e);
            }
        },

        postsNextBatch: async (key) => {
            try {
                const data = await db
                    .collection("posts_lt")
                    .orderBy("time", "desc")
                    .startAfter(key)
                    .limit(2)
                    .get();

                let posts = [];
                let lastKey = "";

                data.forEach((doc) => {
                    posts.push({
                        id: doc.id,
                        title: doc.data().title,
                        desc: doc.data().description,
                    });

                    lastKey = doc.data().time;
                });

                return { posts, lastKey };
            } catch (e) {
                console.log(e);
            }
        },
    };

    return {
        signUp,
        signOut,
        getUser,
        addPost,
        getPosts,
        findUser,
    };
};

export { useFirebase };
