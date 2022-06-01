import React, { useEffect, useState } from "react";
import { useAuth } from "../context/auth";

import { MenuButton } from "./Menu";
import { MdLogout, MdEvent, MdMessage, MdHome } from "react-icons/md";

const Navbar = ({ photoURL, displayName, email }) => {
    const [loading, setLoading] = useState(true);
    const { signOut } = useAuth();

    useEffect(() => {
        if (email != "undefined") setLoading(false);
    }, [email]);

    return loading ? (
        <div>Loading...</div>
    ) : (
        <div className="w-[18vw] lg:w-auto h-[96vh] flex flex-col items-center relative bg-[#f0f2f5] text-[#222] p-4 xl:p-0">
            <MenuButton link="/account">
                <img
                    src={photoURL}
                    alt=""
                    className="rounded-full w-9 h-9 m-2 lg:m-0"
                />
                <span className="text-l font-semibold p-2 md:hidden">
                    {displayName}
                </span>
            </MenuButton>
            <MenuButton link="/">
                <MdHome size={28} className="m-2 lg:m-0" />
                <span className="text-l font-semibold p-2 md:hidden">Home</span>
            </MenuButton>
            <MenuButton link="/events">
                <MdEvent size={28} className="m-2 lg:m-0" />
                <span className="text-l font-semibold p-2 md:hidden">
                    Events
                </span>
            </MenuButton>

            <MenuButton link="/messages">
                <MdMessage size={28} className="m-2 lg:m-0" />
                <span className="text-l font-semibold p-2 md:hidden">
                    Messages
                </span>
            </MenuButton>

            <MenuButton className="absolute bottom-2">
                <button
                    onClick={signOut}
                    className="p-2 md:p-0 flex items-center"
                >
                    <MdLogout size={28} className="m-2" />
                    <p className="text-l font-semibold md:hidden">Sign Out</p>
                </button>
            </MenuButton>
        </div>
    );
};

export default Navbar;
