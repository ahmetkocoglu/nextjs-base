import React from 'react';
import SignInComponent from "@/components/auth/sign-in";
import {CustomPage} from "@/layouts/Types";

const SignIn: CustomPage = () => {
    return (
        <SignInComponent />
    );
};

SignIn.Layout = "Auth"
export default SignIn;
