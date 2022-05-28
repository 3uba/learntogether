import { useState, useEffect } from "react";
import { useAuth } from "../context/auth";

const Profile = ({ name_id }) => {
    const { getUserByName } = useAuth();

    const [userData, setUserData] = useState({});

    useEffect(() => {
        const fetch = async () => {
            setUserData(await getUserByName(name_id));
        };

        fetch();
    }, [getUserByName, name_id, userData]);

    const { displayName, photoURL } = userData;

    return (
        <div className="w-[100%] h-[18vh] flex items-center">
            <div className="w-[20%] h-[100%] flex items-center justify-center">
                <div className="">
                    <img src={photoURL} alt="" className="rounded-xl " />
                </div>
            </div>
            <div className="w-[80%] h-[100%] flex flex-col justify-center">
                <div className="text-white">{displayName}</div>
                <div className="text-white">@{name_id}</div>
            </div>
        </div>
    );
};

export default Profile;
