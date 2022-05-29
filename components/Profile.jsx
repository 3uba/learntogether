import { useState, useEffect } from "react";
import { useAuth } from "../context/auth";

const Profile = ({ id_name }) => {
    const { getUserByName } = useAuth();

    const [userData, setUserData] = useState({});

    useEffect(() => {
        const fetch = async () => {
            setUserData(await getUserByName(id_name));
        };

        fetch();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id_name]);

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
                <div className="text-white">@{id_name}</div>
            </div>
        </div>
    );
};

export default Profile;
