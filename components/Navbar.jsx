import React, { useEffect, useState } from "react";
import { useAuth } from "../context/auth";

import { RightMenuDiv } from "./RightMenu";
import { MdLogout, MdEvent, MdMessage } from "react-icons/md";

const Navbar = ({ photoURL, displayName, email }) => {
    const [loading, setLoading] = useState(true);
    const { signOut } = useAuth();

    useEffect(() => {
        if (email != "undefined") setLoading(false);
    }, [email]);

    return loading ? (
        <div>Loading...</div>
    ) : (
        <div className="w-[18vw] h-[100vh] flex flex-col items-center relative bg-[#242526] text-[#fff] p-4">
            <RightMenuDiv link="/account">
                <img
                    src={photoURL}
                    alt=""
                    className="rounded-full w-9 h-9 m-2"
                />
                <span className="text-l font-semibold p-2">{displayName}</span>
            </RightMenuDiv>

            <RightMenuDiv link="/events">
                <MdEvent size={28} className="m-2" />
                <span className="text-l font-semibold p-2">Events</span>
            </RightMenuDiv>

            <RightMenuDiv link="/messages">
                <MdMessage size={28} className="m-2" />
                <span className="text-l font-semibold p-2">Messages</span>
            </RightMenuDiv>

            <RightMenuDiv className="absolute bottom-2">
                <MdLogout size={28} className="m-2" />
                <button onClick={signOut} className="p-2">
                    <p className="text-l font-semibold">Sign Out</p>
                </button>
            </RightMenuDiv>
        </div>
    );
};

export default Navbar;
