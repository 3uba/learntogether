import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { useRouter } from "next/router";

const SignUp = () => {
    const router = useRouter();
    const { signUp, getUser } = useAuth();

    useEffect(() => {
        if (getUser() != null) {
            router.push("/");
        }
    }, [router, getUser]);

    return (
        <div>
            <button onClick={signUp}>login</button>
        </div>
    );
};

export default SignUp;
