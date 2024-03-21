import React from "react";
import {Inter} from "next/font/google";

const inter = Inter({subsets: ['latin']})

interface Props {
    children: React.ReactNode
}

const AuthLayout: React.FC<Props> = ({children}) => {

    return (
        <div className={`min-h-screen ${inter.className}`}>
            {children}
        </div>
    );
}

export default AuthLayout;
