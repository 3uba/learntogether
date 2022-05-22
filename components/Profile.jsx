import { useEffect, useState } from "react";
import { database } from "../lib/firebase";
import { useAuth } from "../context/auth";
import { onValue, push, ref, set, update } from "firebase/database";
import { getUserById } from "../lib/firebase.admin.config";

const Profile = ({ authorId }) => {
    const [userData, setUserData] = useState({
        name: "",
        picture: "",
    });

    useEffect(() => {
        onValue(ref(database, `/users/${authorId}`), (snap) => {
            setUserData({
                name: snap.val().displayName,
                picture: snap.val().photoURL,
            });
        });
    }, [authorId]);

    return (
        <div>
            {userData.name}
            {getUserById(authorId)}
        </div>
    );
};

export default Profile;
