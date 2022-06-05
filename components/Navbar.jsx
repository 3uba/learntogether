import React, { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import { useRouter } from "next/router";
import { MenuButton } from "./Menu";
import { MdLogout, MdEvent, MdMessage, MdHome } from "react-icons/md";

const Navbar = ({ uid, photoURL, displayName, email }) => {
    const router = useRouter();

    const [idName, setIdName] = useState();
    const [loading, setLoading] = useState(true);
    const { getUserByUid, signOut } = useAuth();

    const fetch = async () => {
        setIdName(await getUserByUid(uid));
    };

    useEffect(() => {
        fetch();
        if (email != "undefined") setLoading(false);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [email]);

    return loading ? (
        <div>Loading...</div>
    ) : (
        <div className="w-[18vw] h-[96vh] flex flex-col items-center relative bg-[#f0f2f5] text-[#222] p-4 xl:p-0  md:fixed md:bottom-0 md:h-[8vh] md:flex-row md:w-[100vw] md:items-center md:bg-[#fff] md:justify-center">
            <MenuButton href={"/user/[id_name]"} link={`/user/${idName}`}>
                <img
                    src={photoURL}
                    alt=""
                    className="rounded-full w-9 h-9 m-2 lg:m-0 "
                />
                <span className="text-l font-semibold p-2 md:hidden">
                    {displayName}
                </span>
            </MenuButton>
            <MenuButton href="/" link="/">
                <MdHome size={28} className="m-2 lg:m-0 " />
                <span className="text-l font-semibold p-2 md:hidden">Home</span>
            </MenuButton>
            {/* <MenuButton link="/events">
                <MdEvent size={28} className="m-2 lg:m-0 " />
                <span className="text-l font-semibold p-2 md:hidden">
                    Events
                </span>
            </MenuButton> */}

            <MenuButton href="/messages" link="/messages">
                <MdMessage size={28} className="m-2 lg:m-0 " />
                <span className="text-l font-semibold p-2 md:hidden">
                    Messages
                </span>
            </MenuButton>

            <MenuButton className="absolute bottom-2 md:static ">
                <button
                    onClick={signOut}
                    className="p-2 md:p-0 flex items-center md:w-[10vw] md:justify-center"
                >
                    <MdLogout size={28} className="m-2 lg:m-0" />
                    <p className="text-l font-semibold md:hidden">Sign Out</p>
                </button>
            </MenuButton>
        </div>
    );
};

export default Navbar;
