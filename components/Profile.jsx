import { useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import { useRouter } from "next/router";
import { MdStar, MdStarOutline } from "react-icons/md";

const Profile = ({ id_name, current }) => {
    const { getUserByName, trustAction, checkTrusting, trustCount } = useAuth();

    const [loading, setLoading] = useState(true);
    const [trust, setTrust] = useState(false);
    const [trustCounter, setTrustCounter] = useState(1);
    const [userData, setUserData] = useState({});

    const fetch = async () => {
        setTrustCounter(Number(await trustCount(id_name)));
        setUserData(await getUserByName(id_name));
        setTrust(await checkTrusting(id_name));

        setLoading(false);
    };

    useEffect(() => {
        fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id_name]);

    const trustToggle = async () => {
        setTrust(!trust);
        {
            trustAction(id_name, !trust);
        }
        !trust
            ? setTrustCounter(trustCounter + 1)
            : setTrustCounter(trustCounter - 1);
    };

    const { displayName, photoURL } = userData;

    return loading ? (
        <div className="">Loading...</div>
    ) : (
        <div className="w-[100%] h-[40vh] flex flex-col items-center justify-bottom relative mb-[2vh] bg-[#fff]">
            <div className="absolute bg-[#fff] w-[100%] h-[58%] top-0 left-0 z-0">
                <img
                    src={"https://picsum.photos/1920/1080"}
                    alt="Loading..."
                    className="object-cover w-[100%] h-[100%]"
                />
            </div>
            <div className="absolute top-[30%] z-10 px-[2rem] w-[100%] flex items-center justify-left flex-col">
                <div className="w-[100%] h-[16vh] flex items-center justify-left ">
                    <div className="">
                        <img
                            src={photoURL}
                            alt="user_photo"
                            className="rounded-full flex items-center p-[.3rem] bg-[#fff]"
                        />
                    </div>
                </div>
                <div className="w-[100%] h-[3.5rem] flex items-left justify-between">
                    <div>
                        <div className="text-[#000] font-semibold text-[1.1rem]">
                            {displayName}
                        </div>
                        <div className="text-[#333]">@{id_name}</div>
                        <div className="text-[#333] py-[.4rem]">
                            <span className="text-[#000] font-semibold">
                                {trustCounter}
                            </span>{" "}
                            people trust
                        </div>
                    </div>
                    <div
                        className={`flex px-[2vw] items-top justify-center cursor-pointer select-none`}
                        onClick={() => trustToggle()}
                    >
                        <div
                            className={`flex px-[2rem] h-[2rem] justify-center items-center rounded-[25px]  ${
                                trust
                                    ? "bg-[#fff] text-[#390099]"
                                    : current
                                    ? "border-[#390099] border-[.1rem] bg-[#fff] text-[#390099] hover:bg-[#390099] hover:text-white duration-300"
                                    : "bg-[#390099] text-white"
                            }`}
                        >
                            {current ? (
                                <div className="">Edit profile</div>
                            ) : trust ? (
                                <>
                                    <MdStar
                                        size={24}
                                        style={{ color: "#390099" }}
                                    />
                                    <span className="pl-[0.3vw] md:pl-[0.5vw]">
                                        Trusting
                                    </span>
                                </>
                            ) : (
                                <>
                                    <MdStarOutline
                                        size={24}
                                        style={{
                                            color: "#fff",
                                        }}
                                    />

                                    <span className="pl-[0.3vw] md:pl-[0.5vw]">
                                        Trust
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
