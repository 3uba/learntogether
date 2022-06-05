import cookies from "js-cookie";
import { useRouter } from "next/router";

// firebase
import { signInWithPopup, GoogleAuthProvider, getAuth } from "@firebase/auth";
import { auth, db, postImages } from "./firebase";
import { uploadBytes } from "firebase/storage";
import firebase from "firebase/compat/app";
import {
    collection,
    doc,
    ref,
    set,
    push,
    addDoc,
    getDoc,
    setDoc,
    updateDoc,
    getDocs,
    query,
    where,
    onChildChanged,
    FieldValue,
} from "firebase/firestore";

const useFirebase = () => {
    /**
     * Inicjalizacja providera - umozliwa logowanie 
     * przez googla
     
     * i inicjalizacja routera do przenoszonia miedzy stronami
     */

    const provider = new GoogleAuthProvider();
    const router = useRouter();

    /*
     * signUp
     * jezeli pierwszy raz sie logujesz zostajesz zapisany z bazie danych
     * dodatkowo masz robina relacje na twoj uid
     * jednak jezeli nie jest to twoj pierwszy raz to poprostu sa pobierane
     * dane z bazy i dodawane do cookiesa
     */
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
                            posts: [],
                            trusting: [],
                            trusts: [],
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
            .catch((err) => console.log(`error ${err}`));
    };

    /*
     * signOut
     * usuwanie danych z cookiesa i przenoszenie na strone glowna
     */
    const signOut = () => {
        cookies.remove("lt_user");

        router.push("/signup");
    };

    /**
     * getUser
     * pobiera aktualnie zalogowanego uzytkownika
     */
    const getUser = () => {
        const cookie = cookies.get("lt_user");
        if (!cookie) return null;

        return JSON.parse(cookie);
    };

    /**
     * getUserByUid
     * kozysta z utworzonej podczas rejestracji relacji
     * i pobiera id_name ktory umozliwi pobranie danych uzytkownika z
     * bazy danych
     */
    const getUserByUid = async (uid) => {
        const ref = doc(db, "uid_join_user", uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
            return snap.data().id_name;
        }
    };

    /**
     * pobiera wszystkie dane uzytkownika z bazy danych
     */
    const getUserByName = async (id_name) => {
        const ref = doc(db, "users", id_name);
        const snap = await getDoc(ref);

        if (snap.exists()) {
            return snap.data();
        }
    };

    /**
     * addPost
     * pobieranie id danych uzytkownika + comit na serwer
     */
    const addPost = async (title, desc, picture, closeForm) => {
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
            comments: [],
        };

        uploadBytes(postImages, picture);

        const dbInstance = collection(db, "posts_lt");

        addDoc(dbInstance, post)
            .then((ref) => {
                setDoc(
                    doc(db, "users", id_name),
                    { posts: [ref.id] },
                    { merge: true }
                );

                alert("Added post succesfully");
            })
            .catch((err) => {
                alert(`Error ${err}`);
            });
        closeForm();
    };

    /**
     * getPost
     * jest to zbior 2 funkcji ktory umozliwania dynamiczne pobieranie postow
     */
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
                        id_name: doc.data().id_name,
                        title: doc.data().title,
                        desc: doc.data().description,
                        user_name: doc.data().user_name,
                        user_photo: doc.data().user_photo,
                        time: doc.data().time,
                        comments: doc.data().comments
                            ? doc.data().comments
                            : ["Nie ma zadnych postow"],
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
                        id_name: doc.data().id_name,
                        title: doc.data().title,
                        desc: doc.data().description,
                        user_name: doc.data().user_name,
                        user_photo: doc.data().user_photo,
                        time: doc.data().time,
                        comments: doc.data().comments.length
                            ? doc.data().comments
                            : ["Nie ma zadnych postow"],
                    });

                    lastKey = doc.data().time;
                });

                return { posts, lastKey };
            } catch (e) {
                console.log(e);
            }
        },
    };

    const getPostsByUser = async (id_name) => {
        const q = query(
            collection(db, "posts_lt"),
            where("id_name", "==", id_name)
        );
        const snap = await getDocs(q);

        let posts = new Array();

        snap.forEach((doc) => {
            posts.push({ id: doc.id, ...doc.data() });
        });

        return posts.reverse();
    };

    const sendComment = async (value, id) => {
        const uid = await getUser().uid;
        const id_name = await getUserByUid(uid);
        const user = await getUserByName(id_name);

        const ref = doc(db, "posts_lt", id);
        const snap = await getDoc(ref);

        let comments = [];

        if (snap.exists()) {
            comments = await snap.data().comments;
            // console.log(snap.data());
            // console.log(comments);
        }

        const userData = {
            id_name: id_name,
            name: user.displayName,
            photoURL: user.photoURL,
            comment: value,
        };

        comments.push(userData);

        // console.log(comments);

        await setDoc(
            ref,
            {
                comments: comments,
            },
            { merge: true }
        );
    };

    const checkTrusting = async (id_name) => {
        const { uid } = await getUser();
        const name = await getUserByUid(uid);
        const { trusting } = await getUserByName(name);

        // console.log(trusting);

        if (trusting.includes(id_name)) return true;
        return false;
    };

    const trustAction = async (id_name, trust) => {
        const { uid } = await getUser();
        const name = await getUserByUid(uid);
        const { trusting } = await getUserByName(name);

        if (trust) {
            setDoc(
                doc(db, "users", id_name),
                {
                    trusts: firebase.firestore.FieldValue.arrayUnion(name),
                },
                { merge: true }
            );
            setDoc(
                doc(db, "users", name),
                {
                    trusting: firebase.firestore.FieldValue.arrayUnion(id_name),
                },
                { merge: true }
            );
        } else {
            updateDoc(doc(db, "users", id_name), {
                trusts: firebase.firestore.FieldValue.arrayRemove(name),
            });
            updateDoc(doc(db, "users", name), {
                trusting: firebase.firestore.FieldValue.arrayRemove(id_name),
            });
        }
    };

    const trustCount = async (id_name) => {
        const user = await getUserByName(id_name);

        return user.trusts.length;
    };

    return {
        signUp,
        signOut,
        getUser,
        getUserByUid,
        getUserByName,
        addPost,
        getPosts,
        getPostsByUser,
        sendComment,
        checkTrusting,
        trustAction,
        trustCount,
    };
};

export { useFirebase };
