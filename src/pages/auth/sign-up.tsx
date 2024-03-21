import React from 'react';
import SignUpComponent from "@/components/auth/sign-up";
import {CustomPage} from "@/layouts/Types";
import SignIn from "@/pages/auth/sign-in";

const SignUp: CustomPage = () => {
    return (
        <SignUpComponent />
    );
};

SignIn.Layout = "Auth"
export default SignUp;
