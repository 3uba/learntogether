import React, { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import { useRouter } from "next/router";

import { FcGoogle } from "react-icons/fc";

const SignUp = () => {
    const router = useRouter();
    const { signUp, getUser } = useAuth();

    useEffect(() => {
        getUser() != null && router.push("/");
    }, [router, getUser]);

    return (
        <div className="w-[100vw] h-[90vh] flex flex-col place-items-center justify-center">
            <p className="text-3xl pb-10">Welcome in LearnTogether</p>
            <button
                className="rounded-md flex justify-center place-items-center py-1 px-3"
                onClick={signUp}
            >
                <FcGoogle size={38} />
                <p className="p-2">Login with Google</p>
            </button>
        </div>
    );
};

export default SignUp;
