import cookies from "js-cookie";
import { useRouter } from "next/router";
import { signInWithPopup, GoogleAuthProvider, getAuth } from "@firebase/auth";
import { auth, db, postImages } from "./firebase";
import { uploadBytes } from "firebase/storage";
import { collection, addDoc, doc, getDoc } from "firebase/firestore";

const useFirebase = () => {
    const provider = new GoogleAuthProvider();
    const router = useRouter();

    const signUp = () => {
        signInWithPopup(auth, provider)
            .then(async (res) => {
                const name = res.user.displayName.split(" ");
                const id = res.user.uid.substring(0, 5);

                const id_name = `${name[0]}_${id}`.toLowerCase();

                const ref = doc(db, "users", id_name);
                const snap = await getDoc(ref);

                if (!snap.exists()) {
                    db.collection("users").doc(id_name).set(
                        {
                            uid: res.user.uid,
                            displayName: res.user.displayName,
                            photoURL: res.user.photoURL,
                        },
                        { merge: true }
                    );

                    db.collection("uid_join_user").doc(res.user.uid).set({
                        id_name: id_name,
                    });

                    alert("thanks for registrer");
                }

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

    const getUserByUid = async (uid) => {
        const ref = doc(db, "uid_join_user", uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
            return snap.data().id_name;
        }
    };

    const addPost = async (e, title, desc, picture, closeForm) => {
        e.preventDefault();
        const { displayName, photoURL, uid } = getUser();

        const id_name = await getUserByUid(uid);

        const post = {
            id_name: id_name,
            user_uid: uid,
            user_name: displayName,
            user_photo: photoURL,
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
                    .limit(20)
                    .get();

                let posts = [];
                let lastKey = "";

                data.forEach((doc) => {
                    posts.push({
                        id: doc.id,
                        title: doc.data().title,
                        desc: doc.data().description,
                        user_name: doc.data().user_name,
                        user_photo: doc.data().user_photo,
                        time: doc.data().time,
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
                    .limit(20)
                    .get();

                let posts = [];
                let lastKey = "";

                data.forEach((doc) => {
                    posts.push({
                        id: doc.id,
                        title: doc.data().title,
                        desc: doc.data().description,
                        user_name: doc.data().user_name,
                        user_photo: doc.data().user_photo,
                        time: doc.data().time,
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
        getUserByUid,
        addPost,
        getPosts,
    };
};

export { useFirebase };
